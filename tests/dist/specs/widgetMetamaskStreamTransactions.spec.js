import { rebounderAddresses } from "../pageObjects/basePage.js";
import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";
import { test } from "../walletSetup.js";
test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});
test.describe("Transactional test cases", () => {
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
      process.env.WIDGET_WALLET_PUBLIC_KEY,
      rebounderAddresses["goerli"],
    );
    await widgetPage.waitForTransactionsToGetValidated();
    await widgetPage.clickContinueButton();
    await widgetPage.validateTransactionStatuses(["send"], ["Ready to send"]);
    await widgetPage.validateTransactionButtonTextAndClick();
    await widgetPage.validateTransactionButtonLoading();
    await widgetPage.acceptMetamaskTransaction();
    await widgetPage.validateTransactionStatuses(
      ["send"],
      ["Transaction sent"],
    );
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
      process.env.WIDGET_WALLET_PUBLIC_KEY,
      rebounderAddresses["goerli"],
    );
    await widgetPage.waitForTransactionsToGetValidated();
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
});
//# sourceMappingURL=widgetMetamaskStreamTransactions.spec.js.map
