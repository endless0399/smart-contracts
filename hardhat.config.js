require("@nomiclabs/hardhat-waffle");
require("./tasks/blockchainInfo")

const ALCHEMY_API_KEY = "xZ3Iam9VQF1dU6deMoHXzrbeip3tr2AA";
const PRIVATE_KEY = "d115e8ce3f09615ba5f4157c72752ef01fb7581dd97076768de54af938c6521d";

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    },
    hardhat: {

    }
  }
};
