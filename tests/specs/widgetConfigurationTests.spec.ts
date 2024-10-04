import { Page } from "@playwright/test";
import {
  MetaMask,
  metaMaskFixtures,
  testWithSynpress,
} from "@synthetixio/synpress";

import { WidgetPage } from "../pageObjects/widgetPage.js";
import basicSetup from "../wallet-setup/basic.setup.js";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test.describe("Widget configuration test cases", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto("/builder");
  });

  test("Suggested token amount getting input for the user (3x)", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fUSDCx");
    await widgetPage.connectWallet(metamask);
    await widgetPage.validateThatWrapAmountInputIs("3");
  });
});
