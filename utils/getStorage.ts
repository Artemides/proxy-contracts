import { HexString } from "ethers/lib.commonjs/utils/data";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";

export const getStorageSlot = async (
  contractAddress: Address,
  slot: HexString
) => {
  return parseInt(await ethers.provider.getStorage(contractAddress, slot));
};
