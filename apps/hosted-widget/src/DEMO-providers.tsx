/**
 * WARINGING: Don't mix imports from wagmi.ts and wagmi-demo.ts.
 * It will break the main page, as wagmi's createConfig in the wagmi-demo.ts
 * will override the config in wagmi.ts, since wagmi has a global store.
 */

import * as React from "react";
import { WagmiConfig } from "wagmi";

import { wagmiConfigDemo } from "./DEMO-wagmi";

export function WagmiDemoProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfigDemo}>{mounted && children}</WagmiConfig>
  );
}
