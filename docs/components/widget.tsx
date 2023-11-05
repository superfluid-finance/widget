import { WagmiConfig, createConfig } from "wagmi";
import { useMemo } from "react";
import { polygonMumbai } from "wagmi/chains";
import SuperfluidWidget from "@superfluid-finance/widget";
import { WalletManager } from "@superfluid-finance/widget";
import { extendedSuperTokenList } from "@superfluid-finance/widget/tokenlist";
import { createPublicClient, http } from "viem";
import { useWeb3Modal } from "@web3modal/react";
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

export function Widget() {
  /*const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: polygonMumbai,
      transport: http(),
    }),
  });*/

  const data = {
    productDetails: {
      name: "Rustic Fresh Hat",
      description:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      imageURI: "https://picsum.photos/200/200",
    },
    paymentDetails: {
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
    },
    type: "page",
  };
  const widgetBuilderTokenList = extendedSuperTokenList;
  const { open, isOpen, setDefaultChain } = useWeb3Modal();
  return (
    <WagmiConfig config={wagmiConfig}>
      <SuperfluidWidget
        {...data}
        tokenList={widgetBuilderTokenList}
        type="dialog"
      >
        {({ openModal }) => (
          <button className={styles.Button} onClick={() => openModal()}>Open Superfluid Widget</button>
        )}
      </SuperfluidWidget>
    </WagmiConfig>
  );
}
