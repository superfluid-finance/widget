import { test } from "../walletSetup";
import { WidgetPage } from "../pageObjects/widgetPage";
import { rebounderAddresses } from "../pageObjects/basePage";
import { BuilderPage } from "../pageObjects/builderPage";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
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
    rebounderAddresses["goerli"]
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
    rebounderAddresses["goerli"]
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
    rebounderAddresses["goerli"]
  );
  await widgetPage.validateWrapReviewAmount("1");
  await widgetPage.clickContinueButton();
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Not started", "Not started", "Not started"]
  );
  await widgetPage.validateTransactionButtonTextAndClick("approve");
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskAllowanceTransaction("1");
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["In progress", "Not started", "Not started"]
  );
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "Not started", "Not started"]
  );
  await widgetPage.validateTransactionButtonTextAndClick("wrap");
  await widgetPage.validateTransactionButtonLoading();
  await widgetPage.acceptMetamaskTransaction();
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "In progress", "Not started"]
  );
  await widgetPage.validateTransactionStatuses(
    ["approve", "wrap", "modify"],
    ["Completed", "Completed", "Not started"]
  );
  await widgetPage.validateTokenBalanceAfterWrap();
});
