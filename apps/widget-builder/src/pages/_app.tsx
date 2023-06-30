import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  supportedNetwork,
  supportedNetworks,
} from "@superfluid-finance/widget";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import useAnalyticsBrowser from "../hooks/useAnalyticsBrowser";
import useWalletAnalytics from "../hooks/useWalletAnalytics";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

const {
  arbitrum,
  avalanche,
  avalancheFuji,
  bsc,
  celo,
  goerli,
  gnosis,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} = supportedNetwork;

export const superfluidRpcUrls = {
  [arbitrum.id]: "https://rpc-endpoints.superfluid.dev/arbitrum-one",
  [avalanche.id]: "https://rpc-endpoints.superfluid.dev/avalanche-c",
  [avalancheFuji.id]: "https://rpc-endpoints.superfluid.dev/avalanche-fuji",
  [bsc.id]: "https://rpc-endpoints.superfluid.dev/bsc-mainnet",
  [celo.id]: "https://rpc-endpoints.superfluid.dev/celo-mainnet",
  [goerli.id]: "https://rpc-endpoints.superfluid.dev/eth-goerli",
  [gnosis.id]: "https://rpc-endpoints.superfluid.dev/xdai-mainnet",
  [mainnet.id]: "https://rpc-endpoints.superfluid.dev/eth-mainnet",
  [optimism.id]: "https://rpc-endpoints.superfluid.dev/optimism-mainnet",
  [polygon.id]: "https://rpc-endpoints.superfluid.dev/polygon-mainnet",
  [polygonMumbai.id]: "https://rpc-endpoints.superfluid.dev/polygon-mumbai",
} as const;

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
  w3mProvider({ projectId }),
  publicProvider(),
]);
export const wagmiChains = chains;

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    chains: wagmiChains,
  }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);

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
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
          <Analytics />
        </WagmiConfig>
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeVariables={{ "--w3m-z-index": "1210" }}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}

function Analytics() {
  const analyticsBrowser = useAnalyticsBrowser();
  useWalletAnalytics({ analyticsBrowser });
  return null;
}
