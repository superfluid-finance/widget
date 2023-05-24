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
  Chain,
} from "@wagmi/chains";

export const chainIds = [
  5, 80001, 420, 421613, 43113, 100, 137, 10, 42161, 43114, 56, 1, 42220,
] as const;
export type ChainId = (typeof chainIds)[number];

export const chainIdSchema = z.custom<ChainId>((value) => {
  return chainIds.some((x) => x === (Number(value) as ChainId));
});

export const supportedNetwork = {
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
} as const satisfies Record<string, Chain>;

const supportedNetworks_ = [
  supportedNetwork.polygon,
  supportedNetwork.bsc,
  supportedNetwork.goerli,
  supportedNetwork.polygonMumbai,
  supportedNetwork.avalancheFuji,
  supportedNetwork.avalanche,
  supportedNetwork.optimism,
  supportedNetwork.arbitrum,
  supportedNetwork.mainnet,
  supportedNetwork.gnosis,
] as const;

export const supportedNetworkSchema = z
  .object({
    id: chainIdSchema,
  })
  .transform((x) => x as (typeof supportedNetworks_)[number]);

export type SupportedNetwork = z.infer<typeof supportedNetworkSchema> & Chain;

export const supportedNetworks = supportedNetworks_ as unknown as SupportedNetwork[];

