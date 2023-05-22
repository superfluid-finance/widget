import "./App.css";
import { CheckoutWidget, supportedNetworks } from "@superfluid-finance/widget";
import productDetails from "./productDetails";
import paymentDetails from "./paymentDetails";
import tokenList from "./tokenList";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { useMemo } from "react";

const projectId = "952483bf7a0f5ace4c40eb53967f1368";

const { publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    version: 1,
    chains: supportedNetworks,
  }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);

function App() {
  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(() => ({
    open, 
    isOpen
  }), [open, isOpen]);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <CheckoutWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={tokenList}
          type="drawer"
          walletManager={walletManager}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Drawer</button>
          )}
        </CheckoutWidget>
        <CheckoutWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={tokenList}
          type="dialog"
          walletManager={walletManager}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Dialog</button>
          )}
        </CheckoutWidget>
        <CheckoutWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={tokenList}
          type="full-screen"
          walletManager={walletManager}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Full-screen</button>
          )}
        </CheckoutWidget>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
