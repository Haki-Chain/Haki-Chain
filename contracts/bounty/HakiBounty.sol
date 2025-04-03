// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title HakiBounty
 * @dev Manages legal bounties for the Haki platform
 */
contract HakiBounty is AccessControl, ReentrancyGuard {
    // Roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant NGO_ROLE = keccak256("NGO_ROLE");
    bytes32 public constant LAWYER_ROLE = keccak256("LAWYER_ROLE");
    
    // Enum for bounty status
    enum BountyStatus { Draft, Open, InProgress, Completed, Cancelled }
    
    // Enum for application status
    enum ApplicationStatus { Pending, Accepted, Rejected, Withdrawn }
    
    // Struct for bounty
    struct Bounty {
        string id;
        address ngo;
        address lawyer;
        string title;
        string description;
        uint256 amount;
        uint256 deadline;
        BountyStatus status;
        string[] tags;
        string[] documents;
        uint256 createdAt;
        uint256 updatedAt;
        string escrowId;
    }
    
    // Struct for application
    struct Application {
        string id;
        string bountyId;
        address lawyer;
        string proposal;
        ApplicationStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    // Mapping from bounty ID to bounty
    mapping(string => Bounty) public bounties;
    
    // Mapping from application ID to application
    mapping(string => Application) public applications;
    
    // Mapping from bounty ID to array of application IDs
    mapping(string => string[]) public bountyApplications;
    
    // Mapping from lawyer address to array of application IDs
    mapping(address => string[]) public lawyerApplications;
    
    // Mapping from NGO address to array of bounty IDs
    mapping(address => string[]) public ngoBounties;
    
    // Mapping from lawyer address to array of bounty IDs (assigned)
    mapping(address => string[]) public lawyerBounties;
    
    // Events
    event BountyCreated(string bountyId, address ngo, string title, uint256 amount);
    event BountyUpdated(string bountyId, BountyStatus status);
    event BountyAssigned(string bountyId, address lawyer);
    event BountyCompleted(string bountyId);
    event BountyCancelled(string bountyId);
    event ApplicationSubmitted(string applicationId, string bountyId, address lawyer);
    event ApplicationAccepted(string applicationId, string bountyId, address lawyer);
    event ApplicationRejected(string applicationId, string bountyId);
    event ApplicationWithdrawn(string applicationId, string bountyId, address lawyer);
    
    /**
     * @dev Constructor
     * @param admin Address of the admin
     */
    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ADMIN_ROLE, admin);
    }
    
    /**
     * @dev Create a new bounty
     * @param bountyId Unique ID for the bounty
     * @param title Title of the bounty
     * @param description Description of the bounty
     * @param amount Amount of the bounty
     * @param deadline Deadline for the bounty
     * @param tags Array of tags for the bounty
     * @param documents Array of document URLs for the bounty
     * @param escrowId ID of the escrow contract (can be empty if not created yet)
     */
    function createBounty(
        string memory bountyId,
        string memory title,
        string memory description,
        uint256 amount,
        uint256 deadline,
        string[] memory tags,
        string[] memory documents,
        string memory escrowId
    ) external {
        require(hasRole(NGO_ROLE, msg.sender) || hasRole(ADMIN_ROLE, msg.sender), "Must have NGO or ADMIN role");
        
        Bounty storage newBounty = bounties[bountyId];
        newBounty.id = bountyId;
        newBounty.ngo = msg.sender;
        newBounty.lawyer = address(0);
        newBounty.title = title;
        newBounty.description = description;
        newBounty.amount = amount;
        newBounty.deadline = deadline;
        newBounty.status = BountyStatus.Draft;
        newBounty.tags = tags;
        newBounty.documents = documents;
        newBounty.createdAt = block.timestamp;
        newBounty.updatedAt = block.timestamp;
        newBounty.escrowId = escrowId;
        
        ngoBounties[msg.sender].push(bountyId);
        
        emit BountyCreated(bountyId, msg.sender, title, amount);
    }
    
    /**
     * @dev Update bounty status
     * @param bountyId ID of the bounty
     * @param status New status of the bounty
     */
    function updateBountyStatus(string memory bountyId, BountyStatus status) external {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.ngo == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Must be NGO or ADMIN");
        
        bounty.status = status;
        bounty.updatedAt = block.timestamp;
        
        emit BountyUpdated(bountyId, status);
    }
    
    /**
     * @dev Assign a lawyer to a bounty
     * @param bountyId ID of the bounty
     * @param lawyer Address of the lawyer
     * @param applicationId ID of the accepted application
     */
    function assignLawyer(string memory bountyId, address lawyer, string memory applicationId) external {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.ngo == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Must be NGO or ADMIN");
        require(bounty.status == BountyStatus.Open, "Bounty must be open");
        require(hasRole(LAWYER_ROLE, lawyer), "Assignee must have LAWYER role");
        
        Application storage application = applications[applicationId];
        require(bytes(application.id).length > 0, "Application does not exist");
        require(application.lawyer == lawyer, "Lawyer does not match application");
        require(application.status == ApplicationStatus.Pending, "Application must be pending");
        
        bounty.lawyer = lawyer;
        bounty.status = BountyStatus.InProgress;
        bounty.updatedAt = block.timestamp;
        
        application.status = ApplicationStatus.Accepted;
        application.updatedAt = block.timestamp;
        
        lawyerBounties[lawyer].push(bountyId);
        
        emit BountyAssigned(bountyId, lawyer);
        emit ApplicationAccepted(applicationId, bountyId, lawyer);
    }
    
    /**
     * @dev Complete a bounty
     * @param bountyId ID of the bounty
     */
    function completeBounty(string memory bountyId) external {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.ngo == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Must be NGO or ADMIN");
        require(bounty.status == BountyStatus.InProgress, "Bounty must be in progress");
        
        bounty.status = BountyStatus.Completed;
        bounty.updatedAt = block.timestamp;
        
        emit BountyCompleted(bountyId);
    }
    
    /**
     * @dev Cancel a bounty
     * @param bountyId ID of the bounty
     */
    function cancelBounty(string memory bountyId) external {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.ngo == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Must be NGO or ADMIN");
        require(bounty.status != BountyStatus.Completed, "Cannot cancel completed bounty");
        
        bounty.status = BountyStatus.Cancelled;
        bounty.updatedAt = block.timestamp;
        
        emit BountyCancelled(bountyId);
    }
    
    /**
     * @dev Submit an application for a bounty
     * @param applicationId Unique ID for the application
     * @param bountyId ID of the bounty
     * @param proposal Proposal text
     */
    function submitApplication(
        string memory applicationId,
        string memory bountyId,
        string memory proposal
    ) external {
        require(hasRole(LAWYER_ROLE, msg.sender), "Must have LAWYER role");
        
        Bounty storage bounty = bounties[bountyId];
        require(bytes(bounty.id).length > 0, "Bounty does not exist");
        require(bounty.status == BountyStatus.Open, "Bounty must be open");
        
        Application storage newApplication = applications[applicationId];
        newApplication.id = applicationId;
        newApplication.bountyId = bountyId;
        newApplication.lawyer = msg.sender;
        newApplication.proposal = proposal;
        newApplication.status = ApplicationStatus.Pending;
        newApplication.createdAt = block.timestamp;
        newApplication.updatedAt = block.timestamp;
        
        bountyApplications[bountyId].push(applicationId);
        lawyerApplications[msg.sender].push(applicationId);
        
        emit ApplicationSubmitted(applicationId, bountyId, msg.sender);
    }
    
    /**
     * @dev Reject an application
     * @param applicationId ID of the application
     */
    function rejectApplication(string memory applicationId) external {
        Application storage application = applications[applicationId];
        require(bytes(application.id).length > 0, "Application does not exist");
        
        Bounty storage bounty = bounties[application.bountyId];
        require(bounty.ngo == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Must be NGO or ADMIN");
        require(application.status == ApplicationStatus.Pending, "Application must be pending");
        
        application.status = ApplicationStatus.Rejected;
        application.updatedAt = block.timestamp;
        
        emit ApplicationRejected(applicationId, application.bountyId);
    }
    
    /**
     * @dev Withdraw an application
     * @param applicationId ID of the application
     */
    function withdrawApplication(string memory applicationId) external {
        Application storage application = applications[applicationId];
        require(bytes(application.id).length > 0, "Application does not exist");
        require(application.lawyer == msg.sender, "Must be the applicant");
        require(application.status == ApplicationStatus.Pending, "Application must be pending");
        
        application.status = ApplicationStatus.Withdrawn;
        application.updatedAt = block.timestamp;
        
        emit ApplicationWithdrawn(applicationId, application.bountyId, msg.sender);
    }
    
    /**
     * @dev Get bounty details
     * @param bountyId ID of the bounty
     */
    function getBounty(string memory bountyId) external view returns (
        string memory id,
        address ngo,
        address lawyer,
        string memory title,
        string memory description,
        uint256 amount,
        uint256 deadline,
        BountyStatus status,
        uint256 createdAt,
        uint256 updatedAt,
        string memory escrowId
    ) {
        Bounty storage bounty = bounties[bountyId];
        
        return (
            bounty.id,
            bounty.ngo,
            bounty.lawyer,
            bounty.title,
            bounty.description,
            bounty.amount,
            bounty.deadline,
            bounty.status,
            bounty.createdAt,
            bounty.updatedAt,
            bounty.escrowId
        );
    }
    
    /**
     * @dev Get bounty tags
     * @param bountyId ID of the bounty
     */
    function getBountyTags(string memory bountyId) external view returns (string[] memory) {
        return bounties[bountyId].tags;
    }
    
    /**
     * @dev Get bounty documents
     * @param bountyId ID of the bounty
     */
    function getBountyDocuments(string memory bountyId) external view returns (string[] memory) {
        return bounties[bountyId].documents;
    }
    
    /**
     * @dev Get application details
     * @param applicationId ID of the application
     */
    function getApplication(string memory applicationId) external view returns (
        string memory id,
        string memory bountyId,
        address lawyer,
        string memory proposal,
        ApplicationStatus status,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Application storage application = applications[applicationId];
        
        return (
            application.id,
            application.bountyId,
            application.lawyer,
            application.proposal,
            application.status,
            application.createdAt,
            application.updatedAt
        );
    }
    
    /**
     * @dev Get bounty applications
     * @param bountyId ID of the bounty
     */
    function getBountyApplications(string memory bountyId) external view returns (string[] memory) {
        return bountyApplications[bountyId];
    }
    
    /**
     * @dev Get lawyer applications
     * @param lawyer Address of the lawyer
     */
    function getLawyerApplications(address lawyer) external view returns (string[] memory) {
        return lawyerApplications[lawyer];
    }
    
    /**
     * @dev Get NGO bounties
     * @param ngo Address of the NGO
     */
    function getNgoBounties(address ngo) external view returns (string[] memory) {
        return ngoBounties[ngo];
    }
    
    /**
     * @dev Get lawyer bounties
     * @param lawyer Address of the lawyer
     */
    function getLawyerBounties(address lawyer) external view returns (string[] memory) {
        return lawyerBounties[lawyer];
    }
    
    /**
     * @dev Add NGO role to an address
     * @param account Address to add the role to
     */
    function addNgoRole(address account) external onlyRole(ADMIN_ROLE) {
        grantRole(NGO_ROLE, account);
    }
    
    /**
     * @dev Add lawyer role to an address
     * @param account Address to add the role to
     */
    function addLawyerRole(address account) external onlyRole(ADMIN_ROLE) {
        grantRole(LAWYER_ROLE, account);
    }
    
    /**
     * @dev Remove NGO role from an address
     * @param account Address to remove the role from
     */
    function removeNgoRole(address account) external onlyRole(ADMIN_ROLE) {
        revokeRole(NGO_ROLE, account);
    }
    
    /**
     * @dev Remove lawyer role from an address
     * @param account Address to remove the role from
     */
    function removeLawyerRole(address account) external onlyRole(ADMIN_ROLE) {
        revokeRole(LAWYER_ROLE, account);
    }
}

