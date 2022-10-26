import { Button, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi';
import NFTDeployment from "smart-contracts/deployments/localhost/CatAdoption.json"
import { BigNumber } from "ethers";
import NFTDisplay from "../components/NFTDisplay";
import MintNFT from "../components/MintNFT";

const { address, abi } = NFTDeployment

const catPics = ["https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg","https://cdn.pixabay.com/photo/2015/06/03/13/13/cats-796437__480.jpg","https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg","https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg","https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg","https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg","https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg","https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172__480.jpg","https://cdn.pixabay.com/photo/2013/10/28/14/30/cat-201855__480.jpg","https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793__480.jpg","https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/52/cat-2361787__480.jpg","https://cdn.pixabay.com/photo/2014/10/01/10/46/cat-468232__480.jpg","https://cdn.pixabay.com/photo/2014/04/29/13/19/cat-334383__480.jpg","https://cdn.pixabay.com/photo/2014/01/17/14/53/cat-246933__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/46/cats-2361762__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/06/cat-2332444__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/35/cat-301720__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/07/cat-2332451__480.jpg","https://cdn.pixabay.com/photo/2014/08/03/00/51/kitten-408798__480.jpg","https://cdn.pixabay.com/photo/2017/05/11/07/27/cat-2303146__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/49/cat-301723__480.jpg","https://cdn.pixabay.com/photo/2013/07/18/20/27/cat-165068__480.jpg","https://cdn.pixabay.com/photo/2017/05/25/07/40/cat-2342562__480.jpg","https://cdn.pixabay.com/photo/2017/05/30/22/27/british-shorthair-2358404__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/15/15/cat-2208535__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/10/57/cat-2323258__480.jpg","https://cdn.pixabay.com/photo/2016/11/18/21/26/cat-1836936__480.jpg","https://cdn.pixabay.com/photo/2017/03/19/22/09/cat-2157747__480.jpg","https://cdn.pixabay.com/photo/2017/04/21/13/24/red-headed-cat-2248705__480.jpg"]
const catSounds = ["Aohhuu","Bark","Bark","Caterwaul","Chatter","Chirp","Chirrup","Churr","Chuckling","Coughing","Cough","Eh","Grow","Grunt","Gurgl","Meow","Moan","Mrrr","Orr","o-o","Ouch","Piercing","Prusten","Puff","Purr","Hiss","Roar","Scream","Snar","Snort","Spit","Squeak","Stutter","Swallowed","Trill","Wah","Whistle","Yap","Yea","Yelp","Yowl"]
const max = 30

const contractConfig = {
  addressOrName: address,
  contractInterface: abi
}

const NFT = () => {
  
  const { data, fetchNextPage, refetch } = useContractInfiniteReads({
    cacheKey: 'cats',
    ...paginatedIndexesConfig(
      (index) => {
        return { //on newer versions this returns an array
            ...contractConfig,
            functionName: 'tokenURI',
            args: [BigNumber.from(index)] as const,
          }
      },
      { start: 0, perPage: 5, direction: 'increment' },
    )
  })
  const lastCatsUrls = data?.pages[data?.pages.length - 1]
  const moreData = lastCatsUrls? !!lastCatsUrls[lastCatsUrls.length - 1]: false
  let allCats: string[] = []
  data?.pages.forEach((page) => {allCats = allCats.concat(page)})
  console.log(allCats)

  const catNFTs = allCats.map((meta, i) => (meta?(
    <Grid item xs={12} sm={6} md={4} lg={3}key={i}>
      <NFTDisplay metadataURL={meta} tokenId={i}/>
    </Grid>
    ):<></>
  ))

  return (
    <Stack 
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={10}
      sx={{paddingTop:10, paddingBottom:10}}
    >
      <MintNFT reload={refetch}/>
      <Typography variant="h1">
        Collection
      </Typography>
      <Grid container spacing={2} sx={{paddingX:10}}>
        {catNFTs}
      </Grid>
      {moreData? <Button onClick={() =>fetchNextPage()}>
        Load More
      </Button>:<></>}
    </Stack>
  );
};

export default NFT;
