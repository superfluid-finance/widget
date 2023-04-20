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


export const networks = [
  {
    name: 'Goerli',
    chainId: 5,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli',
  },
  {
    name: 'Polygon Mumbai',
    chainId: 80001,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai',
  },
  {
    name: 'Optimism Goerli',
    chainId: 420,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-goerli',
  },
  {
    name: 'Arbitrum Goerli',
    chainId: 421613,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-goerli',
  },
  {
    name: 'Avalanche Fuji',
    chainId: 43113,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-avalanche-fuji',
  },
  {
    name: 'Gnosis Chain',
    chainId: 100,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-xdai',
  },
  {
    name: 'Polygon',
    chainId: 137,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic',
  },
  {
    name: 'Optimism',
    chainId: 10,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-mainnet',
  },
  {
    name: 'Arbitrum One',
    chainId: 42161,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-one',
  },
  {
    name: 'Avalanche C',
    chainId: 43114,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-avalanche-c',
  },
  {
    name: 'BNB Smart Chain',
    chainId: 56,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-bsc-mainnet',
  },
  {
    name: 'Ethereum',
    chainId: 1,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-eth-mainnet',
  },
  {
    name: 'Celo',
    chainId: 42220,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-celo-mainnet',
  }
]