import metamask from "@synthetixio/synpress/commands/metamask.js";

import { randomReceiver, rebounderAddresses } from "../pageObjects/basePage.js";
import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";
import { test } from "../walletSetup.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test.describe("Token transfer and approval test cases", () => {
  test("Approving and wrapping tokens", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fUSDCx");
    await widgetPage.connectWallet();
    await widgetPage.validateAndSaveWrapPageBalances(
      "Optimism Sepolia",
      "fUSDCx",
    );
    await widgetPage.setWrapAmount("1");
    await widgetPage.clickContinueButton();
    await widgetPage.validateAndSaveSenderAndReceiverAddresses(
      process.env.WIDGET_WALLET_PUBLIC_KEY!,
      rebounderAddresses["optimism-sepolia"],
    );
    await widgetPage.validateWrapReviewAmount("1");
    await widgetPage.waitForTransactionsToGetValidated();
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

  test("Transfering tokens", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.openExportTab();
    await builderPage.clickOnJsonEditorButton();
    await builderPage.editJsonEditorTo("randomUpfrontPaymentReceiver");
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fTUSD");
    await widgetPage.connectWallet();
    await widgetPage.validateThatWrapAmountInputIs("4"); //1 upfront payment + 1 x 3 flow rate
    await widgetPage.skipWrapStep();
    await widgetPage.validateAndSaveSenderAndReceiverAddresses(
      process.env.WIDGET_WALLET_PUBLIC_KEY!,
      randomReceiver.address,
    );
    await widgetPage.waitForTransactionsToGetValidated();
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
    await widgetPage.validateRandomReceiverTokenBalanceAfterTransfer(
      "Optimism Sepolia",
      "fTUSDx",
      1,
    );
    // TODO Once upfront payments are shown in the success screen enable these steps
    // await widgetPage.validateTransactionButtonTextAndClick();
    // await widgetPage.validateTransactionButtonLoading();
    // await widgetPage.acceptMetamaskTransaction();
    // await widgetPage.validateSuccessMessage("1")
    // await widgetPage.validateSuccessMessageUpfrontPaymentAmount("1")
  });

  test("Switch network button shown in the transaction view", async ({
    page,
  }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
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
});
