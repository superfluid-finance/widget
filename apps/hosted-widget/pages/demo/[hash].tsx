import { Container, Box, Fade } from "@mui/material";

import { useRouter } from "next/router";
import { NextPage } from "next";
import useLoadFromIPFS from "../../src/hooks/useLoadFromIPFS";
import { useWeb3Modal } from "@web3modal/react";
import SuperfluidWidget from "@superfluid-finance/widget";
import tokenList from "@superfluid-finance/tokenlist";
import { useMemo } from "react";

import useAnalyticsBrowser from "../../src/hooks/useAnalyticsBrowser";
import useWalletAnalytics from "../../src/hooks/useWalletAnalytics";
import Image from "next/image";
import useFontLoader from "../../src/hooks/useFontLoader";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { WagmiDemoProviders } from "../../src/providers";
import DemoWalletDisplay from "../../src/components/demo-wallet-display/DemoWalletDisplay";
import { deleteFlow } from "../../src/utils/deleteDemoFlow";

const IPFSWidgetPage: NextPage = () => {
  const { query } = useRouter();

  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen],
  );

  const { data, loading } = useLoadFromIPFS(query.hash as string);

  const fontFamily = useMemo(() => {
    const typography = data?.theme?.typography as TypographyOptions;

    if (typography?.fontFamily) {
      return typography.fontFamily;
    }

    return undefined;
  }, [data]);

  useFontLoader(fontFamily);

  const showLoader = loading && data === null;

  return (
    <WagmiDemoProviders>
      {showLoader ? (
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
      ) : (
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
            <DemoWalletDisplay />

            {data && (
              <SuperfluidWidget
                {...data}
                tokenList={tokenList}
                type="page"
                walletManager={walletManager}
                eventListeners={{
                  onSuccess: () => deleteFlow(),
                }}
              />
            )}
          </Box>
          <Analytics />
        </Container>
      )}
    </WagmiDemoProviders>
  );
};

export default IPFSWidgetPage;

function Analytics() {
  const analyticsBrowser = useAnalyticsBrowser();
  useWalletAnalytics({ analyticsBrowser });
  return null;
}
