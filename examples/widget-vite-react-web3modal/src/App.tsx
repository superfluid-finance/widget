import "./App.css";

import SuperfluidWidget, {
  EventListeners,
  supportedNetworks,
  WalletManager,
} from "@superfluid-finance/widget";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { useWeb3Modal, Web3Modal } from "@web3modal/react";
import { useMemo } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import paymentDetails from "./paymentDetails";
import productDetails from "./productDetails";

const projectId = "952483bf7a0f5ace4c40eb53967f1368";

const { publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    chains: supportedNetworks,
  }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);

function App() {
  const { open, isOpen, setDefaultChain } = useWeb3Modal();
  const walletManager = useMemo<WalletManager>(
    () => ({
      open: ({ chain }) => {
        if (chain) {
          setDefaultChain(chain);
        }
        open();
      },
      isOpen,
    }),
    [open, isOpen, setDefaultChain],
  );

  const eventListeners: EventListeners = useMemo(
    () => ({
      onSuccess: () => console.log("onSuccess"),
      onSuccessButtonClick: () => console.log("onSuccessButtonClick"),
    }),
    [],
  );

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          type="drawer"
          walletManager={walletManager}
          eventListeners={eventListeners}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Drawer</button>
          )}
        </SuperfluidWidget>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          type="dialog"
          walletManager={walletManager}
          eventListeners={eventListeners}
        >
          {({ openModal }) => (
            <button onClick={() => openModal()}>Dialog</button>
          )}
        </SuperfluidWidget>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          type="full-screen"
          walletManager={walletManager}
          eventListeners={eventListeners}
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
