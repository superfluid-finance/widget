import { Fade } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";
import { useAppKit, useAppKitState } from "@reown/appkit/react";
import SuperfluidWidget from "@superfluid-finance/widget";
import { extendedSuperTokenList } from "@superfluid-finance/widget/tokenlist";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";

import AutoConnect from "../src/components/auto-connect/AutoConnect";
import DemoWalletDisconnect from "../src/components/startup-disconnect/DemoWalletDisconnect";
import useAnalyticsBrowser from "../src/hooks/useAnalyticsBrowser";
import useFontLoader from "../src/hooks/useFontLoader";
import useLoadFromIPFS from "../src/hooks/useLoadFromIPFS";
import useWalletAnalytics from "../src/hooks/useWalletAnalytics";
import { WagmiProviders } from "../src/providers";

type TypographyOptions = Theme["typography"];

const IPFSWidgetPage: NextPage = () => {
  const { query } = useRouter();

  const { open } = useAppKit();
  const { open: isOpen } = useAppKitState();
  const walletManager = useMemo(
    () => ({
      open: () => open(),
      isOpen,
    }),
    [open, isOpen],
  );

  const { data, loading, error } = useLoadFromIPFS(query.hash as string);

  const ajs = useAnalyticsBrowser();

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
    <WagmiProviders cookies={null}>
      <DemoWalletDisconnect />
      <AutoConnect />
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
            {data && (
              <SuperfluidWidget
                {...data}
                tokenList={extendedSuperTokenList}
                type="page"
                walletManager={walletManager}
                eventListeners={{
                  onButtonClick: (props) =>
                    ajs.track("button_click", { type: props?.type }),
                  onRouteChange: (props) =>
                    ajs.track("route_change", { route: props?.route }),
                  onTransactionSent: (props) => {
                    if (props?.functionName === "createFlow") {
                      ajs.track("stream_started", { txHash: props.hash });
                    }

                    if (props?.functionName === "updateFlow") {
                      ajs.track("stream_updated", { txHash: props.hash });
                    }
                  },
                }}
              />
            )}
          </Box>
          <Analytics />
        </Container>
      )}
    </WagmiProviders>
  );
};

export default IPFSWidgetPage;

function Analytics() {
  const analyticsBrowser = useAnalyticsBrowser();
  useWalletAnalytics({ analyticsBrowser });
  return null;
}
