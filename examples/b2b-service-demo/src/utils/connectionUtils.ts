import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { configureChains, createConfig } from "wagmi";
import { MockConnector } from "wagmi/connectors/mock";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import configuration from "@/configuration";

import { getWeb3AuthConnector } from "./web3Auth";

const isServer = typeof window === "undefined";

const NOOP_ACCOUNT =
  "0x498262a4afde2bdd9e1bef3aafc6442ec36ccf167e527457a211118de93346ba";
const account = privateKeyToAccount(
  (process.env.NEXT_PUBLIC_THE_THING ?? NOOP_ACCOUNT) as `0x${string}`,
);

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

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

const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId: walletConnectProjectId,
    showQrModal: true,
  },
});

export const mockConnector = new MockConnector({
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
  autoConnect: false,
  publicClient,
  connectors: () => [
    ...(isServer
      ? []
      : [mockConnector, walletConnectConnector, getWeb3AuthConnector(chains)]),
  ],
});
