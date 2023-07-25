import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { configureChains, createConfig } from "wagmi";
import { MockConnector } from "wagmi/connectors/mock";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import { superfluidRpcUrls } from "./wagmi";

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_THE_THING! as `0x${string}`,
);

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => {
        const rpcURL = superfluidRpcUrls[polygonMumbai.id];

        if (!rpcURL) {
          return null;
        }

        return {
          http: rpcURL,
        };
      },
    }),
    publicProvider(),
  ],
);

export const connector = new MockConnector({
  options: {
    flags: {
      noSwitchChain: true,
    },
    walletClient: createWalletClient({
      account,
      transport: http(superfluidRpcUrls[polygonMumbai.id]),
      chain: polygonMumbai,
    }),
  },
  chains: [polygonMumbai],
});

export const wagmiChainsDemo = chains;
export const wagmiConfigDemo = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [connector],
});
