import { Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import LoadingButton from '@mui/lab/LoadingButton';
import { FC, useEffect, useState } from "react";
import NFTDeployment from "smart-contracts/deployments/localhost/CatAdoption.json"
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import NFTCard from "./NFTCard";
import { useMutation } from "react-query";

const { address, abi } = NFTDeployment

const MintNFT: FC<{reload: any}> = ({reload}) => {
  const [ catName, setCatName ] = useState("")
  const [ catDescription, setCatDescription ] = useState("")
  const [ catPic, setCatPic ] = useState("")

  const { data: metadataHash, mutate, isLoading } = useMutation(async () => {
    const data = JSON.stringify({
        "description": catDescription,
        "image": catPic,
        "name": catName
      })
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmU1NTY5Mi0wMDk2LTRjZjAtYTc0Ny02NmFlYjUzYTA3NzciLCJlbWFpbCI6ImZyYW5jZXNjb2dlbnR5bGVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQzYjVmODIzNjhkMjk1NjIxMTk0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMTY3NGQ2NzNhODllZjRmZGRlZjJiNDVmYzE4YTg1MDU5ZTcwYTgzOTM4ZGU5ZjJiY2JjNzBlOWJhNzA1NjAwMyIsImlhdCI6MTY2Njc0MzA2OH0.nVxn2JlCO7Qu_8vK8-8N0OgfKK4RK-Xped9CBxG6KLU"
      },
      body: data
    })
    return (await res.json()).IpfsHash
    }
  )

  const { config, isSuccess: isPrepared } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: abi,
    functionName: "postCat",
    args: [metadataHash, true],
  })
  const { isLoading: contractLoading, write, isSuccess } = useContractWrite({
    ...config,
    onSuccess() {
      setCatName("")
      setCatDescription("")
      setCatPic("")
      setTimeout(reload, 1000)
    },
  })

  useEffect(()=> {
    if (isPrepared && write) {
      write()
    }
  }, [write, isPrepared])

  return (
    <Grid container spacing={8} justifyContent="center">
      <Grid item xs={12} justifyContent="center" sx={{textAlign:"center"}}>
        <Typography variant="h1">
          Mint a cat
        </Typography>
      </Grid>
      <Grid item sm={12} md={6} lg={4}>
        <Stack spacing={4} justifyContent="center" sx={{height:"100%"}}>
          <TextField id="name" label="Cat Name:" value={catName} onChange={(e) => setCatName(e.target.value)}/>
          <TextField id="description" label="How is your cat:" value={catDescription} onChange={(e) => setCatDescription(e.target.value)}/>
          <TextField id="picture" label="Link to a picture of your cat:" value={catPic} onChange={(e) => setCatPic(e.target.value)}/>
          <LoadingButton
            variant="contained"
            onClick={()=>mutate()}
            loading={isLoading && contractLoading}
            disabled={!(catPic && catName && catDescription)}
          >Send</LoadingButton>
          {isSuccess?<Typography>
            Your cat is being minted, once the transction is done, refresh the page to see it
          </Typography>:<></>}
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <Typography variant="h2">
          Preview
        </Typography>
        <NFTCard
          title={catName}
          content={catDescription}
          imageURL={catPic}
        /> 
      </Grid>
    </Grid>
  )
}

export default MintNFT