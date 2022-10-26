import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { ethers } from "ethers";
import { FC, ReactNode } from "react";
import NFTDeployment from "smart-contracts/deployments/localhost/CatAdoption.json"
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";

const { address, abi } = NFTDeployment

interface NFTCardProps {
  imageURL?: string;
  title?: string;
  content?: ReactNode;
  tokenId?: number;
}

const NFTCard: FC<NFTCardProps> = ({imageURL, title, content, tokenId}) => {

  // Cat petting
  const tokenIdBN = ethers.BigNumber.from(tokenId || 0)

  const { config: petConfig } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: abi,
    functionName: "petCat",
    args: [tokenIdBN],
    overrides: {value: ethers.utils.parseEther("0.001")}
  })
  const { isLoading: petLoading, write: petCat } = useContractWrite(petConfig)

  // Cat adoption

  const { data: isAdopted } = useContractRead({
    addressOrName: address,
    contractInterface: abi,
    functionName: "isAdopted",
    args: [tokenIdBN],
    watch: true
  })

  const { config: adoptConfig } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: abi,
    functionName: "adoptCat",
    args: [tokenIdBN],
  })
  const { isLoading: adoptLoading, write: adoptCat } = useContractWrite(adoptConfig)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="240"
        image={imageURL || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd7%2Ff7%2Fa1%2Fd7f7a1b6937d60a71355cf12d4d0ecb2.jpg&f=1&nofb=1&ipt=d097048157e84305884ca038e7188e919cda44fdbbe29102e1350c85b3476a08&ipo=images"}
        alt="cat"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title || "A cat name"} {isAdopted?" (Adopted)":<></>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content || "A cat description"}
        </Typography>
      </CardContent>
      <CardActions sx={{alignItems:"center", justifyContent:"center"}}>
        <LoadingButton size="small"
          disabled={tokenId===undefined || !petCat}
          onClick={() => petCat!()}
          loading={petLoading}
        >Pet</LoadingButton>
        <LoadingButton size="small"
          disabled={tokenId===undefined || !adoptCat || !!isAdopted}
          onClick={() => adoptCat!()}
          loading={adoptLoading}
        >
          Adopt
        </LoadingButton>
      </CardActions>
    </Card>
  )
}

export default NFTCard