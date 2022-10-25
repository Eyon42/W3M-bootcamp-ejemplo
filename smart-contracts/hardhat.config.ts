import {HardhatUserConfig} from 'hardhat/types';
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-ethernal';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1
  },
};
export default config;