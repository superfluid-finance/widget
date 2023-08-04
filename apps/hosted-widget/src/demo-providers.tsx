import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { walletConnectProjectId } from "./wagmi";
import { wagmiChainsDemo, wagmiConfigDemo } from "./wagmi-demo";

const ethereumClient = new EthereumClient(wagmiConfigDemo, wagmiChainsDemo);

export function WagmiDemoProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfigDemo}>
      {mounted && children}
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
  );
}