import { supportedNetwork } from "@superfluid-finance/widget";

const {
  arbitrum,
  avalanche,
  avalancheFuji,
  bsc,
  celo,
  goerli,
  gnosis,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} = supportedNetwork;

export const superfluidRpcUrls = {
  [arbitrum.id]: "https://rpc-endpoints.superfluid.dev/arbitrum-one",
  [avalanche.id]: "https://rpc-endpoints.superfluid.dev/avalanche-c",
  [avalancheFuji.id]: "https://rpc-endpoints.superfluid.dev/avalanche-fuji",
  [bsc.id]: "https://rpc-endpoints.superfluid.dev/bsc-mainnet",
  [celo.id]: "https://rpc-endpoints.superfluid.dev/celo-mainnet",
  [goerli.id]: "https://rpc-endpoints.superfluid.dev/eth-goerli",
  [gnosis.id]: "https://rpc-endpoints.superfluid.dev/xdai-mainnet",
  [mainnet.id]: "https://rpc-endpoints.superfluid.dev/eth-mainnet",
  [optimism.id]: "https://rpc-endpoints.superfluid.dev/optimism-mainnet",
  [polygon.id]: "https://rpc-endpoints.superfluid.dev/polygon-mainnet",
  [polygonMumbai.id]: "https://rpc-endpoints.superfluid.dev/polygon-mumbai",
} as const;
