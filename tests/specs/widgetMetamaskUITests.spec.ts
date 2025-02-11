import { Page } from "@playwright/test";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";

import { rebounderAddresses } from "../pageObjects/basePage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";
import basicSetup from "../wallet-setup/basic.setup.js";

const test = testWithSynpress(metaMaskFixtures(basicSetup));
test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto("/builder");
});

test.describe("Widget UI specific tests", () => {
  test("Clicking on the stepper buttons to move around the widget steps and using X button to return from the transaction screen (Vertical)", async ({
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
    await widgetPage.setWrapAmount("1");
    await widgetPage.clickContinueButton();
    await widgetPage.validateAndSaveSenderAndReceiverAddresses(
      process.env.WIDGET_WALLET_PUBLIC_KEY!,
      rebounderAddresses["optimism-sepolia"],
    );
    await widgetPage.waitForTransactionsToGetValidated();
    await widgetPage.clickContinueButton();
    await widgetPage.clickTransactionScreenXButton();
    await widgetPage.validateAndSaveSenderAndReceiverAddresses(
      process.env.WIDGET_WALLET_PUBLIC_KEY!,
      rebounderAddresses["optimism-sepolia"],
    );
    await widgetPage.clickOnStepNumber("2");
    await widgetPage.validateThatWrapAmountInputIs("1");
    await widgetPage.clickOnStepNumber("1");
    await widgetPage.verifySelectPaymentOptionStepIsVisible();
  });

  test("Token icons shown in the widget for the selected token", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    let testTokenSymbol = "fUSDCx";
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken(testTokenSymbol);
    await widgetPage.validateTokenIconInPaymentOptionStep(testTokenSymbol);
    await widgetPage.connectWallet(metamask);
    await widgetPage.validateTokenIconsInWrapStep(testTokenSymbol);
    await widgetPage.setWrapAmount("1");
    await widgetPage.clickContinueButton();
    await widgetPage.validateTokenIconsInReviewStep(testTokenSymbol);
  });

  test("Why do I need tokens button", async ({
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
    await widgetPage.clickWhyDoINeedToWrapTokensAndValidatePageOpen();
  });
});
