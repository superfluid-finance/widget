declare module "@synthetixio/synpress/commands/metamask" {
  export const initialSetup: (
    browser: BrowserType,
    metamaskParameters: {}
  ) => void;
  export const acceptAccess: (options?: {}) => void;
  export const confirmTransaction: (gasConfig: string | {}) => void;
  export const confirmPermissionToSpend: (allowance: string) => void;
}
declare module "@synthetixio/synpress/helpers" {
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
  // useAsDefault: boolean;
};
