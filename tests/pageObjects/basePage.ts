export let randomDetailsSet = {
  name: "",
  description: "",
};

export const rebounderAddresses = {
  goerli: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
};

export const paymentOptions: { [key: string]: PaymentOption } = {
  defaultPaymentOption: {
    network: "Goerli",
    chainId: "5",
    superToken: "fUSDCx",
    superTokenName: "Super fUSDC Fake Token",
    flowRate: "1",
    receiver: rebounderAddresses["goerli"],
    timeUnit: "month",
  },
  testOption: {
    network: "Goerli",
    superToken: "TDLx",
    superTokenName: "Super TDL Fake Token",
    chainId: "5",
    flowRate: "2",
    receiver: rebounderAddresses["goerli"],
    timeUnit: "month",
  },
  streamToSelfOption: {
    network: "Goerli",
    superToken: "TDLx",
    superTokenName: "Super TDL Fake Token",
    chainId: "5",
    flowRate: "2",
    receiver: process.env.WIDGET_WALLET_PUBLIC_KEY!,
    timeUnit: "month",
  },
};

export const demoOptions: PaymentOption[] = [
  {
    network: "Celo",
    superToken: "G$",
    superTokenName: "GoodDollar",
    chainId: "42220",
    flowRate: "1",
    receiver: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    timeUnit: "month",
  },
  {
    network: "Polygon Mumbai",
    superToken: "fDAIx",
    superTokenName: "Super fDAI Fake Token",
    chainId: "80001",
    flowRate: "1",
    receiver: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
    timeUnit: "month",
    userDefinedRate: true,
  },
  {
    network: "Polygon Mumbai",
    superToken: "fDAIx",
    superTokenName: "Super fDAI Fake Token",
    chainId: "80001",
    flowRate: "1",
    receiver: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
    timeUnit: "month",
  },
  {
    network: "Polygon Mumbai",
    superToken: "fUSDCx",
    superTokenName: "Super fUSDC Fake Token",
    chainId: "80001",
    flowRate: "1",
    receiver: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
    timeUnit: "month",
  },
  {
    network: "Goerli",
    superToken: "NTDL",
    superTokenName: "NTDL",
    chainId: "5",
    flowRate: "1",
    receiver: "0x7d3e32aE08F50387a83cf222E08D8ec26317D7AA",
    timeUnit: "month",
  },
  {
    network: "Goerli",
    superToken: "ZYA",
    superTokenName: "Zaya Token",
    chainId: "5",
    flowRate: "1",
    receiver: "0x7d3e32aE08F50387a83cf222E08D8ec26317D7AA",
    timeUnit: "month",
  },
  {
    network: "Goerli",
    superToken: "fDAIx",
    superTokenName: "Super fDAI Fake Token",
    chainId: "5",
    flowRate: "1",
    receiver: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
    timeUnit: "month",
  },
  {
    network: "Goerli",
    superToken: "fUSDCx",
    superTokenName: "Super fUSDC Fake Token",
    chainId: "5",
    flowRate: "1",
    receiver: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
    timeUnit: "month",
  },
];

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
