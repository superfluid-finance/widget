import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  bsc,
  celo,
  Chain,
  gnosis,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import { z } from "zod";

type ChainKeys =
  | "mainnet"
  | "arbitrum"
  | "arbitrumGoerli"
  | "avalanche"
  | "avalancheFuji"
  | "base"
  | "baseGoerli"
  | "bsc"
  | "celo"
  | "gnosis"
  | "goerli"
  | "optimism"
  | "optimismGoerli"
  | "polygon"
  | "polygonMumbai";

export const chainIds = [
  mainnet.id,
  arbitrum.id,
  arbitrumGoerli.id,
  avalanche.id,
  avalancheFuji.id,
  base.id,
  baseGoerli.id,
  bsc.id,
  celo.id,
  gnosis.id,
  goerli.id,
  optimism.id,
  optimismGoerli.id,
  polygon.id,
  polygonMumbai.id,
] as const;
export type ChainId = (typeof chainIds)[number];

export interface SupportedNetwork extends Chain {
  id: ChainId;
}

export const supportedNetwork: Record<ChainKeys, SupportedNetwork> = {
  mainnet, // Keep mainnet first.
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  bsc,
  celo,
  gnosis,
  goerli,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
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
