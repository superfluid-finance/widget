import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { PropsWithChildren } from "react";
import { supportedNetworks } from "superfluid-checkout-core";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

const projectId = "952483bf7a0f5ace4c40eb53967f1368";

const { publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId }),
]);
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, version: 1, chains: supportedNetworks }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);

export function WalletAndWagmiProvider({ children }: PropsWithChildren) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      {/* TODO(KK): weird version mismatch for ethereumClient */}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient as any} />
    </>
  );
}
