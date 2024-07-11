import { expect, Locator, Page } from "@playwright/test";

export let randomDetailsSet = {
  name: "",
  description: "",
};

export let randomReceiver = {
  address: "",
};

export const supportedNetworks: string[] = [
  "Arbitrum One",
  "Avalanche",
  "Base",
  "BNB Smart Chain",
  "Celo",
  "Gnosis",
  "OP Mainnet",
  "Polygon",
  "Avalanche Fuji",
  "Optimism Sepolia",
  "Scroll Sepolia",
  "Sepolia",
];

export const rebounderAddresses = {
  "optimism-sepolia": "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
};

export const paymentOptions: { [key: string]: PaymentOption } = {
  defaultPaymentOption: {
    network: "Optimism Sepolia",
    chainId: "11155420",
    superToken: "fUSDCx",
    superTokenName: "Super fUSDC Fake Token",
    flowRate: "1",
    receiver: rebounderAddresses["optimism-sepolia"],
    timeUnit: "month",
  },
  testOption: {
    network: "Optimism Sepolia",
    superToken: "fDAIx",
    superTokenName: "Super fDAI Fake Token",
    chainId: "11155420",
    flowRate: "2",
    receiver: rebounderAddresses["optimism-sepolia"],
    timeUnit: "month",
  },
  streamToSelfOption: {
    network: "Optimism Sepolia",
    superToken: "fDAIx",
    superTokenName: "Super fDAI Fake Token",
    chainId: "11155420",
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
    network: "Optimism Sepolia",
    superToken: "fDAIx",
    superTokenName: "Super fDAI Fake Token",
    chainId: "11155420",
    flowRate: "1",
    receiver: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
    timeUnit: "month",
    upfrontPayment: "1",
  },
  {
    network: "Optimism Sepolia",
    superToken: "fUSDCx",
    superTokenName: "Super fUSDC Fake Token",
    chainId: "11155420",
    flowRate: "1",
    receiver: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
    timeUnit: "month",
  },
  {
    network: "Optimism Sepolia",
    superToken: "fTUSDx",
    superTokenName: "Super fTUSD Fake Token",
    chainId: "11155420",
    flowRate: "1",
    receiver: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
    timeUnit: "month",
    userDefinedRate: true,
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

  //Inspired by https://github.com/microsoft/playwright/issues/20032#issuecomment-1379006314
  static async slideSlider(
    page: Page,
    thumb: Locator,
    slider: Locator,
    targetPercentage: number,
  ) {
    const thumbBoundingBox = await thumb.boundingBox();
    const sliderBoundingBox = await slider.boundingBox();

    if (thumbBoundingBox === null || sliderBoundingBox === null) {
      throw new Error(
        "Could not get the bounding boxes of one of the elements",
      );
    }

    // Start from the middle of the slider's thumb
    const startPoint = {
      x: thumbBoundingBox.x + thumbBoundingBox.width / 2,
      y: thumbBoundingBox.y + thumbBoundingBox.height / 2,
    };

    // Slide it to some endpoint determined by the target percentage
    const endPoint = {
      x: sliderBoundingBox.x + sliderBoundingBox.width * targetPercentage,
      y: thumbBoundingBox.y + thumbBoundingBox.height / 2,
    };

    await page.mouse.move(startPoint.x, startPoint.y);
    await page.mouse.down();
    await page.mouse.move(endPoint.x, endPoint.y);
    await page.mouse.up();
  }

  static async clickLinkAndVaguelyVerifyOpenedLink(
    page: Page,
    buttonToClick: Locator,
    buttonHref: string,
    expectedFinalUrl: string,
    expectedVisibleElementText: string,
  ) {
    const newTabPromise = page.waitForEvent("popup", { timeout: 5000 });
    await expect(buttonToClick).toHaveAttribute("href", buttonHref);
    await buttonToClick.click();
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(expectedFinalUrl);
    await expect(newTab.getByText(expectedVisibleElementText)).toBeVisible();
  }
}
