import { WidgetPage } from "../pageObjects/widgetPage.js";
import { test } from "../walletSetup.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test.describe("Widget configuration test cases", () => {
  test("Suggested token amount getting input for the user (3x)", async ({
    page,
  }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.selectPaymentNetwork("Goerli");
    await widgetPage.selectPaymentToken("fUSDCx");
    await widgetPage.connectWallet();
    await widgetPage.validateThatWrapAmountInputIs("3");
  });
});
