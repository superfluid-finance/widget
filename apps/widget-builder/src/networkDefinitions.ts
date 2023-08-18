export type NetworkLogoInfo = {
  logoUrl?: string;
  color?: string;
};

export const networkLogoInfos: Record<number, NetworkLogoInfo | undefined> = {
  5: {
    color: "#9064ff",
  },
  80001: {
    color: "#3099f2",
  },
  420: {
    color: "#ff0320",
  },
  421613: {
    color: "#2b374b",
  },
  43113: {
    color: "#2b374b",
  },
  100: {
    logoUrl: "/assets/network-icons/gnosis.svg",
    color: "#04795b",
  },
  137: {
    logoUrl: "/assets/network-icons/polygon.svg",
    color: "#7c3fe4",
  },
  10: {
    logoUrl: "/assets/network-icons/optimism.svg",
    color: "#ff0320",
  },
  42161: {
    logoUrl: "/assets/network-icons/arbitrum.svg",
    color: "#2b374b",
  },
  43114: {
    logoUrl: "/assets/network-icons/avalanche.svg",
    color: "#e84142",
  },
  56: {
    logoUrl: "/assets/network-icons/bnb.svg",
    color: "#F0B90B",
  },
  1: {
    logoUrl: "/assets/network-icons/ethereum.svg",
    color: "#627EEA",
  },
  42220: {
    logoUrl: "/assets/network-icons/celo.svg",
    color: "#FCFF52",
  },
  8453: {
    logoUrl: "/assets/network-icons/base.svg",
    color: "#0052ff",
  },
  84531: {
    color: "#0052ff",
  },
};
