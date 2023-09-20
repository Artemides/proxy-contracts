import { upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployBoxProxy: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<boolean | void> => {
  const boxArgs: any[] = [];

  const BoxContractFactory = await hre.ethers.getContractFactory("Box");
  const proxy = await upgrades.deployProxy(BoxContractFactory, boxArgs);
  const proxyAddress = await proxy.getAddress();

  const boxImpleAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log(
    `Proxy Address ${proxyAddress} , \n impl Addrs ${boxImpleAddress}`
  );
};

export default deployBoxProxy;

deployBoxProxy.tags = ["all", "box-proxy-admin-oz"];
