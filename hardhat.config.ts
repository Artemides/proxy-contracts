import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  namedAccounts: {
    deployer: {
      default: 0,
      31338: 9,
    },
  },
};

export default config;
