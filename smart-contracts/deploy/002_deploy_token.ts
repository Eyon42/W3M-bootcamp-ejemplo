import { ethers } from 'hardhat';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, tokenOwner} = await getNamedAccounts();

  const initialSupply = ethers.utils.parseEther("1");
  await deploy('Token', {
    from: deployer,
    args: [initialSupply],
    log: true,
  });
};
export default func;
func.tags = ['Token'];
