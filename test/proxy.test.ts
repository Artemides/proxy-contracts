import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../hardhat.helper";
import { Logic1, Logic2, Proxy } from "../typechain-types";
import { assert } from "chai";
import { getStorageSlot } from "../utils/getStorage";
import { Address } from "hardhat-deploy/dist/types";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Proxy Contract", () => {
      let deployer;
      let proxy: Proxy;
      let proxyAddress: Address;
      let logic1: Logic1;
      let logic2: Logic2;
      let proxyWithLogic1: Proxy & Logic1;
      let proxyWithLogic2: Proxy & Logic2;

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        proxy = await ethers.getContract("Proxy", deployer);
        logic1 = await ethers.getContract("Logic1", deployer);
        logic2 = await ethers.getContract("Logic2", deployer);
        proxyAddress = await proxy.getAddress();
        const logic1Address = await logic1.getAddress();
        proxyWithLogic1 = logic1.attach(proxyAddress) as Proxy & Logic1;
        proxyWithLogic2 = logic2.attach(proxyAddress) as Proxy & Logic2;
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
          await proxy.changeImplementation(await logic1.getAddress());
          await proxyWithLogic1.update3x();

          const x = await logic1.x();
          assert.equal(x, BigInt(3));
        });
        it("updates x in 5 units", async () => {
          await proxy.changeImplementation(await logic2.getAddress());
          await proxyWithLogic2.update5x();
          const x = await logic2.x();

          assert.equal(x, BigInt(5));
        });
      });
      describe("proxy delegatecall", () => {
        it("Updates proxy state correctly with logic 1 and logic2", async () => {
          await proxy.changeImplementation(await logic1.getAddress());
          await proxyWithLogic1.update3x();
          assert.equal(await getStorageSlot(proxyAddress, "0x0"), 3);

          await proxy.changeImplementation(await logic2.getAddress());
          await proxyWithLogic2.update5x();
          assert.equal(await getStorageSlot(proxyAddress, "0x0"), 15);
        });
      });
    });
