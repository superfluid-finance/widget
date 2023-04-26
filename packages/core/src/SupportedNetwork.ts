import { z } from "zod";
import {
  polygon,
  bsc,
  goerli,
  polygonMumbai,
  avalancheFuji,
  avalanche,
  optimism,
  arbitrum,
  mainnet,
  gnosis,
} from "@wagmi/chains";

export const chainIds = [
  5, 80001, 420, 421613, 43113, 100, 137, 10, 42161, 43114, 56, 1, 42220,
] as const;
export type ChainId = typeof chainIds[number];

export const chainIdSchema = z.custom<ChainId>((value) => {
  return chainIds.some((x) => x === (Number(value) as ChainId));
});

export const supportedNetworks = [
  polygon,
  bsc,
  goerli,
  polygonMumbai,
  avalancheFuji,
  avalanche,
  optimism,
  arbitrum,
  mainnet,
  gnosis,
] as const;

export const supportedNetworkSchema = z.object({
  id: chainIdSchema,
}).transform(x => x as typeof supportedNetworks[number]);

export type SupportedNetwork = z.infer<typeof supportedNetworkSchema>;