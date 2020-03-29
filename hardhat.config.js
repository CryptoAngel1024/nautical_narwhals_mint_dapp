require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('dotenv').config()

const INFURA_URL = "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY;
const owner = process.env.PK;
const alice = process.env.ALICE;
const bob = process.env.BOB;

module.exports = {
  networks: {
    hardhat: {},
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${owner}`],
      timeout: 60000,
      gasLimit: 250000
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    artifacts: './frontend/src/artifacts'
  },
  mocha: {
    timeout: 300000
  },
  gasReporter: {
    enabled: false
  }
};
