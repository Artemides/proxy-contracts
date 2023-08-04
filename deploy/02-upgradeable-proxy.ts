import { upgrades } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const upgradeableProxy = async (hre: HardhatRuntimeEnvironment) => {
  const VendingMachineV1Factory = await hre.ethers.getContractFactory(
    "VendingMachineV1"
  );
  const proxy = await upgrades.deployProxy(VendingMachineV1Factory, [1000]);
  await proxy.waitForDeployment();
  const proxyAddress = await proxy.getAddress();
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  console.log(
    `Proxy Address ${proxyAddress} , \n impl Addrs ${implementationAddress}`
  );
};

export default upgradeableProxy;

upgradeableProxy.tags = ["all", "u-proxy"];
