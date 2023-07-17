import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget, {
  PaymentDetails,
  ProductDetails,
  WidgetProps,
} from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import { useCallback, useMemo, useRef, useState } from "react";
import BookModal from "../BookModal/BookModal";
import styles from "./SubscribeButton.module.css";
import { deleteFlow } from "@/utils/deleteDemoFlow";
import configuration from "@/configuration";

const { Receiver, Token } = configuration;

const productDetails: ProductDetails = {
  name: "Support BlockchainBites",
  imageURI: "/product.png",
  successText: "Finish Demo",
  successURL: "#",
};

const paymentDetails: PaymentDetails = {
  paymentOptions: [
    {
      receiverAddress: Receiver,
      chainId: 80001,
      superToken: {
        address: Token,
      },
    },
  ],
};

const theme: WidgetProps["theme"] = {
  typography: {
    fontFamily: "'Noto Sans', 'sans-serif'",
  },
  palette: {
    primary: {
      main: "#EB5428",
      contrastText: "#fff",
    },
  },
};

const SubscribeButton = () => {
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
  }, [closeModalRef]);
  return (
    <>
      <SuperfluidWidget
        productDetails={productDetails}
        paymentDetails={paymentDetails}
        tokenList={superTokenList}
        theme={theme}
        type="drawer"
        walletManager={walletManager}
        eventListeners={{
          onSuccessButtonClick: onSuccessClickCallback,
          onSuccess: () => deleteFlow(),
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
