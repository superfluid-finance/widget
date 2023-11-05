import { WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import SuperfluidWidget from "@superfluid-finance/widget";
import { extendedSuperTokenList } from "@superfluid-finance/widget/tokenlist";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import styles from "./widget.module.css";

const projectId = 'e55d3cff2ce4a0f8068d58b4c6648246'

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [polygonMumbai]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
const widgetBuilderTokenList = extendedSuperTokenList;
const data = {
  productDetails: {
    name: "Checkout Widget Preview",
    description:
      "This is a preview of the Superfluid Checkout Widget. This preview is for demonstration purposes only. It may not represent the final result you will get.",
    imageURI: "https://i.ibb.co/cLNhX7M/superfluid-logo.jpg",
  },
  paymentDetails: {
    paymentOptions: [
      {
        receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22",
        chainId: 80001,
        superToken: {
          address: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
        },
        flowRate: {
          amountEther: "1",
          period: "month",
        },
      },
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
      }
    ],
  },
  type: "drawer",
};

createWeb3Modal({ wagmiConfig, projectId, chains })

export function Widget() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SuperfluidWidget
        {...data}
        tokenList={widgetBuilderTokenList}
        type="dialog"
      >
        {({ openModal }) => (
          <button className={styles.Button} onClick={() => openModal()}>Preview Checkout Widget</button>
        )}
      </SuperfluidWidget>
    </WagmiConfig>
  );
}
