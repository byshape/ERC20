import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function main() {
  const initialSupply: bigint = BigInt(1000 * 10 ** 18);

  let admin: SignerWithAddress;
  [admin] = await ethers.getSigners();
  const erc20Factory = await ethers.getContractFactory("ERC20", admin);
  const erc20 = await erc20Factory.deploy("Test token", "TST", 18, initialSupply, admin.address);

  await erc20.deployed();

  console.log("ERC20 deployed to:", erc20.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
