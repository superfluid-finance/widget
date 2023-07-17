import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget, {
  PaymentDetails,
  ProductDetails,
  WidgetProps,
} from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import { useCallback, useMemo, useRef, useState } from "react";
import BookModal from "../BookModal/BookModal";
import styles from "./SubBox.module.css";

const productDetails: ProductDetails = {
  name: "Support BlockchainBites",
  imageURI: "/product.png",
  successText: "Finish Demo",
  successURL: "#",
};

const paymentDetails: PaymentDetails = {
  paymentOptions: [
    {
      receiverAddress: "0xE0537ea8F1d5A304635ce05D6F6b0D71fCfAB3a1",
      chainId: 80001,
      superToken: {
        address: "0x42bb40bf79730451b11f6de1cba222f17b87afd7",
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

const SubBox = () => {
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
      <div className={styles.Wrapper}>
        <div className={styles.Caption}>Total contributions</div>
        <h2>$698.98/mo</h2>
        <hr />
        <span className={styles.Caption}>
          Supporters: <b>199</b>
        </span>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={superTokenList}
          theme={theme}
          type="drawer"
          walletManager={walletManager}
          eventListeners={{
            onSuccessButtonClick: onSuccessClickCallback,
          }}
        >
          {({ openModal, closeModal }) => {
            closeModalRef.current = closeModal;
            return (
              <button onClick={openModal}>
                <span>Donate with</span>
                <img src="/sf-logo.svg" alt="Superfluid Logo" />
              </button>
            );
          }}
        </SuperfluidWidget>
      </div>

      <BookModal show={showCtaModal} onClose={closeCtaModal} />
    </>
  );
};

export default SubBox;
