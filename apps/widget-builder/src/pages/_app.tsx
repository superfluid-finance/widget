import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";

import ContextProvider from "../context";
import createEmotionCache from "../createEmotionCache";
import useAnalyticsBrowser from "../hooks/useAnalyticsBrowser";
import useWalletAnalytics from "../hooks/useWalletAnalytics";
import theme from "../theme";

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
        <ContextProvider cookies={null}>
          <Component {...pageProps} />
          <Analytics />
        </ContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

function Analytics() {
  const analyticsBrowser = useAnalyticsBrowser();
  useWalletAnalytics({ analyticsBrowser });
  return null;
}
