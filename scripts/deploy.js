const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account : ", deployer.address);
    console.log("Account balance : ", (await deployer.getBalance()).toString());

    const network = await ethers.provider.getNetwork();

    const Transaction = await ethers.getContractFactory("Transaction");
    const transaction = await Transaction.deploy();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log("Deployed Token contract on : ", network.name);
    console.log("Token Contract address : ", token.address);
    console.log("Transaction Contract address : ", transaction.address);
    saveFrontendFiles(token, transaction);
}

function saveFrontendFiles(token, transaction) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";
    if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

    fs.writeFileSync(contractsDir + "/contract-address.json", JSON.stringify({ Token: token.address, Transaction: transaction.address }, undefined, 2));
    const TokenArtifact = artifacts.readArtifactSync("Token");
    fs.writeFileSync(contractsDir + "/Token.json", JSON.stringify(TokenArtifact, null, 2));
    const TransactionArtifact = artifacts.readArtifactSync("Transaction");
    fs.writeFileSync(contractsDir + "/Transaction.json", JSON.stringify(TransactionArtifact, null, 2));
  }

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });