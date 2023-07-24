import { Box, Container, Fade } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import tokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import DemoWalletDisplay from "../../src/components/demo-wallet-display/DemoWalletDisplay";
import useAnalyticsBrowser from "../../src/hooks/useAnalyticsBrowser";
import useFontLoader from "../../src/hooks/useFontLoader";
import useLoadFromIPFS from "../../src/hooks/useLoadFromIPFS";
import useWalletAnalytics from "../../src/hooks/useWalletAnalytics";
import { WagmiDemoProviders } from "../../src/providers";
import { deleteFlow } from "../../src/utils/deleteDemoFlow";

function generateRandomReceiver() {
  return privateKeyToAccount(generatePrivateKey()).address;
}

const superfluidDemoIPFSHash = "QmWxgE57RHou36fDYwS7qCVZgK2SDhZzNSs2t6nqsmGc1X";

const IPFSWidgetPage: NextPage = () => {
  const [randomReceiver] = useState<`0x${string}`>(generateRandomReceiver());

  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen],
  );

  const { data, loading } = useLoadFromIPFS(superfluidDemoIPFSHash);

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
