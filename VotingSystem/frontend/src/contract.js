import { ethers } from "ethers";

let provider;
let contract;
let signer;

const contractAddress = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"; // Replace with your contract address
const contractABI = [
    // Replace with your contract's ABI (Application Binary Interface)
    {
        "inputs": [],
        "name": "getProposals",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "proposalIndex",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // Add more functions as per your contract
];

// Initialize provider, signer, and contract
export const initContract = async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("Please install MetaMask");
    }
};

export const getProposals = async () => {
    try {
        const proposals = await contract.getProposals();
        return proposals;
    } catch (error) {
        console.error("Error fetching proposals:", error);
    }
};

export const voteForProposal = async (proposalIndex) => {
    try {
        const tx = await contract.vote(proposalIndex);
        await tx.wait(); // Wait for transaction to be mined
        console.log("Vote successfully casted");
    } catch (error) {
        console.error("Error casting vote:", error);
    }
};

