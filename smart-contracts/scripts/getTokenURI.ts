import { ethers } from "hardhat";
import { CatAdoption__factory } from "../typechain-types";
import { address } from '../deployments/localhost/CatAdoption.json'
import { BigNumber } from "ethers";

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  
  const NFT = new CatAdoption__factory(deployer)

  const catAdoption = NFT.attach(address)

  const res = await catAdoption.tokenURI(BigNumber.from("0"));
  console.log(res)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
