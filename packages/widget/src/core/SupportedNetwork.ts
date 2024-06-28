import {
  arbitrum,
  avalanche,
  avalancheFuji,
  base,
  bsc,
  celo,
  Chain,
  gnosis,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  scroll,
  scrollSepolia,
  sepolia,
} from "wagmi/chains";
import { z } from "zod";

type ChainKeys =
  | "arbitrum"
  | "avalanche"
  | "avalancheFuji"
  | "base"
  | "bsc"
  | "celo"
  | "gnosis"
  | "mainnet"
  | "optimism"
  | "optimismSepolia"
  | "polygon"
  | "scroll"
  | "scrollSepolia"
  | "sepolia";

export const chainIds = [
  mainnet.id,
  arbitrum.id,
  avalanche.id,
  avalancheFuji.id,
  base.id,
  bsc.id,
  celo.id,
  gnosis.id,
  optimism.id,
  optimismSepolia.id,
  polygon.id,
  scroll.id,
  scrollSepolia.id,
  sepolia.id,
] as const;
export type ChainId = (typeof chainIds)[number];

export interface SupportedNetwork extends Chain {
  id: ChainId;
}

export const supportedNetwork: Record<ChainKeys, SupportedNetwork> = {
  mainnet, // Keep mainnet first
  arbitrum,
  avalanche,
  avalancheFuji,
  base,
  bsc,
  celo,
  gnosis,
  optimism,
  optimismSepolia,
  polygon,
  scroll,
  scrollSepolia,
  sepolia,
} as const satisfies Record<ChainKeys, SupportedNetwork>;

const supportedNetworks_ = Object.values(supportedNetwork).sort((a, b) => {
  const testnetA = !!(a as { testnet?: boolean }).testnet;
  const testnetB = !!(b as { testnet?: boolean }).testnet;

  if (testnetA !== testnetB) {
    return testnetA ? 1 : -1; // Put non-testnets first
  }

  return 0;
});

export const chainIdSchema = z.custom<ChainId>((value) => {
  return chainIds.some((x) => x === (Number(value) as ChainId));
});

export const supportedNetworkSchema = z
  .object({
    id: chainIdSchema,
  })
  .transform((x) => x as SupportedNetwork);

export const supportedNetworks =
  supportedNetworks_ as unknown as SupportedNetwork[];
