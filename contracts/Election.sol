// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    mapping(uint => Candidate) public candidates;
    struct Candidate {
        uint id;
        string name;
        uint votes;
    }

    constructor() public {
        addCandidate(0, "Obama", 0);
        addCandidate(1, "Biden", 0);
    } 

    function addCandidate(uint _id, string memory _name, uint _votes) private {
        Candidate memory cand = Candidate(_id, _name, _votes);
        candidates[_id] = cand;
    }
}