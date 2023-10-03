"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { wagmiConfig } from "../wagmi";

export function Providers({
  children,
  initialChainId,
}: {
  children: React.ReactNode;
  initialChainId: number | undefined;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider
        options={{
          initialChainId,
        }}
      >
        {mounted && children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
