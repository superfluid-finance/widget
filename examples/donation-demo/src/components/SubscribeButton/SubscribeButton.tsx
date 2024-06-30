import SuperfluidWidget, {
  PaymentDetails,
  ProductDetails,
  WidgetProps,
} from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import configuration from "@/configuration";
import { deleteFlow } from "@/utils/deleteDemoFlow";

import BookModal from "../BookModal/BookModal";
import styles from "./SubscribeButton.module.css";

const { Token } = configuration;

const productDetails: ProductDetails = {
  name: "Support BlockchainBites",
  imageURI: "/product.png",
  successText: "Finish Demo",
  successURL: "#",
};

const theme: WidgetProps["theme"] = {
  typography: {
    fontFamily: "'Noto Sans', 'sans-serif'",

    h1: {
      fontSize: "3.36875rem",
      fontWeight: 500,
      lineHeight: 1,
    },

    h2: {
      fontSize: "2.296875rem",
      fontWeight: 500,
      lineHeight: 1,
    },

    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },

    h4: {
      fontSize: "1.53125rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },

    h5: {
      fontSize: "1.3125rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },

    subtitle1: {
      fontSize: "1.09375rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },

    subtitle2: {
      fontSize: "0.984375rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    body1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },

    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    caption: {
      fontSize: "0.875rem",
      lineHeight: 1.25,
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: "#EB5428",
      contrastText: "#fff",
    },
  },
};

function generateRandomReceiver() {
  return privateKeyToAccount(generatePrivateKey()).address;
}

const SubscribeButton = () => {
  const [randomReceiver, setRandomReceiver] = useState<`0x${string}`>(
    generateRandomReceiver(),
  );

  const [showCtaModal, setShowCtaModal] = useState(false);

  const closeModalRef = useRef<() => void>(() => {});

  const { open, isOpen } = useWeb3Modal();

  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen],
  );

  const openCtaModal = () => setShowCtaModal(true);
  const closeCtaModal = () => setShowCtaModal(false);

  const onSuccessClickCallback = useCallback(() => {
    if (!closeModalRef.current) return;

    openCtaModal();
    closeModalRef.current();
    setRandomReceiver(generateRandomReceiver());
  }, [closeModalRef]);

  const paymentDetails = useMemo(
    () =>
      ({
        paymentOptions: [
          {
            receiverAddress: randomReceiver,
            chainId: 11155420,
            superToken: {
              address: Token,
            },
          },
        ],
      }) as PaymentDetails,
    [randomReceiver],
  );

  return (
    <>
      <SuperfluidWidget
        productDetails={productDetails}
        paymentDetails={paymentDetails}
        theme={theme}
        type="drawer"
        walletManager={walletManager}
        eventListeners={{
          onSuccessButtonClick: onSuccessClickCallback,
          onSuccess: () => deleteFlow(randomReceiver),
        }}
      >
        {({ openModal, closeModal }) => {
          closeModalRef.current = closeModal;
          return (
            <button className={styles.SubscribeButton} onClick={openModal}>
              <span>Donate with</span>
              <img src="/sf-logo.svg" alt="Superfluid Logo" />
            </button>
          );
        }}
      </SuperfluidWidget>

      <BookModal show={showCtaModal} onClose={closeCtaModal} />
    </>
  );
};

export default SubscribeButton;
