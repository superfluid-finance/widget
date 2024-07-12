import { Page } from "@playwright/test";
import {
  MetaMask,
  metaMaskFixtures,
  testWithSynpress,
} from "@synthetixio/synpress";

import {
  paymentOptions,
  randomReceiver,
  rebounderAddresses,
} from "../pageObjects/basePage.ts";
import { BuilderPage } from "../pageObjects/builderPage.ts";
import { WidgetPage } from "../pageObjects/widgetPage.ts";
import basicSetup from "../wallet-setup/basic.setup.ts";

const test = testWithSynpress(metaMaskFixtures(basicSetup));
test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto("/builder");
});

test.describe("Token transfer and approval test cases", () => {
  test("Approving and wrapping tokens", async ({
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
    await widgetPage.validateAndSaveWrapPageBalances(
      "Optimism Sepolia",
      "fDAIx",
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
    await widgetPage.acceptMetamaskAllowanceTransaction("1", metamask);
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
    await widgetPage.acceptMetamaskTransaction(metamask);
    // Checking the pending status makes the test case quite flaky
    // await widgetPage.validateTransactionStatuses(
    //   ["approve", "wrap", "modify"],
    //   ["Completed", "Transaction sent", "Queued"],
    // );
    await widgetPage.validateTransactionStatuses(
      ["approve", "wrap", "modify"],
      ["Completed", "Completed", "Ready to send"],
    );
    await widgetPage.validateTokenBalanceAfterWrap("fDAIx");
  });

  test.only("Transfering tokens", async ({
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.openExportTab();
    await builderPage.clickOnJsonEditorButton();
    await builderPage.editJsonEditorTo("randomUpfrontPaymentReceiver");
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fDAIx");
    await widgetPage.connectWallet(metamask);
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
    await widgetPage.acceptMetamaskTransaction(metamask);
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
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.selectPaymentNetwork("Optimism Sepolia");
    await widgetPage.selectPaymentToken("fUSDCx");
    await widgetPage.connectWallet(metamask);
    await widgetPage.clickContinueButton();
    await widgetPage.validateReviewStepIsOpen();
    await widgetPage.clickContinueButton();
    await metamask.switchNetwork("Sepolia", true);
    await widgetPage.clickSwitchNetworkButton();
    await metamask.approveSwitchNetwork();
    await widgetPage.validateTransactionStatuses(
      ["approve", "wrap", "modify"],
      ["Ready to send", "Queued", "Queued"],
    );
    await widgetPage.validateTransactionButtonTextAndClick();
  });
});
