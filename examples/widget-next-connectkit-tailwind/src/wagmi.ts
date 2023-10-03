import { supportedNetworks } from "@superfluid-finance/widget";
import { getDefaultConfig } from "connectkit";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const walletConnectProjectId = "952483bf7a0f5ace4c40eb53967f1368";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedNetworks,
  [publicProvider()],
);

const { connectors } = getDefaultConfig({
  appName: "My Superfluid Checkout + Next.js + ConnectKit",
  chains,
  walletConnectProjectId: walletConnectProjectId,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
