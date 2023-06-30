import {
  supportedNetwork,
  supportedNetworks,
} from "@superfluid-finance/widget";
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

export const superfluidRpcUrls = {
  [supportedNetwork.arbitrum.id]:
    "https://rpc-endpoints.superfluid.dev/arbitrum-one",
  [supportedNetwork.avalanche.id]:
    "https://rpc-endpoints.superfluid.dev/avalanche-c",
  [supportedNetwork.avalancheFuji.id]:
    "https://rpc-endpoints.superfluid.dev/avalanche-fuji",
  [supportedNetwork.bsc.id]: "https://rpc-endpoints.superfluid.dev/bsc-mainnet",
  [supportedNetwork.celo.id]:
    "https://rpc-endpoints.superfluid.dev/celo-mainnet",
  [supportedNetwork.goerli.id]:
    "https://rpc-endpoints.superfluid.dev/eth-goerli",
  [supportedNetwork.gnosis.id]:
    "https://rpc-endpoints.superfluid.dev/xdai-mainnet",
  [supportedNetwork.mainnet.id]:
    "https://rpc-endpoints.superfluid.dev/eth-mainnet",
  [supportedNetwork.optimism.id]:
    "https://rpc-endpoints.superfluid.dev/optimism-mainnet",
  [supportedNetwork.polygon.id]:
    "https://rpc-endpoints.superfluid.dev/polygon-mainnet",
  [supportedNetwork.polygonMumbai.id]:
    "https://rpc-endpoints.superfluid.dev/polygon-mumbai",
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
