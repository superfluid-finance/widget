import * as metamask from "@synthetixio/synpress/commands/metamask";

import { paymentOptions, rebounderAddresses } from "../pageObjects/basePage";
import { BuilderPage } from "../pageObjects/builderPage";
import { WidgetPage } from "../pageObjects/widgetPage";
import { test } from "../walletSetup";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test("Creating a flow", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.openPaymentTab();
  await builderPage.clickOnWandButton();
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fDAIx");
  await widgetPage.connectWallet();
  await widgetPage.skipWrapStep();
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    process.env.WIDGET_WALLET_PUBLIC_KEY!,
    rebounderAddresses["goerli"],
  );
  await widgetPage.clickContinueButton();
  await widgetPage.validateTransactionStatuses(["send"], ["Ready to send"]);
  await widgetPage.validateTransactionButtonTextAndClick();
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  await widgetPage.validateTransactionStatuses(["send"], ["Transaction sent"]);
  await widgetPage.validateSuccessMessage("1");
});

test("Modifying a flow", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fUSDCx");
  await widgetPage.connectWallet();
  await widgetPage.setWrapAmount("0");
  await widgetPage.clickContinueButton();
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    process.env.WIDGET_WALLET_PUBLIC_KEY!,
    rebounderAddresses["goerli"],
  );
  await widgetPage.clickContinueButton();
  await widgetPage.validateTransactionStatuses(["modify"], ["Ready to send"]);
  await widgetPage.validateTransactionButtonTextAndClick();
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  await widgetPage.validateTransactionStatuses(
    ["modify"],
    ["Transaction sent"],
  );
  await widgetPage.validateSuccessMessage("1");
});

test("Approving and wrapping tokens", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fUSDCx");
  await widgetPage.connectWallet();
  await widgetPage.validateAndSaveWrapPageBalances("Goerli", "fUSDCx");
  await widgetPage.setWrapAmount("1");
  await widgetPage.clickContinueButton();
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    process.env.WIDGET_WALLET_PUBLIC_KEY!,
    rebounderAddresses["goerli"],
  );
  await widgetPage.validateWrapReviewAmount("1");
  await widgetPage.clickContinueButton();
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Ready to send", "Queued", "Queued"],
  );
  await widgetPage.validateTransactionButtonTextAndClick();
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskAllowanceTransaction("1");
  // Checking the pending status makes the test case quite flaky
  // await widgetPage.validateTransactionStatuses(
  //   ["approve", "wrap", "modify"],
  //   ["Transaction sent", "Ready to send", "Queued"],
  // );
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "Ready to send", "Queued"],
  );
  await widgetPage.validateTransactionButtonTextAndClick();
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  // Checking the pending status makes the test case quite flaky
  // await widgetPage.validateTransactionStatuses(
  //   ["approve", "wrap", "modify"],
  //   ["Completed", "Transaction sent", "Queued"],
  // );
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "Completed", "Ready to send"],
  );
  await widgetPage.validateTokenBalanceAfterWrap();
});

test("Can't stream to self error during review", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.addPaymentOption(paymentOptions.streamToSelfOption);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("TDLx");
  await widgetPage.connectWallet();
  await widgetPage.clickContinueButton();
  await widgetPage.validateReviewStepError("You can't stream to yourself.");
});

test("Not enough underlying token balance during review", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fUSDCx");
  await widgetPage.connectWallet();
  await widgetPage.setWrapAmount("99999");
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
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("TDLx");
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
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("TDLx");
  await widgetPage.connectWallet();
  await widgetPage.setWrapAmount("0");
  await widgetPage.clickContinueButton();
  await widgetPage.validateReviewStepError(
    "You need to have Super Token balance for at least 24 hours of streaming.",
  );
});

test("Switch network button shown in the transaction view", async ({
  page,
}) => {
  let widgetPage = new WidgetPage(page);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fUSDCx");
  await widgetPage.connectWallet();
  await widgetPage.clickContinueButton();
  await widgetPage.validateReviewStepIsOpen();
  await widgetPage.clickContinueButton();
  await metamask.changeNetwork("Sepolia");
  await widgetPage.clickSwitchNetworkButton();
  await metamask.allowToSwitchNetwork();
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Ready to send", "Queued", "Queued"],
  );
  await widgetPage.validateTransactionButtonTextAndClick();
});

test("Suggested token amount getting input for the user (3x)", async ({
  page,
}) => {
  let widgetPage = new WidgetPage(page);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fUSDCx");
  await widgetPage.connectWallet();
  await widgetPage.validateThatWrapAmountInputIs("3");
});

test("Payment option with upfront payment", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.openPaymentTab();
  await builderPage.clickOnWandButton();
  await builderPage.clickOnNthEditPaymentOptionButton(6);
  await builderPage.editUpfrontPaymentAmountTo("1");
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fDAIx");
  await widgetPage.connectWallet();
  await widgetPage.validateAndSaveWrapPageBalances("Goerli", "fDAIx");
  await widgetPage.skipWrapStep();
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    process.env.WIDGET_WALLET_PUBLIC_KEY!,
    rebounderAddresses["goerli"],
  );
  await widgetPage.clickContinueButton();
  await widgetPage.validateTransactionStatuses(
    ["transfer", "send"],
    ["Ready to send", "Queued"],
  );
  await widgetPage.validateTransactionButtonTextAndClick();
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  await widgetPage.validateTransactionStatuses(
    ["transfer", "send"],
    ["Completed", "Ready to send"],
  );
  await widgetPage.validateTokenBalanceAfterTransfer();
  // TODO Once upfront payments are shown in the success screen enable these steps
  // await widgetPage.validateTransactionButtonTextAndClick();
  // await widgetPage.validateTransactionButtonLoading();
  // await widgetPage.acceptMetamaskTransaction();
  // await widgetPage.validateSuccessMessage("1")
  // await widgetPage.validateSuccessMessageUpfrontPaymentAmount("1")
});
