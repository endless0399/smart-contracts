const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account : ", deployer.address);
    console.log("Account balance : ", (await deployer.getBalance()).toString());

    console.log(deployer);
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log("Token address : ", token.address);
    saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";
    if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

    fs.writeFileSync(contractsDir + "/contract-address.json", JSON.stringify({ Token: token.address }, undefined, 2));
    const TokenArtifact = artifacts.readArtifactSync("Token");
    fs.writeFileSync(contractsDir + "/Token.json", JSON.stringify(TokenArtifact, null, 2));
  }

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });