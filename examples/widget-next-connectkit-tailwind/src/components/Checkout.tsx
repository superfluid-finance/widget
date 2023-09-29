"use client";

import CheckoutWidget, {
  EventListeners,
  WalletManager,
  WidgetProps,
} from "@superfluid-finance/widget";
import { useModal } from "connectkit";
import { FC, useMemo } from "react";

const Checkout: FC<{
  setInitialChainId: (chainId: number | undefined) => void;
}> = ({ setInitialChainId }) => {
  const { open, setOpen } = useModal();

  const walletManager = useMemo<WalletManager>(
    () => ({
      isOpen: open,
      open: () => setOpen(true),
    }),
    [open, setOpen],
  );

  const eventListeners = useMemo<EventListeners>(
    () => ({
      onPaymentOptionUpdate: (paymentOption) =>
        setInitialChainId(paymentOption?.chainId),
    }),
    [setInitialChainId],
  );

  return (
    <CheckoutWidget
      type="page"
      walletManager={walletManager}
      eventListeners={eventListeners}
      paymentDetails={paymentDetails}
    />
  );
};

const paymentDetails: WidgetProps["paymentDetails"] = {
  paymentOptions: [
    {
      chainId: 5,
      receiverAddress: "0x7BDa037dFdf9CD9Ad261D27f489924aebbcE71Ac",
      superToken: { address: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa" },
    },
    {
      chainId: 5,
      receiverAddress: "0x7BDa037dFdf9CD9Ad261D27f489924aebbcE71Ac",
      superToken: { address: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa" },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    },
  ],
};

export default Checkout;
