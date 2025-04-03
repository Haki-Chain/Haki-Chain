// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title HakiMultiSig
 * @dev Multi-signature wallet for Haki platform governance
 */
contract HakiMultiSig {
    // Events
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);
    event OwnerAddition(address indexed owner);
    event OwnerRemoval(address indexed owner);
    event RequirementChange(uint required);
    
    // State variables
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;
    
    // Transaction struct
    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
        string description;
    }
    
    // Mapping from tx index => owner => confirmed
    mapping(uint => mapping(address => bool)) public isConfirmed;
    
    Transaction[] public transactions;
    
    // Modifiers
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }
    
    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "Tx does not exist");
        _;
    }
    
    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "Tx already executed");
        _;
    }
    
    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "Tx already confirmed");
        _;
    }
    
    /**
     * @dev Constructor
     * @param _owners Array of initial owners
     * @param _numConfirmationsRequired Number of confirmations required
     */
    constructor(address[] memory _owners, uint _numConfirmationsRequired) {
        require(_owners.length > 0, "Owners required");
        require(
            _numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length,
            "Invalid number of confirmations"
        );
        
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");
            
            isOwner[owner] = true;
            owners.push(owner);
        }
        
        numConfirmationsRequired = _numConfirmationsRequired;
    }
    
    /**
     * @dev Fallback function to receive Ether
     */
    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }
    
    /**
     * @dev Submit a transaction
     * @param _to Destination address
     * @param _value Value in wei
     * @param _data Transaction data
     * @param _description Description of the transaction
     * @return txIndex Index of the transaction
     */
    function submitTransaction(
        address _to,
        uint _value,
        bytes memory _data,
        string memory _description
    ) public onlyOwner returns (uint txIndex) {
        txIndex = transactions.length;
        
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0,
                description: _description
            })
        );
        
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
        
        // Auto-confirm by submitter
        confirmTransaction(txIndex);
    }
    
    /**
     * @dev Confirm a transaction
     * @param _txIndex Index of the transaction
     */
    function confirmTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;
        
        emit ConfirmTransaction(msg.sender, _txIndex);
        
        // Auto-execute if enough confirmations
        if (transaction.numConfirmations >= numConfirmationsRequired) {
            executeTransaction(_txIndex);
        }
    }
    
    /**
     * @dev Execute a confirmed transaction
     * @param _txIndex Index of the transaction
     */
    function executeTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        
        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "Not enough confirmations"
        );
        
        transaction.executed = true;
        
        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Transaction failed");
        
        emit ExecuteTransaction(msg.sender, _txIndex);
    }
    
    /**
     * @dev Revoke a confirmation
     * @param _txIndex Index of the transaction
     */
    function revokeConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        require(isConfirmed[_txIndex][msg.sender], "Tx not confirmed");
        
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;
        
        emit RevokeConfirmation(msg.sender, _txIndex);
    }
    
    /**
     * @dev Add a new owner
     * @param _owner Address of the new owner
     */
    function addOwner(address _owner)
        public
        onlyOwner
    {
        require(_owner != address(0), "Invalid owner");
        require(!isOwner[_owner], "Owner already exists");
        
        isOwner[_owner] = true;
        owners.push(_owner);
        
        emit OwnerAddition(_owner);
    }
    
    /**
     * @dev Remove an owner
     * @param _owner Address of the owner to remove
     */
    function removeOwner(address _owner)
        public
        onlyOwner
    {
        require(isOwner[_owner], "Not owner");
        require(owners.length > numConfirmationsRequired, "Cannot remove owner");
        
        isOwner[_owner] = false;
        
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == _owner) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
        
        emit OwnerRemoval(_owner);
    }
    
    /**
     * @dev Change the number of required confirmations
     * @param _required New number of required confirmations
     */
    function changeRequirement(uint _required)
        public
        onlyOwner
    {
        require(_required > 0, "Invalid requirement");
        require(_required <= owners.length, "Requirement exceeds owner count");
        
        numConfirmationsRequired = _required;
        
        emit RequirementChange(_required);
    }
    
    /**
     * @dev Get the list of owners
     * @return Array of owner addresses
     */
    function getOwners() public view returns (address[] memory) {
        return owners;
    }
    
    /**
     * @dev Get the number of transactions
     * @return Number of transactions
     */
    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }
    
    /**
     * @dev Get transaction details
     * @param _txIndex Index of the transaction
     * @return to Destination address
     * @return value Value in wei
     * @return data Transaction data
     * @return executed Whether the transaction has been executed
     * @return numConfirmations Number of confirmations
     * @return description Description of the transaction
     */
    function getTransaction(uint _txIndex)
        public
        view
        txExists(_txIndex)
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint numConfirmations,
            string memory description
        )
    {
        Transaction storage transaction = transactions[_txIndex];
        
        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations,
            transaction.description
        );
    }
}

Now, let's create a unified deployment script that combines all contract deployments:

