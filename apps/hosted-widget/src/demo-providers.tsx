import * as React from "react";
import { WagmiConfig } from "wagmi";

import { wagmiConfigDemo } from "./wagmi-demo";

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
