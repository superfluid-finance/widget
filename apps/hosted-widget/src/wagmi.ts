import {
  supportedNetwork,
  supportedNetworks,
} from "@superfluid-finance/widget";
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

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

const { chains, publicClient } = configureChains(supportedNetworks, [
  jsonRpcProvider({
    rpc: (chain) => {
      const rpcURL =
        superfluidRpcUrls[chain.id as keyof typeof superfluidRpcUrls];

      if (!rpcURL) {
        return null;
      }

      return {
        http: rpcURL,
      };
    },
  }),
  w3mProvider({ projectId: walletConnectProjectId }),
  publicProvider(),
]);

export const wagmiChains = chains;
export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId: walletConnectProjectId,
    chains: wagmiChains,
  }),
  publicClient,
});
