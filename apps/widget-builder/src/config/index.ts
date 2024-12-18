import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { supportedNetworks } from "@superfluid-finance/widget";
import { http, Transport } from "wagmi";

import { superfluidRpcUrls } from "../superfluidRpcUrls";

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [...supportedNetworks];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks,
  transports: supportedNetworks.reduce(
    (acc, network) => {
      const rpcURL =
        superfluidRpcUrls[network.id as keyof typeof superfluidRpcUrls];

      if (rpcURL) {
        acc[network.id] = http(rpcURL);
      }

      return acc;
    },
    {} as Record<number, Transport>,
  ),
});

export const config = wagmiAdapter.wagmiConfig;
