import "./App.css";
import {
  SuperfluidWidget,
  supportedNetworks,
} from "@superfluid-finance/widget";
import productDetails from "./productDetails";
import paymentDetails from "./paymentDetails";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { useMemo } from "react";
import superTokenList from "@superfluid-finance/tokenlist";

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

function App() {
  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen]
  );

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={superTokenList}
          type="drawer"
          walletManager={walletManager}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Drawer</button>
          )}
        </SuperfluidWidget>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={superTokenList}
          type="dialog"
          walletManager={walletManager}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Dialog</button>
          )}
        </SuperfluidWidget>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={superTokenList}
          type="full-screen"
          walletManager={walletManager}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Full-screen</button>
          )}
        </SuperfluidWidget>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
