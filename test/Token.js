const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();
        
        const ownerBalance = await token.balanceOf(owner.address);
        expect(await token.totalSupply()).to.equal(ownerBalance);
    });

    it("Burning should reduce totalSupply and ownerBalance", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();

        const ownerBalance = await token.balanceOf(owner.address);
        const totalSupply = await token.totalSupply();
        token.burn(100);
        expect(await token.balanceOf(owner.address)).to.equal(ownerBalance - 100);
        expect(await token.totalSupply()).to.equal(totalSupply - 100);

    });
});