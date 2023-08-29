import pinataSDK from "@pinata/sdk";
import { ChainId, PaymentOption } from "@superfluid-finance/widget";

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
  const { IpfsHash } = await pinata.pinJSONToIPFS(
    createNFTmeta({
      name: `${tokenName} (${tokenSymbol})`,
      description: "StreamGating NFT MetaData",
      image: nftImage,
      attributes: Object.values(selectedPaymentOptions)
        .flat()
        .map((paymentOption) => ({
          trait_type: "Payment Option",
          value: `
               network: ${paymentOption.chainId},
               flowRate: ${paymentOption.flowRate?.amountEther}/${paymentOption.flowRate?.period}, 
               superToken: ${paymentOption.superToken.address}
              `,
        })),
    }),
    {
      pinataMetadata: {
        name: `StreamGating NFT MetaData (${tokenName}, ${tokenSymbol})`,
      },
    },
  );

  return IpfsHash;
};
