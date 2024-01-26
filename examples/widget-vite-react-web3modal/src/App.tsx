import "./App.css";

import SuperfluidWidget, {
  EventListeners,
  supportedNetworks,
  WalletManager,
} from "@superfluid-finance/widget";
import { defaultWagmiConfig, walletConnectProvider } from "@web3modal/wagmi";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useMemo } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import paymentDetails from "./paymentDetails";
import productDetails from "./productDetails";

const projectId = "952483bf7a0f5ace4c40eb53967f1368";

const { publicClient, chains: wagmiChains } = configureChains(
  supportedNetworks,
  [
    walletConnectProvider({
      projectId,
    }),
  ],
);

const w3mConnectors = () =>
  defaultWagmiConfig({
    projectId,
    chains: wagmiChains,
  }).connectors;

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors(),
  publicClient,
});

function App() {
  const { open, setDefaultChain } = useWeb3Modal();
  const { open: isOpen } = useWeb3ModalState();
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
    </>
  );
}

export default App;
