import { FC } from "react";
import { useQuery } from "react-query";
import { ipfsToPinataURL } from "../utils/urls";
import NFTCard from "./NFTCard";

const NFTDisplay: FC<{metadataURL: string, tokenId: number}> = ({metadataURL, tokenId}) => {

    const metadataQuery = useQuery(metadataURL, async () => {
        return await (await fetch(ipfsToPinataURL(metadataURL))).json()
    }, {
        staleTime: Infinity,
        cacheTime: 30 * 24 * 3600
    })

    return <NFTCard
        content={metadataQuery.data?.description}
        imageURL={metadataQuery.data?.image}
        title={metadataQuery.data?.name}
        tokenId={tokenId}
    />
}

export default NFTDisplay