pragma solidity ^0.4.17;

contract Projects {
    address[16] public projectAdopters;
    //joining a project
    function joinProject(uint projectId) public returns (uint) {
        require(projectId >= 0 && projectId <= 15);

        projectAdopters[projectId] = msg.sender;

        return projectId;
    }
    //getting potential projecting adopters
    function getProjectAdopters() public view returns (address[16]) {
        return projectAdopters;
    }
}
