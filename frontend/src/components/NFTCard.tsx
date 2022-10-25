import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface NFTCardProps {
  imageURL?: string;
  title?: string;
  content?: ReactNode
}

const NFTCard: FC<NFTCardProps> = ({imageURL, title, content}) => {
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
          {title || "A cat name"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content || "A cat description"}
        </Typography>
      </CardContent>
      <CardActions sx={{alignItems:"center", justifyContent:"center"}}>
        <Button size="small">Pet</Button>
        <Button size="small">Adopt</Button>
      </CardActions>
    </Card>
  )
}

export default NFTCard