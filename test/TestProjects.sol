pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Projects.sol";

contract TestProjects {
    Projects project = Projects(DeployedAddresses.Projects());

    //test joinProject function
    function testUserCanJoinProject() public {
    uint returnedId = project.joinProject(8);
    uint expected = 8;
    Assert.equal(returnedId, expected, "Project number should be here");
    }
    //testing retrieval of a project's participant
    function testGetProjectAdopterAddressByProjectId() public {
        //there should be a project joiner
        address expected = this;
        address projectAdopter = project.projectAdopters(8);
        Assert.equal(projectAdopter, expected, "owner of project 8 should be here");
    }
    //testing retrieval of all participants in projects
    function testGetProjectAdopterAddressByProjectIdInArray() public {
        //there should be a participant
        address expected = this;
        //store participants in memory
        address[16] memory projectAdopters = project.getProjectAdopters();
        Assert.equal(projectAdopters[8], expected, "Participant of ProjectId 8 should be here");
    }
}
