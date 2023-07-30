import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../hardhat.helper";
import { Logic1, Logic2, Proxy } from "../typechain-types";
import { assert } from "chai";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Proxy Contract", () => {
      let deployer;
      let proxy: Proxy;
      let logic1: Logic1;
      let logic2: Logic2;
      let proxyWithLogic1;
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        proxy = await ethers.getContract("Proxy", deployer);
        logic1 = await ethers.getContract("Logic1", deployer);
        logic2 = await ethers.getContract("Logic2", deployer);
        const proxyAddress = await proxy.getAddress();

        proxyWithLogic1 = await ethers.getContractAt("Logic1", proxyAddress);
      });

      describe("Logic 1 implementation", () => {
        it("Changes its implementation to Logic1", async () => {
          await proxy.changeImplementation(await logic1.getAddress());
          await proxy.update2x();

          const x = await logic1.x();
          assert.equal(x, BigInt(2));
        });
        it("starts the Logic 1 implementation", async () => {});
      });

      describe("Logic 2 implementation", () => {
        it("Changes its implementation to Logic1", async () => {
          await proxy.changeImplementation(await logic2.getAddress());
          await proxy.update2x();

          const x = await logic2.x();
          assert.equal(x, BigInt(2));
        });
        it("starts the Logic 1 implementation", async () => {});
      });

      describe("Call Logic1 via fallback", () => {
        it("updates x in 3 units", async () => {
          await proxyWithLogic1.changeImplementation(await logic1.getAddress());
          await proxyWithLogic1.update3x();

          const x = await logic1.x();
          assert.equal(x, BigInt(3));
        });
        it("starts the Logic 1 implementation", async () => {});
      });
    });
