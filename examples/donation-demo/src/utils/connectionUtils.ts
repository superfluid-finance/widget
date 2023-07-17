import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { MockConnector } from "wagmi/connectors/mock";
import { createWalletClient, http } from "viem";
import configuration from "@/configuration";

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_THE_THING! as `0x${string}`,
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
