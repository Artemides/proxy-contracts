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

  //  Proxy Address 0xe970ad53b3728da3aFBbcdD3af8C7cD03F27976a ,
  //  impl Addrs 0xF80D8F13D40b75B045C1900F279754c3b523BF1a
};

export default upgradeableProxy;

upgradeableProxy.tags = ["all", "u-proxy"];
