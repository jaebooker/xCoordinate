pragma solidity ^0.4.21;

contract Deadlines {

    uint256 public deadline;

    modifier onlyWhileOpen {
        require(block.timestamp <= deadline);
        _;
    }

    modifier onlyWhileClosed {
        require(block.timestamp > deadline);
        _;
    }
}
