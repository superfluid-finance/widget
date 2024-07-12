import { Page } from "@playwright/test";
import {
  MetaMask,
  metaMaskFixtures,
  testWithSynpress,
} from "@synthetixio/synpress";

import { paymentOptions } from "../pageObjects/basePage.ts";
import { BuilderPage } from "../pageObjects/builderPage.ts";
import { WidgetPage } from "../pageObjects/widgetPage.ts";
import basicSetup from "../wallet-setup/basic.setup.ts";

const test = testWithSynpress(metaMaskFixtures(basicSetup));

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto("/builder");
});

test.describe("Error state test cases", () => {
  test("Can't stream to self error during review", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.addPaymentOption(paymentOptions.streamToSelfOption);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fDAIx");
    await widgetPage.connectWallet(metamask);
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError("You can't stream to yourself.");
  });

  test("Not enough underlying token balance during review", async ({
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
    await widgetPage.setWrapAmount("999999");
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError(
      "You don’t have enough underlying token balance to wrap.",
    );
  });

  test("Not enough super token balance to cover buffer error", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    paymentOptions.testOption.flowRate = "99999999";
    await builderPage.addPaymentOption(paymentOptions.testOption);
    await widgetPage.selectPaymentNetwork(paymentOptions.testOption.network);
    await widgetPage.selectPaymentToken(paymentOptions.testOption.superToken);
    await widgetPage.connectWallet(metamask);
    await widgetPage.setWrapAmount("0");
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError(
      "You don’t have enough Super Token balance to cover buffer.",
    );
  });

  test("Need atleast 24 hours worth of stream error", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    paymentOptions.testOption.flowRate = "2999";
    paymentOptions.testOption.timeUnit = "day";
    paymentOptions.testOption.superToken = "fUSDCx";
    await builderPage.addPaymentOption(paymentOptions.testOption);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fUSDCx");
    await widgetPage.connectWallet(metamask);
    await widgetPage.setWrapAmount("0");
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepError(
      "You need to have Super Token balance for at least 24 hours of streaming.",
    );
  });

  test("User rejecting the wallet connection", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.clickContinueButton();
    await widgetPage.clickWeb3ModalMetamaskButton();
    await metamask.rejectSignature();
    await widgetPage.validateWeb3ModalDeclinedConnectionError();
  });
});
