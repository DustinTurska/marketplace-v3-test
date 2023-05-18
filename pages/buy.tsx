import { useContract, useNFTs, useTokenSupply, useTotalCount } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
//import CollectionPage from "../components/Collection/banner"
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";



const loadSupply = (contract: SmartContract<BaseContract> | undefined) => {

  const { data: count, isLoading, error } = useTotalCount(contract);
  if (!isLoading) {
    return count?.toNumber();
  }
}



export default function Buy() {

  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(100);

  const loadMore = () => {
    setStart(end)
    setEnd(end + 100)
  }

  const supply = loadSupply(contract)


  const { data, isLoading } = useNFTs(contract, { start: start, count: end });


  // Load all of the NFTs from the NFT Collection
  // const { data, isLoading } = useNFTs(contract);

  return (
    <Container maxWidth="lg">
      {/*
      <CollectionPage contractMetadata={undefined} nft={{
        metadata: {
          name: undefined,
          description: undefined,
          image: undefined,
          external_url: undefined,
          animation_url: undefined,
          background_color: undefined,
          properties: undefined,
          attributes: undefined,
          id: "",
          uri: ""
        },
        owner: "",
        type: "ERC1155",
        supply: 0,
        quantityOwned: undefined
      }} />
    */}
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />{supply && end < supply && (
        <button onClick={loadMore}>
          Load 100 more
        </button>
      )}<div>

      </div>
    </Container>
  );
}