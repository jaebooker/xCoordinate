pragma solidity ^0.4.21;

contract Skills {
    function () public payable;

    function withdraw() public returns (bool success);
}
contract Skill is Skills, Deadlines {
    using SafeMath for uint256;

    string public name;
    address public token;

    function skillSubmit(string _name, uint256 _deadline) public {
        require(_deadline > block.timestamp);
        name = _name;
        deadline = _deadline;
        token = new FishToken(_deadline);
    }
