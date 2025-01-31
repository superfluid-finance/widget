import { Page } from "@playwright/test";
import {
  MetaMask,
  metaMaskFixtures,
  testWithSynpress,
} from "@synthetixio/synpress";

import { paymentOptions, rebounderAddresses } from "../pageObjects/basePage.js";
import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";
import basicSetup from "../wallet-setup/basic.setup.js";

const test = testWithSynpress(metaMaskFixtures(basicSetup));
test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto("/builder");
});

test.describe("Transactional test cases", () => {
  test.skip("Creating a flow", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("ETHx");
    await widgetPage.connectWallet(metamask);
    await widgetPage.clickContinueButton();
    await widgetPage.validateAndSaveSenderAndReceiverAddresses(
      process.env.WIDGET_WALLET_PUBLIC_KEY!,
      rebounderAddresses["optimism-sepolia"],
    );
    await widgetPage.waitForTransactionsToGetValidated();
    await widgetPage.clickContinueButton();
    await widgetPage.validateTransactionStatuses(["send"], ["Ready to send"]);
    await widgetPage.validateTransactionButtonTextAndClick();
    await widgetPage.validateTransactionButtonLoading();
    await widgetPage.acceptMetamaskTransaction(metamask);
    await widgetPage.validateTransactionStatuses(
      ["send"],
      ["Transaction sent"],
    );
    await widgetPage.validateSuccessMessage("1");
  });

  test("Modifying a flow", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.addPaymentOption(paymentOptions.testOption);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fDAIx");
    await widgetPage.connectWallet(metamask);
    await widgetPage.setWrapAmount("0");
    await widgetPage.clickContinueButton();
    await widgetPage.validateAndSaveSenderAndReceiverAddresses(
      process.env.WIDGET_WALLET_PUBLIC_KEY!,
      rebounderAddresses["optimism-sepolia"],
    );
    await widgetPage.waitForTransactionsToGetValidated();
    await widgetPage.clickContinueButton();
    await widgetPage.validateTransactionStatuses(["modify"], ["Ready to send"]);
    await widgetPage.validateTransactionButtonTextAndClick();
    await widgetPage.validateTransactionButtonLoading();
    await widgetPage.acceptMetamaskTransaction(metamask);
    await widgetPage.validateTransactionStatuses(
      ["modify"],
      ["Transaction sent"],
    );
    await widgetPage.validateSuccessMessage("1");
  });
});
