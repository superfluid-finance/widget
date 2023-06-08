import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { useRouter } from "next/router";
import { NextPage } from "next";
import useLoadFromIPFS from "../src/hooks/useLoadFromIPFS";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import SuperfluidWidget, {
  supportedNetworks,
} from "@superfluid-finance/widget";
import tokenList from "@superfluid-finance/tokenlist";
import { useMemo } from "react";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import useAnalyticsBrowser from "../src/hooks/useAnalyticsBrowser";
import useWalletAnalytics from "../src/hooks/useWalletAnalytics";
import Image from "next/image";
import { Fade } from "@mui/material";
import useFontLoader from "../src/hooks/useFontLoader";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "952483bf7a0f5ace4c40eb53967f1368";

const { publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    version: 2,
    chains: supportedNetworks,
  }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);
const IPFSWidgetPage: NextPage = () => {
  const { query } = useRouter();

  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen]
  );

  const { data, loading, error } = useLoadFromIPFS(query.hash as string);

  const fontFamily = useMemo(() => {
    const typography = data?.theme?.typography as TypographyOptions;

    return typography.fontFamily;
  }, [data]);

  const font = useFontLoader(fontFamily);

  if (loading && data === null)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={true} timeout={{ enter: 1000 }}>
          <Image
            src="/superfluid-loader.gif"
            alt="loading"
            width={100}
            height={100}
          />
        </Fade>
      </Box>
    );

  return (
    <WagmiConfig config={wagmiConfig}>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data && (
            <SuperfluidWidget
              {...data}
              tokenList={tokenList}
              type="page"
              walletManager={walletManager}
            />
          )}
        </Box>
      </Container>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <Analytics />
    </WagmiConfig>
  );
};

export default IPFSWidgetPage;

function Analytics() {
  const analyticsBrowser = useAnalyticsBrowser();
  useWalletAnalytics({ analyticsBrowser });
  return null;
}
