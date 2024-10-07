import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { supportedNetworks } from "@superfluid-finance/widget";

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
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

export const wagmiConfig = wagmiAdapter.wagmiConfig;
