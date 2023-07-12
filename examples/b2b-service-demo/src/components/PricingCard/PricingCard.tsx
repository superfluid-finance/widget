import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget, {
  PaymentDetails,
  PaymentOption,
  ProductDetails,
  WidgetProps,
} from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import { FC, useCallback, useMemo, useRef } from "react";
import Button from "../Button/Button";
import styles from "./PricingCard.module.css";

const productDetails: ProductDetails = {
  name: `Donation Subscription`,
  imageURI: "/product.png",
  successText: "Finish Demo",
  successURL: "#",
};

const defaultPaymentOption: PaymentOption = {
  receiverAddress: "0xE0537ea8F1d5A304635ce05D6F6b0D71fCfAB3a1",
  chainId: 80001,
  superToken: {
    address: "0x42bb40bf79730451b11f6de1cba222f17b87afd7",
  },
};

const theme: WidgetProps["theme"] = {
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 16,
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
  const closeModalRef = useRef<() => void>(() => {});

  const { open, isOpen } = useWeb3Modal();

  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen],
  );

  const paymentDetails: PaymentDetails = useMemo(() => {
    return {
      paymentOptions: [
        {
          ...defaultPaymentOption,
          flowRate: {
            amountEther: price.toString() as `${number}`,
            period: "month",
          },
        },
      ],
    };
  }, [price]);

  const onSuccessClickCallback = useCallback(() => {
    if (!closeModalRef.current) return;

    closeModalRef.current();
    onFinish && onFinish();
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
