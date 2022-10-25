import { useAccount, useConnect, useEnsName, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

function WalletButton() {
  const { address, isConnected } = useAccount()
  const {chain, chains} = useNetwork()
  console.log(chain, chains)
  const { data: ensName } = useEnsName({ address, chainId:1 })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  if (isConnected) return <Typography>Connected to {ensName ?? address}</Typography>
  return <Button  variant="contained" color='secondary' onClick={() => connect()}><Typography>Connect Wallet</Typography></Button>
}

export default WalletButton
