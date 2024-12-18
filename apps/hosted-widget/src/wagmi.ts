import { AppKitNetwork } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { supportedNetworks } from "@superfluid-finance/widget";

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks: [...supportedNetworks] as [AppKitNetwork, ...AppKitNetwork[]],
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
