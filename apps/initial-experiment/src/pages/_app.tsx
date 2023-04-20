import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";

import { chains, client, walletConnectProjectId } from "../wagmi";
import { EthereumClient } from "@web3modal/ethereum";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";

const ethereumClient = new EthereumClient(client, chains);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [mounted, setMounted] = useState(false);
  useEffect(() => void setMounted(true), []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {mounted && (
          <>
            <WagmiConfig client={client}>
              <Component {...pageProps} />
            </WagmiConfig>
            <Web3Modal
              projectId={walletConnectProjectId}
              ethereumClient={ethereumClient}
              themeVariables={{
                "--w3m-z-index": (theme.zIndex.modal + 1).toString(),
              }}
            />
          </>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}
