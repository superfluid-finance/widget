import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { superfluidRpcUrls, wagmiChains } from "./wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { MockConnector } from "wagmi/connectors/mock";
import { createWalletClient, http } from "viem";

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_THE_THING! as `0x${string}`,
);

const connector = new MockConnector({
  options: {
    walletClient: createWalletClient({
      account,
      transport: http(superfluidRpcUrls[polygonMumbai.id]),
    }),
  },
  chains: wagmiChains,
});

const { chains, publicClient } = configureChains(wagmiChains, [
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
]);

export const wagmiChainsDemo = chains;
export const wagmiConfigDemo = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [connector],
});
