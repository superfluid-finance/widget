import { test } from "../walletSetup";
import { WidgetPage } from "../pageObjects/widgetPage";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.skip("Creating a flow", async ({ page }) => {
  //TODO setup closing the flow other than that the test case is ready to go, just change the payment option
  let widgetPage = new WidgetPage(page);
  await widgetPage.connectWallet();
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("fUSDCx");
  await widgetPage.clickContinueButton();
  await widgetPage.setWrapAmount("0");
  await widgetPage.clickContinueButton();
  //Test wallet and goerli rebounder contract
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    "0x7c5de59A1b31e3D00279A825Cb95fAEDb09eA9FD",
    "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22"
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
  //Test wallet and goerli rebounder contract
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    "0x7c5de59A1b31e3D00279A825Cb95fAEDb09eA9FD",
    "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22"
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
  await widgetPage.setWrapAmount("1");
  await widgetPage.clickContinueButton();
  //Test wallet and goerli rebounder contract
  await widgetPage.validateAndSaveSenderAndReceiverAddresses(
    "0x7c5de59A1b31e3D00279A825Cb95fAEDb09eA9FD",
    "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22"
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
  //TODO check token balances without UI here
});
