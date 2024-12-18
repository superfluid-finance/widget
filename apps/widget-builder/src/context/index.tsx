"use client";

import { AppKitNetwork } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { supportedNetworks } from "@superfluid-finance/widget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { type Config, cookieToInitialState, WagmiProvider } from "wagmi";

import { projectId, wagmiAdapter } from "../config";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const _metadata = {
  name: "checkout-builder",
  description: "Superfluid Widget Builder",
  url: "https://widget-builder.superfluid.finance",
  icons: [
    "https://checkout-builder.superfluid.finance/assets/superfluid-logo.svg",
  ],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [...supportedNetworks] as [AppKitNetwork, ...AppKitNetwork[]],
  // metadata: metadata,
  features: {
    analytics: false,
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
