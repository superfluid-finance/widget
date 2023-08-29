export type NFTMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
};

export const createNFTmeta = ({
  name,
  description,
  image,
  attributes,
}: NFTMetadata) => {
  const metadata: NFTMetadata = {
    name,
    description,
    image,
    attributes,
  };

  return metadata;
};
