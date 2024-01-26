import { supportedNetworks } from "@superfluid-finance/widget";
import { walletConnectProvider } from "@web3modal/wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react";
import { configureChains, createConfig } from "wagmi";
import { SafeConnector } from "wagmi/connectors/safe";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import { superfluidRpcUrls } from "./constants";

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

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
  walletConnectProvider({
    projectId: walletConnectProjectId,
  }),
  publicProvider(),
]);

export const wagmiChains = chains;

const safeConnector = new SafeConnector({
  chains: wagmiChains,
  options: {
    allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
    debug: false,
  },
});

const w3mConnectors = () =>
  defaultWagmiConfig({
    projectId: walletConnectProjectId,
    chains: wagmiChains,
  }).connectors;

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    ...w3mConnectors(),
    ...(safeConnector.ready ? [safeConnector] : []),
  ],
  publicClient,
});
