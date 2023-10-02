declare module "@synthetixio/synpress/commands/metamask.js" {
  export const initialSetup: (
    browser: BrowserType,
    metamaskParameters: {},
  ) => void;
  export const acceptAccess: (options?: {}) => void;
  export const confirmTransaction: (gasConfig: string | {}) => void;
  export const confirmPermissionToSpend: (allowance: string) => void;
  export const changeNetwork: (network: string) => void;
  export const allowToSwitchNetwork: () => void;
}

declare module "@synthetixio/synpress/helpers.js" {
  export const prepareMetamask: (version: string) => void;
}

type PaymentOption = {
  network: string;
  superToken: string;
  superTokenName: string;
  flowRate: string;
  receiver: string;
  timeUnit: string;
  chainId: string;
  upfrontPayment?: string;
  userDefinedRate?: boolean;
  snapshotPath?: string;
};

type PartialPaymentOption = {
  network?: string;
  superToken?: string;
  superTokenName?: string;
  flowRate?: string;
  receiver?: string;
  timeUnit?: string;
  chainId?: string;
  upfrontPayment?: string;
  userDefinedRate?: boolean;
  snapshotPath?: string;
};

type NFTDetails = {
  symbol?: string;
  name?: string;
  owner?: string;
  image?: string;
  networks?: string[] | string;
};
