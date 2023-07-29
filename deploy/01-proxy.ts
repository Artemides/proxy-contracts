import { HardhatRuntimeEnvironment } from "hardhat/types";

const proxy = async (hre: HardhatRuntimeEnvironment) => {
  const {
    getNamedAccounts,
    deployments: { deploy },
  } = hre;

  const { deployer } = await getNamedAccounts();

  await deploy("Proxy", { from: deployer, args: [], log: true });
  await deploy("Logic1", { from: deployer, args: [], log: true });
  await deploy("Logic2", { from: deployer, args: [], log: true });
};

export default proxy;

proxy.tags = ["all"];
