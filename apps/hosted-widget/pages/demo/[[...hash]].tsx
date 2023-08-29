import { Box, Container, Fade } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import SuperfluidWidget from "@superfluid-finance/widget";
import tokenList from "@superfluid-finance/widget/tokenlist";
import { useWeb3Modal } from "@web3modal/react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import DemoWalletDisplay from "../../src/components/demo-wallet-display/DemoWalletDisplay";
import { WagmiDemoProviders } from "../../src/DEMO-providers";
import useAnalyticsBrowser from "../../src/hooks/useAnalyticsBrowser";
import useFontLoader from "../../src/hooks/useFontLoader";
import useLoadFromIPFS from "../../src/hooks/useLoadFromIPFS";
import useWalletAnalytics from "../../src/hooks/useWalletAnalytics";
import { deleteFlow } from "../../src/utils/deleteDemoFlow";

function generateRandomReceiver() {
  return privateKeyToAccount(generatePrivateKey()).address;
}

const superfluidDemoIPFSHash =
  process.env.NEXT_PUBLIC_DEMO_IPFS ??
  "QmWxgE57RHou36fDYwS7qCVZgK2SDhZzNSs2t6nqsmGc1X";

const IPFSWidgetPage: NextPage = () => {
  const { query } = useRouter();

  const [randomReceiver] = useState<`0x${string}`>(generateRandomReceiver());

  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen],
  );

  const { data: demoData, loading: demoLoading } = useLoadFromIPFS(
    superfluidDemoIPFSHash,
  );

  const { data, loading } = useLoadFromIPFS(query.hash ? query.hash[0] : "");

  const fontFamily = useMemo(() => {
    const typography = data?.theme?.typography as TypographyOptions;

    if (typography?.fontFamily) {
      return typography.fontFamily;
    }

    return undefined;
  }, [data]);

  useFontLoader(fontFamily);

  const showLoader =
    (demoLoading && demoData === null) || (loading && data === null);

  const config = useMemo(() => {
    if (!demoData) return null;
    if (!data) return demoData;

    return {
      ...data,
      paymentDetails: demoData.paymentDetails,
    };
  }, [demoData, data, randomReceiver]);

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

            {config && (
              <SuperfluidWidget
                {...config}
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
