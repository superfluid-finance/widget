const nftAPIEndpoint =
  "https://nft.superfluid.finance/api/v1/existential/getmeta";

export const createBaseURI = (queryParams: Record<string, string>) =>
  `${nftAPIEndpoint}?${Object.entries(queryParams)
    .map(([key, value]) => new URLSearchParams({ [key]: value }))
    .join("&")}`;
