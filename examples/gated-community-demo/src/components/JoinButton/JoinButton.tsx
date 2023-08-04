import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget, {
  PaymentDetails,
  ProductDetails,
  WidgetProps,
} from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import configuration from "@/configuration";
import { deleteFlow } from "@/utils/deleteDemoFlow";

import BookModal from "../BookModal/BookModal";
import styles from "./JoinButton.module.css";

const { Token } = configuration;

const productDetails: ProductDetails = {
  name: "GrumpyKitties",
  imageURI: "/product/grumpy-kitties.png",
  successText: "Finish Demo",
  successURL: "#",
};

const theme: WidgetProps["theme"] = {
  typography: {
    fontFamily: "'Quicksand', 'sans-serif'",
  },
  palette: {
    primary: {
      main: "#FFB525",
      contrastText: "#2E3A47",
    },
  },
};

function generateRandomReceiver() {
  return privateKeyToAccount(generatePrivateKey()).address;
}

const JoinButton: FC<PropsWithChildren> = ({ children }) => {
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
            chainId: 80001,
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
        tokenList={superTokenList}
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
            <button className={styles.Button} onClick={openModal}>
              {children}
            </button>
          );
        }}
      </SuperfluidWidget>

      <BookModal show={showCtaModal} onClose={closeCtaModal} />
    </>
  );
};

export default JoinButton;