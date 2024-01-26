import { createWeb3Modal } from "@web3modal/wagmi/react";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { wagmiChains, wagmiConfig, walletConnectProjectId } from "./wagmi";

const web3modal = createWeb3Modal({
  wagmiConfig,
  projectId: walletConnectProjectId,
  chains: wagmiChains,
});

export function WagmiProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return <WagmiConfig config={wagmiConfig}>{mounted && children}</WagmiConfig>;
}
