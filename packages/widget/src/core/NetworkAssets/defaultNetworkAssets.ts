import { supportedNetwork } from "../SupportedNetwork";
import { NetworkAssets } from "./types";

export const defaultNetworkAssets: NetworkAssets = {
  [supportedNetwork.arbitrum.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/arbitrum.svg`,
    color: "#2b374b",
  },
  [supportedNetwork.arbitrumGoerli.id]: {
    color: "#2b374b",
  },
  [supportedNetwork.avalanche.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/avalanche.svg`,
    color: "#e84142",
  },
  [supportedNetwork.avalancheFuji.id]: {
    color: "#2b374b",
  },
  [supportedNetwork.base.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/base.svg`,
    color: "#68B1D5",
  },
  [supportedNetwork.baseGoerli.id]: {
    color: "#68B1D5",
  },
  [supportedNetwork.bsc.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/bnb.svg`,
    color: "#F0B90B",
  },
  [supportedNetwork.celo.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/celo-mainnet.svg`,
    color: "#FCFF52",
  },
  [supportedNetwork.gnosis.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/gnosis.svg`,
    color: "#04795b",
  },
  [supportedNetwork.goerli.id]: {
    color: "#9064ff",
  },
  [supportedNetwork.mainnet.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/ethereum.svg`,
    color: "#627EEA",
  },
  [supportedNetwork.optimism.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/optimism.svg`,
    color: "#ff0320",
  },
  [supportedNetwork.optimismGoerli.id]: {
    color: "#ff0320",
  },
  [supportedNetwork.polygon.id]: {
    logoURI: `https://app.superfluid.finance/icons/network/polygon.svg`,
    color: "#7c3fe4",
  },
  [supportedNetwork.polygonMumbai.id]: {
    color: "#3099f2",
  },
};
