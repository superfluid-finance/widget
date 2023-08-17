import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  base,
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

export const supportedNetwork = {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  base,
  bsc,
  celo,
  gnosis,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
} as const satisfies Record<string, Chain>;

export const chainIds = [
  arbitrum.id,
  arbitrumGoerli.id,
  avalanche.id,
  avalancheFuji.id,
  base.id,
  bsc.id,
  celo.id,
  gnosis.id,
  goerli.id,
  mainnet.id,
  optimism.id,
  optimismGoerli.id,
  polygon.id,
  polygonMumbai.id,
] as const;
export type ChainId = (typeof chainIds)[number];

const supportedNetworks_ = [
  supportedNetwork.arbitrum,
  supportedNetwork.avalanche,
  supportedNetwork.avalancheFuji,
  supportedNetwork.base,
  supportedNetwork.bsc,
  supportedNetwork.celo,
  supportedNetwork.goerli,
  supportedNetwork.gnosis,
  supportedNetwork.mainnet,
  supportedNetwork.optimism,
  supportedNetwork.polygon,
  supportedNetwork.polygonMumbai,
] as const;

export const chainIdSchema = z.custom<ChainId>((value) => {
  return chainIds.some((x) => x === (Number(value) as ChainId));
});

export const supportedNetworkSchema = z
  .object({
    id: chainIdSchema,
  })
  .transform((x) => x as (typeof supportedNetworks_)[number]);

export type SupportedNetwork = z.infer<typeof supportedNetworkSchema> & Chain;

export const supportedNetworks =
  supportedNetworks_ as unknown as SupportedNetwork[];
