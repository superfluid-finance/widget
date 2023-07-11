import "@/styles/globals.css";
import { supportedNetworks } from "@superfluid-finance/widget";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { IntercomProvider } from "react-use-intercom";
import configuration from "@/configuration";

const { WalletConnectProjectID, IntercomAppID } = configuration;

const { publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId: WalletConnectProjectID }),
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId: WalletConnectProjectID,
    chains: supportedNetworks,
  }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IntercomProvider appId={IntercomAppID}>
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>

        <Web3Modal
          projectId={WalletConnectProjectID}
          ethereumClient={ethereumClient}
        />
      </IntercomProvider>
    </>
  );
}
