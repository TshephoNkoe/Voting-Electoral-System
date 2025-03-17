<template>
  <div>
    <h1>IEC Voting System Msebetsi Solutions Pty Ltd</h1>
    <button @click="connectMetaMask">Connect to MetaMask</button>
    <div v-if="userAddress">
      <p>Connected: {{ userAddress }}</p>
    </div>
    <button @click="vote('Proposal 1')">Vote for Proposal 1</button>
    <p>Vote count for Proposal 1: {{ voteCount }}</p>
  </div>
</template>

<script>
import { ethers } from 'ethers';

export default {
  name: 'VotingComponent',
  data() {
    return {
      userAddress: null,
      contract: null,
      voteCount: 0,
    };
  },
  methods: {
    // Connect to MetaMask and initialize contract
    async connectMetaMask() {
      if (window.ethereum) {
        try {
          // Request accounts from MetaMask
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });

          this.userAddress = accounts[0]; // Store the first account address
          console.log('Connected Address:', this.userAddress);

          // Connect to the blockchain (local or testnet)
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Set up the contract (replace with your actual contract address and ABI)
          const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Replace with your deployed contract address
          const contractABI = [
            // Replace with your contract's ABI
            {
              "inputs": [{"internalType": "string","name": "proposal","type": "string"}],
              "name": "vote",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [{"internalType": "string","name": "proposal","type": "string"}],
              "name": "getVoteCount",
              "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
              "stateMutability": "view",
              "type": "function"
            }
          ];

          this.contract = new ethers.Contract(contractAddress, contractABI, signer);
          console.log('Contract:', this.contract);

          // Fetch initial vote count
          this.fetchVoteCount();
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        alert('MetaMask is not installed!');
      }
    },

    // Call the contract's vote function
    async vote(proposal) {
      if (this.contract) {
        try {
          // Send the transaction to the contract's vote function
          const tx = await this.contract.vote(proposal);
          await tx.wait();  // Wait for the transaction to be mined
          console.log('Vote successful for:', proposal);

          // Fetch updated vote count
          this.fetchVoteCount();
        } catch (error) {
          console.error('Error during voting:', error);
        }
      } else {
        alert('Please connect MetaMask first.');
      }
    },

    // Fetch the current vote count for a proposal
    async fetchVoteCount() {
      if (this.contract) {
        try {
          this.voteCount = await this.contract.getVoteCount('Proposal 1');
        } catch (error) {
          console.error('Error fetching vote count:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles for your component here */
button {
  margin: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

h1 {
  font-family: Arial, sans-serif;
  color: #333;
}

p {
  font-size: 16px;
  color: #333;
}
</style>

