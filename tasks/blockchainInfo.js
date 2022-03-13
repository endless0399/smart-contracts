require("@nomiclabs/hardhat-ethers");

task(
  "networkInfo", "Prints the current network", async (_, { ethers }) => {
    await ethers.provider.getNetwork().then((network) => {
      console.log("Network name: " + network.name);
      console.log("ENS address: " + network.ensAddress);
      console.log("Chain Id: " + network.chainId);
    }) 
  }
);

task(
  "blockNumber", "Prints the current block number", async (_, { ethers }) => {
    await ethers.provider.getBlockNumber().then((blockNumber) => {
        console.log("Current block number: " + blockNumber);
    });
  }
);