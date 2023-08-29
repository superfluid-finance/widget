import superfluidMetadata from "@superfluid-finance/widget/metadata";

export const superfluidRpcUrls = superfluidMetadata.networks.reduce(
  (acc, network) => {
    acc[
      network.chainId
    ] = `https://rpc-endpoints.superfluid.dev/${network.name}`;
    return acc;
  },
  {} as Record<number, string>,
);
