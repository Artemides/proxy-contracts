import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "ethe";
import "hardhat-deploy";

const ETHERSCAN = process.env.ETHERSCAN_API_KEY || "";
const METAMASK_PK = process.env.METAMASK_PRIVATE_KEY || "";
const ALCHEMY_SEPOLIA_RPC = process.env.ALCHEMY_SEPOLIA_RPC || "";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: ALCHEMY_SEPOLIA_RPC,
      accounts: [METAMASK_PK],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      31338: 9,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN,
  },
};

export default config;
