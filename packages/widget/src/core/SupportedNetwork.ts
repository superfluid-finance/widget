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
} from "viem/chains";
import { z } from "zod";

export const supportedNetwork = {
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
} as const satisfies Record<string, Chain>;

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
  .transform((x) => x as Chain & (typeof supportedNetworks_)[number]);

export type SupportedNetwork = z.infer<typeof supportedNetworkSchema>;

export const supportedNetworks =
  supportedNetworks_ as unknown as SupportedNetwork[];
