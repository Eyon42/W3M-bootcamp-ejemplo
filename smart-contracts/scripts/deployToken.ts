import { ethers } from "hardhat";
import { Token__factory } from "../typechain-types/factories/contracts/Token.sol/Token__factory";

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  
  const Token = new Token__factory(deployer)

  const initialSupply = ethers.utils.parseEther("1");
  const token = await Token.deploy(initialSupply)

  await token.deployed();

  console.log(`Token deployed to ${token.address} and sent to ${deployer.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
