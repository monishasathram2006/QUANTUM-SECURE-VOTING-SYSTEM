// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract QuantumVoteX {
    struct Voter {
        bool registered;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public admin;
    bool public electionOpen;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    event VoterRegistered(address voter);
    event VoteCast(address voter, uint256 candidateIndex);
    event ElectionToggled(bool isOpen);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Admin only");
        _;
    }

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        electionOpen = true;
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function registerVoter() external {
        require(!voters[msg.sender].registered, "Already registered");
        voters[msg.sender] = Voter(true, false);
        emit VoterRegistered(msg.sender);
    }

    function castVote(uint256 candidateIndex) external {
        require(electionOpen, "Election closed");
        require(voters[msg.sender].registered, "Not registered");
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(candidateIndex < candidates.length, "Invalid candidate");

        voters[msg.sender].hasVoted = true;
        candidates[candidateIndex].voteCount += 1;
        emit VoteCast(msg.sender, candidateIndex);
    }

    function toggleElection(bool isOpen) external onlyAdmin {
        electionOpen = isOpen;
        emit ElectionToggled(isOpen);
    }

    function getResults() external view returns (Candidate[] memory) {
        return candidates;
    }
}
