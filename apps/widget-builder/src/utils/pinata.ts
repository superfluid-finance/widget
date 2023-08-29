import pinataSDK from "@pinata/sdk";
import { ChainId, PaymentOption } from "@superfluid-finance/widget";

import { base64ToStream } from "./b64ToReadableStream";
import { createNFTmeta } from "./createNFTmeta";

const pinata = new pinataSDK({
  pinataApiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY,
  pinataSecretApiKey: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
});

export const pinNFTMetaToIPFS = async ({
  tokenName,
  tokenSymbol,
  nftImage,
  selectedPaymentOptions,
}: {
  tokenName: string;
  tokenSymbol: string;
  nftImage: string;
  selectedPaymentOptions: Partial<Record<ChainId, PaymentOption[]>>;
}) => {
  const { IpfsHash: imageHash } = await pinata.pinFileToIPFS(
    base64ToStream(nftImage),
    {
      pinataMetadata: {
        name: `StreamGating NFT Image (${tokenName}, ${tokenSymbol})`,
      },
    },
  );

  const { IpfsHash: metaHash } = await pinata.pinJSONToIPFS(
    createNFTmeta({
      name: `${tokenName} (${tokenSymbol})`,
      description: "StreamGating NFT MetaData",
      image: `https://cloudflare-ipfs.com/ipfs/${imageHash}`,
      attributes: Object.values(selectedPaymentOptions)
        .flat()
        .map((paymentOption) => ({
          trait_type: "payment_option",
          value: [
            `chainId: ${paymentOption.chainId}`,
            `flowRate: ${paymentOption.flowRate?.amountEther}/${paymentOption.flowRate?.period}`,
            `superToken: ${paymentOption.superToken.address}`,
          ].join(", "),
        })),
    }),
    {
      pinataMetadata: {
        name: `StreamGating NFT MetaData (${tokenName}, ${tokenSymbol})`,
      },
    },
  );

  return metaHash;
};
