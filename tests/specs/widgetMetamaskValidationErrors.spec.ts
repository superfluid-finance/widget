import metamask from "@synthetixio/synpress/commands/metamask.js";

import { paymentOptions } from "../pageObjects/basePage.js";
import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";
import { test } from "../walletSetup.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test.describe("Error state test cases", () => {
  test("Can't stream to self error during review", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.addPaymentOption(paymentOptions.streamToSelfOption);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("TDLx");
    await widgetPage.connectWallet();
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError("You can't stream to yourself.");
  });

  test("Not enough underlying token balance during review", async ({
    page,
  }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fUSDCx");
    await widgetPage.connectWallet();
    await widgetPage.setWrapAmount("999999");
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError(
      "You don’t have enough underlying token balance to wrap.",
    );
  });

  test("Not enough super token balance to cover buffer error", async ({
    page,
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    paymentOptions.testOption.flowRate = "99999999";
    await builderPage.addPaymentOption(paymentOptions.testOption);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fUSDCx");
    await widgetPage.connectWallet();
    await widgetPage.setWrapAmount("0");
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError(
      "You don’t have enough Super Token balance to cover buffer.",
    );
  });

  test("Need atleast 24 hours worth of stream error", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    paymentOptions.testOption.flowRate = "1";
    paymentOptions.testOption.timeUnit = "day";
    await builderPage.addPaymentOption(paymentOptions.testOption);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fTUSDx");
    await widgetPage.connectWallet();
    await widgetPage.setWrapAmount("0");
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError(
      "You need to have Super Token balance for at least 24 hours of streaming.",
    );
  });
  test("User rejecting the wallet connection", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.clickContinueButton();
    await widgetPage.clickWeb3ModalMetamaskButton();
    await metamask.rejectAccess();
    await widgetPage.validateWeb3ModalDeclinedConnectionError();
  });
});
