import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { wagmiChains, wagmiConfig, walletConnectProjectId } from "./wagmi";

const ethereumClient = new EthereumClient(wagmiConfig, wagmiChains);

export function WagmiProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      {mounted && children}
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
  );
}
