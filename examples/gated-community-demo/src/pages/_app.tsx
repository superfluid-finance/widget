import "@/styles/globals.css";

import { supportedNetworks } from "@superfluid-finance/widget";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { WagmiConfig } from "wagmi";

import configuration from "@/configuration";
import { demoConfig } from "@/utils/connectionUtils";

const { WalletConnectProjectID } = configuration;

// TODO: If automatically signing fails then fall back to manual signing
// const { publicClient } = configureChains(supportedNetworks, [
//   w3mProvider({ projectId: WalletConnectProjectID }),
// ]);

// const wagmiConfig = createConfig({
//   autoConnect: false,
//   connectors: w3mConnectors({
//     projectId: WalletConnectProjectID,
//     chains: supportedNetworks,
//   }),
//   publicClient,
// });

const ethereumClient = new EthereumClient(demoConfig, supportedNetworks);

const title = "Superfluid Subscriptions - DAOs and Communities";
const description =
  "In as little as 3 clicks, users can subscribe to your DAO with crypto and gain access to your gated Discord, Telegram, and more.";
const image = `https://cliques-demo.superfluid.finance/og.png`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* OG tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Non-OG image tag */}
        <meta name="image" content={image} />
      </Head>
      <WagmiConfig config={demoConfig}>
        <Component {...pageProps} />
        <Web3Modal
          projectId={WalletConnectProjectID}
          ethereumClient={ethereumClient}
        />
      </WagmiConfig>
    </>
  );
}
