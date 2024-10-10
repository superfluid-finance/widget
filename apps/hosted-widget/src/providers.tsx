"use client";
import { wagmiAdapter, projectId } from "./wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { supportedNetworks } from "@superfluid-finance/widget";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: supportedNetworks.map((c) => ({
    id: `eip155:${c.id}` as `eip155:${number}`,
    chainId: c.id,
    chainNamespace: "eip155",
    name: c.name,
    currency: c.nativeCurrency.name,
    explorerUrl: c.blockExplorers!.default.url,
    rpcUrl: c.rpcUrls.default.http[0],
  })),
});

export function WagmiProviders({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
