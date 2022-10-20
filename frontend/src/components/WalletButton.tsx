import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Button from '@mui/material/Button';

function WalletButton() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  if (isConnected) return <div>Connected to {ensName ?? address}</div>
  return <Button  variant="contained" color='secondary' onClick={() => connect()}>Connect Wallet</Button>
}

export default WalletButton
