// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseContract {
    uint public left;
    address public owner;
    // Event to emit when Ether is received
    constructor (uint _left) {
      left = _left;
      owner = msg.sender;
    }
    event Received(address sender, uint amount);
    event Withdrawn(address to);
    event GoalReached();
    

    address[] public accounts;



    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        require(left >= 0 , "Max balance reached");

        emit Received(msg.sender, msg.value);
        if(msg.value != 0) {
          left -= msg.value;
          addAccount(msg.sender);
          if(left <= 0) {
            emit GoalReached();
          }
        }
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        require(left >= 0 , "Max balance reached");
        emit Received(msg.sender, msg.value);
    }

    // Function to get the balance of the contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }


    function addAccount(address _account) internal {
    // Check if the account is not already in the array
    bool exists = false;
    for (uint i = 0; i < accounts.length; i++) {
        if (accounts[i] == _account) {
            exists = true;
            break;
        }
    }
    if (!exists) {
        accounts.push(_account);
    }
  }

    function reset(address payable _to) public {
      left = left + address(this).balance;
      _to.transfer(address(this).balance);
      delete accounts;
    }

    function getLeft() public view returns (uint) {
      return left;
    }
    function getAccounts() public view returns (address[] memory) {
        return accounts;
    }
        function withdrawBalance(address payable _to) public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(left >= 0, "Insufficient balance in contract");

        // Transfer the specified amount to the given address
        _to.transfer(address(this).balance);
        emit Withdrawn(_to);
    }
}
