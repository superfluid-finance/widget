export const rebounderAddresses = {
  goerli: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
};

export const defaultPaymentOption = {
  network: "Goerli",
  chainId: "5",
  superToken: "fUSDCx",
  superTokenName: "Super fUSDC Fake Token",
  flowRate: "1",
  receiver: rebounderAddresses["goerli"],
  timeUnit: "month",
};
export const testOption = {
  network: "Goerli",
  superToken: "TDLx",
  superTokenName: "Super TDL Fake Token",
  chainId: "5",
  flowRate: "2",
  receiver: rebounderAddresses["goerli"],
  timeUnit: "month",
};

export const streamToSelfOption = {
  network: "Goerli",
  superToken: "TDLx",
  superTokenName: "Super TDL Fake Token",
  chainId: "5",
  flowRate: "2",
  receiver: process.env.WIDGET_WALLET_PUBLIC_KEY!,
  timeUnit: "month",
};

export class BasePage {
  static shortenHex(address: string, length = 4) {
    return `${address.substring(0, 2 + length)}...${address.substring(
      address.length - length,
      address.length,
    )}`;
  }

  static approximateIfDecimal(numStr: string): string {
    const hasDecimal = numStr.includes(".");
    if (hasDecimal) {
      const integerPart = numStr.split(".")[0];
      return `≈${integerPart}`;
    }
    return numStr;
  }
}
