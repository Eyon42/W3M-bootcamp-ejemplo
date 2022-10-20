import { ethers } from "hardhat";
import { NFT__factory } from "../typechain-types/factories/contracts/NFT.sol/NFT__factory";
import { Token__factory } from "../typechain-types/factories/contracts/Token.sol/Token__factory";

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  
  const NFT = new NFT__factory(deployer)
  
  const token = await NFT.deploy()

  await token.deployed();

  console.log(`Token deployed to ${token.address} and sent to ${deployer.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
