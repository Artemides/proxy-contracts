import { ethers, upgrades } from "hardhat";

const proxyAddress = "0xe970ad53b3728da3aFBbcdD3af8C7cD03F27976a";

async function updateVendingMachine() {
  const vendingMachineV2Factory = await ethers.getContractFactory(
    "VendingMachineV2"
  );

  await upgrades.upgradeProxy(proxyAddress, vendingMachineV2Factory);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log(
    `Proxy Address ${proxyAddress} , \n impl Addrs ${implementationAddress}`
  );
}

updateVendingMachine();
