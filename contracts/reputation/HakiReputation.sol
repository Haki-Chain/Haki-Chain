// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title HakiReputation
 * @dev Manages reputation for lawyers and NGOs on the Haki platform
 */
contract HakiReputation is AccessControl {
    // Roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant RATER_ROLE = keccak256("RATER_ROLE");
    
    // Struct for rating
    struct Rating {
        string id;
        address rater;
        address rated;
        uint8 score; // 1-5
        string comment;
        string bountyId;
        uint256 timestamp;
    }
    
    // Struct for reputation
    struct Reputation {
        uint256 totalScore;
        uint256 ratingCount;
        mapping(string => bool) ratingIds; // Track which ratings have been given
        string[] ratings; // Array of rating IDs
    }
    
    // Mapping from address to reputation
    mapping(address => Reputation) private reputations;
    
    // Mapping from rating ID to rating
    mapping(string => Rating) public ratings;
    
    // Events
    event RatingSubmitted(string ratingId, address rater, address rated, uint8 score, string bountyId);
    event RatingUpdated(string ratingId, uint8 newScore, string newComment);
    event RatingRemoved(string ratingId, address rated);
    
    /**
     * @dev Constructor
     * @param admin Address of the admin
     */
    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ADMIN_ROLE, admin);
        _setupRole(RATER_ROLE, admin);
    }
    
    /**
     * @dev Submit a rating
     * @param ratingId Unique ID for the rating
     * @param rated Address of the rated user
     * @param score Score (1-5)
     * @param comment Comment
     * @param bountyId ID of the bounty
     */
    function submitRating(
        string memory ratingId,
        address rated,
        uint8 score,
        string memory comment,
        string memory bountyId
    ) external {
        require(hasRole(RATER_ROLE, msg.sender), "Must have RATER role");
        require(score >= 1 && score <= 5, "Score must be between 1 and 5");
        require(rated != address(0), "Invalid rated address");
        require(rated != msg.sender, "Cannot rate yourself");
        
        // Check if rating already exists
        require(!reputations[rated].ratingIds[ratingId], "Rating ID already exists");
        
        // Create rating
        Rating storage newRating = ratings[ratingId];
        newRating.id = ratingId;
        newRating.rater = msg.sender;
        newRating.rated = rated;
        newRating.score = score;
        newRating.comment = comment;
        newRating.bountyId = bountyId;
        newRating.timestamp = block.timestamp;
        
        // Update reputation
        Reputation storage reputation = reputations[rated];
        reputation.totalScore += score;
        reputation.ratingCount += 1;
        reputation.ratingIds[ratingId] = true;
        reputation.ratings.push(ratingId);
        
        emit RatingSubmitted(ratingId, msg.sender, rated, score, bountyId);
    }
    
    /**
     * @dev Update a rating
     * @param ratingId ID of the rating
     * @param newScore New score (1-5)
     * @param newComment New comment
     */
    function updateRating(
        string memory ratingId,
        uint8 newScore,
        string memory newComment
    ) external {
        require(hasRole(RATER_ROLE, msg.sender), "Must have RATER role");
        require(newScore >= 1 && newScore <= 5, "Score must be between 1 and 5");
        
        Rating storage rating = ratings[ratingId];
        require(bytes(rating.id).length > 0, "Rating does not exist");
        require(rating.rater == msg.sender, "Only rater can update rating");
        
        // Update reputation
        Reputation storage reputation = reputations[rating.rated];
        reputation.totalScore = reputation.totalScore - rating.score + newScore;
        
        // Update rating
        rating.score = newScore;
        rating.comment = newComment;
        rating.timestamp = block.timestamp;
        
        emit RatingUpdated(ratingId, newScore, newComment);
    }
    
    /**
     * @dev Remove a rating (admin only)
     * @param ratingId ID of the rating
     */
    function removeRating(string memory ratingId) external onlyRole(ADMIN_ROLE) {
        Rating storage rating = ratings[ratingId];
        require(bytes(rating.id).length > 0, "Rating does not exist");
        
        address rated = rating.rated;
        Reputation storage reputation = reputations[rated];
        
        // Update reputation
        reputation.totalScore -= rating.score;
        reputation.ratingCount -= 1;
        reputation.ratingIds[ratingId] = false;
        
        // We don't remove from the ratings array to avoid gas costs
        // The ratingIds mapping will prevent double counting
        
        // Clear rating data
        delete ratings[ratingId];
        
        emit RatingRemoved(ratingId, rated);
    }
    
    /**
     * @dev Get reputation score
     * @param user Address of the user
     * @return Average score (0-5) with 1 decimal place (e.g. 45 = 4.5)
     */
    function getReputationScore(address user) external view returns (uint256) {
        Reputation storage reputation = reputations[user];
        
        if (reputation.ratingCount == 0) {
            return 0;
        }
        
        // Calculate average with 1 decimal place
        return (reputation.totalScore * 10) / reputation.ratingCount;
    }
    
    /**
     * @dev Get reputation details
     * @param user Address of the user
     * @return totalScore Total score
     * @return ratingCount Number of ratings
     */
    function getReputationDetails(address user) external view returns (
        uint256 totalScore,
        uint256 ratingCount
    ) {
        Reputation storage reputation = reputations[user];
        
        return (
            reputation.totalScore,
            reputation.ratingCount
        );
    }
    
    /**
     * @dev Get rating details
     * @param ratingId ID of the rating
     */
    function getRating(string memory ratingId) external view returns (
        string memory id,
        address rater,
        address rated,
        uint8 score,
        string memory comment,
        string memory bountyId,
        uint256 timestamp
    ) {
        Rating storage rating = ratings[ratingId];
        
        return (
            rating.id,
            rating.rater,
            rating.rated,
            rating.score,
            rating.comment,
            rating.bountyId,
            rating.timestamp
        );
    }
    
    /**
     * @dev Get user ratings
     * @param user Address of the user
     * @return Array of rating IDs
     */
    function getUserRatings(address user) external view returns (string[] memory) {
        return reputations[user].ratings;
    }
    
    /**
     * @dev Add rater role to an address
     * @param account Address to add the role to
     */
    function addRaterRole(address account) external onlyRole(ADMIN_ROLE) {
        grantRole(RATER_ROLE, account);
    }
    
    /**
     * @dev Remove rater role from an address
     * @param account Address to remove the role from
     */
    function removeRaterRole(address account) external onlyRole(ADMIN_ROLE) {
        revokeRole(RATER_ROLE, account);
    }
}

