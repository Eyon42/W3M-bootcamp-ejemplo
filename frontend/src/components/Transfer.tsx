import { Button, TextField } from "@mui/material";
import { ethers } from "ethers";
import { FC, useState } from "react";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";


interface TransferProps {
  token?: string;
}

const Transfer: FC<TransferProps> = ({token}) => {
  const [ transferToAddress, setTransferToAddress ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const parsedAmount = ethers.utils.parseEther(transferAmount? transferAmount:"0")
  
  const { config: tokenConfig } = usePrepareContractWrite({
    // address: token, //for newer versions
    // abi: erc20ABI,
    addressOrName: token || "",
    contractInterface: erc20ABI,
    functionName: 'transfer',
    args: [(transferToAddress as any), parsedAmount]
  })

  console.log(tokenConfig)

  const {write: writeContract} = useContractWrite(tokenConfig)

  return (<>
    <TextField id="to" label="To:" value={transferToAddress} onChange={(e) => setTransferToAddress(e.target.value)}/>
    <TextField type="number" id="amount" label="Amount:" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)}/>
    <Button variant="contained" onClick={()=>writeContract!()}>Send</Button>
  </>)
}

export default Transfer