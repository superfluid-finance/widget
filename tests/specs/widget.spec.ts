import * as metamask from "@synthetixio/synpress/commands/metamask";

import {
  rebounderAddresses,
  streamToSelfOption,
  testOption,
} from "../pageObjects/basePage";
import { BuilderPage } from "../pageObjects/builderPage";
import { WidgetPage } from "../pageObjects/widgetPage";
import { test } from "../walletSetup";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test("Creating a flow", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.enableDemoMode();
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fDAIx");
  await widgetPage.connectWallet();
  await widgetPage.skipWrapStep();
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    process.env.WIDGET_WALLET_PUBLIC_KEY!,
    rebounderAddresses["goerli"],
  );
  await widgetPage.clickContinueButton();
  await widgetPage.validateTransactionStatuses(["send"], ["Not started"]);
  await widgetPage.validateTransactionButtonTextAndClick("send");
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  await widgetPage.validateTransactionStatuses(["send"], ["In progress"]);
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
  await widgetPage.validateTransactionStatuses(["modify"], ["Not started"]);
  await widgetPage.validateTransactionButtonTextAndClick("modify");
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  await widgetPage.validateTransactionStatuses(["modify"], ["In progress"]);
  await widgetPage.validateSuccessMessage("1");
});

test("Approving and wrapping tokens", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fUSDCx");
  await widgetPage.connectWallet();
  await widgetPage.validateAndSaveWrapPageBalances();
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
    ["Not started", "Not started", "Not started"],
  );
  await widgetPage.validateTransactionButtonTextAndClick("approve");
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskAllowanceTransaction("1");
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["In progress", "Not started", "Not started"],
  );
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "Not started", "Not started"],
  );
  await widgetPage.validateTransactionButtonTextAndClick("wrap");
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "In progress", "Not started"],
  );
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "Completed", "Not started"],
  );
  await widgetPage.validateTokenBalanceAfterWrap();
});

test("Can't stream to self error during review", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.addPaymentOption(streamToSelfOption);
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
  testOption.flowRate = "99999999";
  await builderPage.addPaymentOption(testOption);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("TDLx");
  await widgetPage.connectWallet();
  await widgetPage.clickContinueButton();
  await widgetPage.validateReviewStepError(
    "You don’t have enough Super Token balance to cover buffer.",
  );
});

test("Need atleast 24 hours worth of stream error", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  testOption.flowRate = "1";
  testOption.timeUnit = "day";
  await builderPage.addPaymentOption(testOption);
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("TDLx");
  await widgetPage.connectWallet();
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
  await widgetPage.clickContinueButton();
  await metamask.changeNetwork("Sepolia");
  await widgetPage.clickSwitchNetworkButton();
  await metamask.allowToSwitchNetwork();
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Not started", "Not started", "Not started"],
  );
  await widgetPage.validateTransactionButtonTextAndClick("approve");
});
