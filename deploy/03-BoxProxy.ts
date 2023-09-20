import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployBoxProxy: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<boolean | void> => {
  const {
    getNamedAccounts,
    deployments: { deploy },
  } = hre;

  const { deployer } = await getNamedAccounts();
  const boxArgs: any[] = [];

  await deploy("Box", {
    from: deployer,
    args: boxArgs,
    log: true,
    waitConfirmations: 1,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "BoxProxyAdmin",
        artifact: "BoxProxyAdmin",
      },
    },
  });
};

export default deployBoxProxy;

deployBoxProxy.tags = ["all", "box-proxy-admin"];
