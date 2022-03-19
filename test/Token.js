const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
        const Transaction = await ethers.getContractFactory("Transaction");
        const transaction = await Transaction.deploy();
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();
        
        const ownerBalance = await token.balanceOf(owner.address);
        expect(await token.totalSupply()).to.equal(ownerBalance);
    });
});