import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { supportedNetworks } from "@superfluid-finance/widget";
import { defaultWagmiConfig, walletConnectProvider } from "@web3modal/wagmi";
import { AppProps } from "next/app";
import Head from "next/head";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import createEmotionCache from "../createEmotionCache";
import useAnalyticsBrowser from "../hooks/useAnalyticsBrowser";
import useWalletAnalytics from "../hooks/useWalletAnalytics";
import { superfluidRpcUrls } from "../superfluidRpcUrls";
import theme from "../theme";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

const { chains, publicClient } = configureChains(supportedNetworks, [
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
  walletConnectProvider({
    projectId,
  }),
  publicProvider(),
]);
export const wagmiChains = chains;

const w3mConnectors = () =>
  defaultWagmiConfig({
    projectId,
    chains: wagmiChains,
  }).connectors;

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors(),
  publicClient,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Superfluid Checkout Builder | Web3 Subscriptions Toolkit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
          <Analytics />
        </WagmiConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}

function Analytics() {
  const analyticsBrowser = useAnalyticsBrowser();
  useWalletAnalytics({ analyticsBrowser });
  return null;
}
