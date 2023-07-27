import "@/styles/globals.css";

import { supportedNetworks } from "@superfluid-finance/widget";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import type { AppProps } from "next/app";
import { IntercomProvider } from "react-use-intercom";
import { WagmiConfig } from "wagmi";

import configuration from "@/configuration";
import { demoConfig } from "@/utils/connectionUtils";

const { WalletConnectProjectID, IntercomAppID } = configuration;

const ethereumClient = new EthereumClient(demoConfig, supportedNetworks);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <IntercomProvider appId={IntercomAppID}>
        <WagmiConfig config={demoConfig}>
          <Component {...pageProps} />

          <Web3Modal
            projectId={WalletConnectProjectID}
            ethereumClient={ethereumClient}
          />
        </WagmiConfig>
      </IntercomProvider>
    </>
  );
}
