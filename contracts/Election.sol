// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    uint public candidatesCount;
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) private voted;

    event electionUpdated (
        uint id,
        string name,
        uint voteCount
    );

    constructor() public {
        addCandidate("Barack Obama");
        addCandidate("Joe Biden");
        addCandidate("Donald Trump");
    } 

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _id) public {
        require(voted[msg.sender] == false, "Already voted");
        require(candidates[_id].id != 0, "the id does not exist");

        candidates[_id].voteCount += 1;
        voted[msg.sender] = true;
        
        emit electionUpdated(_id, candidates[_id].name, candidates[_id].voteCount);
    }
}