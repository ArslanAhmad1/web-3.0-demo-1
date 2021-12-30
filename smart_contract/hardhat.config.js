require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const ROPSTEM_PRIVATE_KEY = process.env.ROPSTEM_PRIVATE_KEY || "";

module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEM_PRIVATE_KEY}`]
    }
  }
};
