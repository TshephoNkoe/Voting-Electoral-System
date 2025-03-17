// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string description;
        uint voteCount;
    }

    Proposal[] public proposals;
    mapping(address => bool) public hasVoted;

    bool public votingOpen;

    constructor() {
        votingOpen = true;
    }

    function addProposal(string memory description) public {
        require(votingOpen, "Voting has ended");
        proposals.push(Proposal(description, 0));
    }

    function vote(uint proposalIndex) public {
        require(votingOpen, "Voting has ended");
        require(!hasVoted[msg.sender], "Already voted");

        Proposal storage proposal = proposals[proposalIndex];
        proposal.voteCount += 1;
        hasVoted[msg.sender] = true;
    }

    function endVoting() public {
        votingOpen = false;
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    function getProposal(uint index) public view returns (string memory, uint) {
        Proposal storage proposal = proposals[index];
        return (proposal.description, proposal.voteCount);
    }
}

