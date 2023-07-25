import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { configureChains, createConfig } from "wagmi";
import { MockConnector } from "wagmi/connectors/mock";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import configuration from "@/configuration";

const NOOP_PRIVATE_KEY =
  "0x498262a4afde2bdd9e1bef3aafc6442ec36ccf167e527457a211118de93346ba";
const account = privateKeyToAccount(
  (process.env.NEXT_PUBLIC_THE_THING ?? NOOP_PRIVATE_KEY) as `0x${string}`,
);

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: configuration.MumbaiRPC,
      }),
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
      transport: http(configuration.MumbaiRPC),
      chain: polygonMumbai,
    }),
  },
  chains: [polygonMumbai],
});

export const demoChains = chains;
export const demoConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [connector],
});
