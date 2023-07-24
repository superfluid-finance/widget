import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget, {
  PaymentDetails,
  ProductDetails,
  WidgetProps,
} from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import configuration from "@/configuration";
import { deleteFlow } from "@/utils/deleteDemoFlow";

import Button from "../Button/Button";
import styles from "./PricingCard.module.css";

const { Token } = configuration;

const productDetails: ProductDetails = {
  name: `Donation Subscription`,
  imageURI: "/product.png",
  successText: "Finish Demo",
  successURL: "#",
};

const theme: WidgetProps["theme"] = {
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 16,

    button: {
      textTransform: "none",
    },

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
      main: "#60b2ff",
      contrastText: "#000",
    },
    mode: "dark",
  },
};

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  ctaTitle: string;
  outlined?: boolean;
  features: string[];
  onClick?: () => void;
  onFinish?: () => void;
}

function generateRandomReceiver() {
  return privateKeyToAccount(generatePrivateKey()).address;
}

const PricingCard: FC<PricingCardProps> = ({
  title,
  description,
  price,
  ctaTitle,
  outlined = false,
  features,
  onClick,
  onFinish,
}) => {
  const [randomReceiver, setRandomReceiver] = useState<`0x${string}`>(
    generateRandomReceiver(),
  );

  const closeModalRef = useRef<() => void>(() => {});

  const { open, isOpen } = useWeb3Modal();

  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen],
  );

  const paymentDetails: PaymentDetails = useMemo(
    () => ({
      paymentOptions: [
        {
          receiverAddress: randomReceiver,
          chainId: 80001,
          superToken: {
            address: Token,
          },
          flowRate: {
            amountEther: price.toString() as `${number}`,
            period: "month",
          },
        },
      ],
    }),
    [price, randomReceiver],
  );

  const onSuccessClickCallback = useCallback(() => {
    if (!closeModalRef.current) return;

    closeModalRef.current();
    onFinish && onFinish();
    setRandomReceiver(generateRandomReceiver());
  }, [closeModalRef, onFinish]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Content}>
        <h4>{title}</h4>
        <p>{description}</p>
        <div className={styles.Price}>
          ${price}
          <span> per user</span>
        </div>

        {onClick ? (
          <Button outlined={outlined} onClick={onClick}>
            {ctaTitle}
          </Button>
        ) : (
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
                <Button outlined={outlined} onClick={openModal}>
                  {ctaTitle}
                </Button>
              );
            }}
          </SuperfluidWidget>
        )}

        <ul className={styles.Features}>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
