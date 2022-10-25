import { ethers } from 'hardhat';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { CatAdoption__factory } from '../typechain-types/factories/contracts/CatAdoption__factory';
import * as catHashes from '../deployments/IPFS/cats.json';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const accounts = await ethers.getSigners()

  const {deployer, tokenOwner} = await getNamedAccounts();

  const deployment = await deploy('CatAdoption', {
    from: deployer,
    log: true,
  });P

  const CAFactory =  new CatAdoption__factory(accounts[0]);
  const catAdoption = CAFactory.attach(deployment.address)

  catHashes.slice(0,5).forEach(async (c) => {
    const res = await catAdoption.postCat(c, true)
    console.log(res)
  })

};
export default func;
func.tags = ['Token'];
