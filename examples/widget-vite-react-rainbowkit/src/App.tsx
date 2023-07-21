import "./App.css";

import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget from "@superfluid-finance/widget";
import { WagmiConfig } from "wagmi";

import paymentDetails from "./paymentDetails";
import productDetails from "./productDetails";
import { chains, wagmiConfig } from "./wagmi";

export default function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ConnectButton.Custom>
            {({ openConnectModal, connectModalOpen }) => {
              const walletManager = {
                open: async () => openConnectModal(),
                isOpen: connectModalOpen,
              };
              return (
                <>
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
                </>
              );
            }}
          </ConnectButton.Custom>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
