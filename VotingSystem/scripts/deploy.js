const hre = require("hardhat");

async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");

    // Attempt to deploy the contract
    try {
        const voting = await Voting.deploy();
        await voting.deployed(); // Wait for deployment confirmation
        console.log("Voting contract deployed to:", voting.address);
    } catch (error) {
        console.error("Error deploying contract:", error);
    }
}

main().catch((error) => {
    console.error("Script execution error:", error);
    process.exitCode = 1;
});

