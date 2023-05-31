import "./App.css";
import SuperfluidWidget, {
  supportedNetworks,
} from "@superfluid-finance/widget";
import productDetails from "./productDetails";
import paymentDetails from "./paymentDetails";
import { WagmiConfig, configureChains, createConfig } from "wagmi";

import superTokenList from "@superfluid-finance/tokenlist";
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const walletConnectProjectId = "952483bf7a0f5ace4c40eb53967f1368";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedNetworks,
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My wagmi + RainbowKit App",
  chains,
  projectId: walletConnectProjectId,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

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
