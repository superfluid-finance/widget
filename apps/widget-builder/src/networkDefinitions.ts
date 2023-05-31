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
  name: string;
  chainId: number;
  subgraphUrl: string;
  isTestnet?: boolean;
  logoUrl: string;
};

export const networks: Network[] = [
  {
    name: "Goerli",
    chainId: 5,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli",
    isTestnet: true,
    logoUrl: "/assets/network-icons/ethereum.svg",
  },
  {
    name: "Polygon Mumbai",
    chainId: 80001,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
    isTestnet: true,
    logoUrl: "/assets/network-icons/polygon.svg",
  },
  {
    name: "Optimism Goerli",
    chainId: 420,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-goerli",
    isTestnet: true,
    logoUrl: "/assets/network-icons/optimism.svg",
  },
  {
    name: "Arbitrum Goerli",
    chainId: 421613,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-goerli",
    isTestnet: true,
    logoUrl: "/assets/network-icons/arbitrum.svg",
  },
  {
    name: "Avalanche Fuji",
    chainId: 43113,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-avalanche-fuji",
    isTestnet: true,
    logoUrl: "/assets/network-icons/avalanche.svg",
  },
  {
    name: "Gnosis Chain",
    chainId: 100,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-xdai",
    logoUrl: "/assets/network-icons/gnosis.svg",
  },
  {
    name: "Polygon",
    chainId: 137,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic",
    logoUrl: "/assets/network-icons/polygon.svg",
  },
  {
    name: "Optimism",
    chainId: 10,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-mainnet",
    logoUrl: "/assets/network-icons/optimism.svg",
  },
  {
    name: "Arbitrum One",
    chainId: 42161,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-one",
    logoUrl: "/assets/network-icons/arbitrum.svg",
  },
  {
    name: "Avalanche C",
    chainId: 43114,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-avalanche-c",
    logoUrl: "/assets/network-icons/avalanche.svg",
  },
  {
    name: "BNB Smart Chain",
    chainId: 56,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-bsc-mainnet",
    logoUrl: "/assets/network-icons/binance-smart-chain.svg",
  },
  {
    name: "Ethereum",
    chainId: 1,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-eth-mainnet",
    logoUrl: "/assets/network-icons/ethereum.svg",
  },
  {
    name: "Celo",
    chainId: 42220,
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-celo-mainnet",
    logoUrl: "/assets/network-icons/celo.svg",
  },
];
