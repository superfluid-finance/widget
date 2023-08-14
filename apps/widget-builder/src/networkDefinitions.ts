export const networkNames = [
  "Goerli",
  "Polygon Mumbai",
  "Optimism Goerli",
  "Arbitrum Goerli",
  "Avalanche Fuji",
  "Gnosis Chain",
  "Polygon",
  "Optimism",
  "Arbitrum One",
  "Avalanche C",
  "BNB Smart Chain",
  "Ethereum",
  "Celo",
] as const;
export type NetworkNames = (typeof networkNames)[number];

export const chainIds = [
  5, 80001, 420, 421613, 43113, 100, 137, 10, 42161, 43114, 56, 1, 42220,
] as const;
export type ChainId = (typeof chainIds)[number];

export const networkDefinitions: Record<NetworkNames, { chainId: ChainId }> = {
  Goerli: { chainId: 5 as const },
  "Polygon Mumbai": { chainId: 80001 },
  "Optimism Goerli": { chainId: 420 },
  "Arbitrum Goerli": { chainId: 421613 },
  "Avalanche Fuji": { chainId: 43113 },
  "Gnosis Chain": { chainId: 100 },
  Polygon: { chainId: 137 },
  Optimism: { chainId: 10 },
  "Arbitrum One": { chainId: 42161 },
  "Avalanche C": { chainId: 43114 },
  "BNB Smart Chain": { chainId: 56 },
  Ethereum: { chainId: 1 },
  Celo: { chainId: 42220 },
} as const;

export type Network = {
  name: NetworkNames;
  chainId: number;
  rpcUrl: string;
  subgraphUrl: string;
  isTestnet?: boolean;
  logoUrl?: string;
  color?: string;
};

export const networks: Network[] = [
  {
    name: "Goerli",
    chainId: 5,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli",
    isTestnet: true,
    color: "#9064ff",
  },
  {
    name: "Polygon Mumbai",
    chainId: 80001,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
    isTestnet: true,
    color: "#3099f2",
  },
  {
    name: "Optimism Goerli",
    chainId: 420,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-goerli",
    isTestnet: true,
    color: "#ff0320",
  },
  {
    name: "Arbitrum Goerli",
    chainId: 421613,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-goerli",
    isTestnet: true,
    color: "#2b374b",
  },
  {
    name: "Avalanche Fuji",
    chainId: 43113,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-avalanche-fuji",
    isTestnet: true,
    color: "#2b374b",
  },
  {
    name: "Gnosis Chain",
    chainId: 100,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-xdai",
    logoUrl: "/assets/network-icons/gnosis.svg",
    color: "#04795b",
  },
  {
    name: "Polygon",
    chainId: 137,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic",
    logoUrl: "/assets/network-icons/polygon.svg",
    color: "#7c3fe4",
  },
  {
    name: "Optimism",
    chainId: 10,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-mainnet",
    logoUrl: "/assets/network-icons/optimism.svg",
    color: "#ff0320",
  },
  {
    name: "Arbitrum One",
    chainId: 42161,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-one",
    logoUrl: "/assets/network-icons/arbitrum.svg",
    color: "#2b374b",
  },
  {
    name: "Avalanche C",
    chainId: 43114,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-avalanche-c",
    logoUrl: "/assets/network-icons/avalanche.svg",
    color: "#e84142",
  },
  {
    name: "BNB Smart Chain",
    chainId: 56,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-bsc-mainnet",
    logoUrl: "/assets/network-icons/bnb.svg",
    color: "#F0B90B",
  },
  {
    name: "Ethereum",
    chainId: 1,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-eth-mainnet",
    logoUrl: "/assets/network-icons/ethereum.svg",
    color: "#627EEA",
  },
  {
    name: "Celo",
    chainId: 42220,
    rpcUrl: "",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-celo-mainnet",
    logoUrl: "/assets/network-icons/celo.svg",
    color: "#FCFF52",
  },
];

export const getNetworkByChainIdOrThrow = (chainId: ChainId) => {
  const result = networks.find((network) => network.chainId === chainId);

  if (!result) {
    throw new Error(`No network found for chainId ${chainId}`);
  }

  return result;
};
