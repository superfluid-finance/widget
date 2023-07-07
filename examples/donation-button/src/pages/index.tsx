import styles from "@/styles/Main.module.css";
import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget, {
  PaymentDetails,
  ProductDetails,
} from "@superfluid-finance/widget";
import { useWeb3Modal } from "@web3modal/react";
import { Noto_Sans } from "next/font/google";
import Head from "next/head";
import { useMemo } from "react";

export const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const productDetails: ProductDetails = {
  name: "Donation Subscription",
  description:
    "This is a simple donation button demo with Superfluid Checkout.",
};

const paymentDetails: PaymentDetails = {
  paymentOptions: [
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22",
      chainId: 5,
      superToken: {
        address: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    },
  ],
};

const theme = {
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
};

export default function Main() {
  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen]
  );

  return (
    <>
      <Head>
        <title>Donation Demo | Superfluid</title>
        <meta
          name="description"
          content="Superfluid donation button demo application."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${notoSans.className}`}>
        <SuperfluidWidget
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          tokenList={superTokenList}
          theme={theme}
          type="drawer"
          walletManager={walletManager}
        >
          {({ openModal }) => (
            <button className={styles.btn} onClick={() => openModal()}>
              Donate
            </button>
          )}
        </SuperfluidWidget>
      </main>
    </>
  );
}
