import pinataSDK from "@pinata/sdk";

import { base64ToStream } from "./b64ToReadableStream";

const pinata = new pinataSDK({
  pinataApiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY,
  pinataSecretApiKey: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
});

export const pinNFTImageToIPFS = async ({
  tokenName,
  tokenSymbol,
  nftImage,
}: {
  tokenName: string;
  tokenSymbol: string;
  nftImage: string;
}) => {
  const { IpfsHash } = await pinata.pinFileToIPFS(base64ToStream(nftImage), {
    pinataMetadata: {
      name: `StreamGating NFT Image (${tokenName}, ${tokenSymbol})`,
    },
  });

  return IpfsHash;
};
