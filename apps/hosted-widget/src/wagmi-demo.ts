import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { configureChains, createConfig } from "wagmi";
import { MockConnector } from "wagmi/connectors/mock";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import { superfluidRpcUrls } from "./constants";

const account = privateKeyToAccount(
  (process.env.NEXT_PUBLIC_THE_THING ?? generatePrivateKey()) as `0x${string}`,
);

console.log("this is running");
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const rpcURL =
          superfluidRpcUrls[chain.id as keyof typeof superfluidRpcUrls];

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
