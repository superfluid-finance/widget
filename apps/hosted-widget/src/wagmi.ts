import { supportedNetworks } from "@superfluid-finance/widget";
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

const { chains, publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId: walletConnectProjectId }),
]);

export const wagmiChains = chains;
export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId: walletConnectProjectId,
    version: 2,
    chains: wagmiChains,
  }),
  publicClient,
});
