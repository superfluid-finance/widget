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
import {
  SuperfluidWidget,
  supportedNetworks,
} from "@superfluid-finance/widget";
import tokenList from "@superfluid-finance/tokenlist";
import { useMemo } from "react";

import { WagmiConfig, configureChains, createConfig } from "wagmi";

const projectId = "952483bf7a0f5ace4c40eb53967f1368";

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

  if (loading && data === null) return <div>Loading...</div>;

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
    </WagmiConfig>
  );
};

export default IPFSWidgetPage;
