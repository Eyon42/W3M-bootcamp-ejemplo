import { useAccount, useBalance } from "wagmi";
import tokenDeployment from "smart-contracts/deployments/localhost/Token.json"
import Transfer from "../components/Transfer";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

const { address } = tokenDeployment

const Token = () => {
  const { address: userAddress } = useAccount()
  const { data: balance } = useBalance({addressOrName: userAddress, watch:true})
  const { data: tokenBalance } = useBalance({addressOrName: userAddress, token: (address as any), watch: true})
  // const { data } = useContractRead({
  //   address, abi,
  //   functionName: "balanceOf",
  //   args: [userAddress]
  // })

  return (<Stack spacing={2} sx={{maxWidth:"500px", marginX: "auto", paddingTop:4}}>
    <Typography variant="h1">
      GLD Wallet
    </Typography>  
    <Typography>
      GLD Token Address: {address}
    </Typography>

    <Typography variant="h2">
      Balances
    </Typography>

    <Typography>
      {parseFloat(balance?.formatted || "0").toFixed(2) + " " + balance?.symbol}
    </Typography>
    <Typography>
      {parseFloat(tokenBalance?.formatted || "0").toFixed(2) + " " + tokenBalance?.symbol}
    </Typography>

    <Typography variant="h2">
      Transfer GLD
    </Typography>
    <Transfer token={address}/>
  </Stack>);
};

export default Token;
