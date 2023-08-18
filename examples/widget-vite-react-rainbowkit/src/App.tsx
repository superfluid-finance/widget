import "./App.css";

import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget, {
  EventListeners,
  PaymentOption,
} from "@superfluid-finance/widget";
import { useCallback, useMemo, useState } from "react";
import { WagmiConfig } from "wagmi";

import paymentDetails from "./paymentDetails";
import productDetails from "./productDetails";
import { chains, wagmiConfig } from "./wagmi";

export default function App() {
  const [initialChainId, setInitialChainId] = useState<number | undefined>();
  const onPaymentOptionUpdate = useCallback<
    Required<EventListeners>["onPaymentOptionUpdate"]
  >(
    (paymentOption?: PaymentOption) =>
      setInitialChainId(paymentOption?.chainId),
    [setInitialChainId],
  );
  const eventListeners = useMemo<EventListeners>(
    () => ({ onPaymentOptionUpdate }),
    [onPaymentOptionUpdate],
  );

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} initialChain={initialChainId}>
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
                    eventListeners={eventListeners}
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
                    eventListeners={eventListeners}
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
                    eventListeners={eventListeners}
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
