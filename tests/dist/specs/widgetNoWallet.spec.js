import { test } from "@playwright/test";

import { demoOptions, paymentOptions } from "../pageObjects/basePage.js";
import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});
test.describe("Misc test cases without wallet connected", () => {
  test("All available networks and tokens showing up in the widget", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await widgetPage.validateAvailablePaymentOptions(demoOptions);
  });
  test("Powered by Superfluid button leading to superfluid.finance", async ({
    page,
  }) => {
    let widgetPage = new WidgetPage(page);
    await widgetPage.clickOnPoweredBySuperfluidAndValidateOpenedLink();
  });
  test("Details not visible if user has not set product name, description and image", async ({
    page,
  }) => {
    let widgetPage = new WidgetPage(page);
    await page.waitForURL("**/builder");
    await widgetPage.validateNoProductDetailsAreShown();
  });
  test("Terms of Use Hyperlink", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    await page.waitForURL("**/builder");
    await widgetPage.clickAndVerifyTermsOfUsePageIsOpen();
  });
  test("Privacy policy link", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    await page.waitForURL("**/builder");
    await widgetPage.clickAndVerifyPrivacyPolicyPageIsOpen();
  });
  test("Searching for a network in the payment option step", async ({
    page,
  }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await widgetPage.clickNetworkSelectionButton();
    await widgetPage.searchForPaymentOptionNetwork("Goerli");
    await widgetPage.validateOnlyNetworksContainingTextAreVisible("Goerli");
    await widgetPage.searchForPaymentOptionNetwork("Testing");
    await widgetPage.validateNoOptionsAreShown();
  });
  test("Searching for a token in the payment option step", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await widgetPage.selectPaymentNetwork("Goerli");
    await widgetPage.selectPaymentToken("NTDL");
    await widgetPage.clickTokenSelectionButton();
    await widgetPage.searchForPaymentOptionToken("fUSDCx");
    await widgetPage.validateOnlyTokensContainingTextAreVisible("fUSDCx");
    await widgetPage.searchForPaymentOptionToken("Testing");
    await widgetPage.validateNoOptionsAreShown();
  });
  test("Wrap step not being shown for pure super tokens", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await widgetPage.selectPaymentNetwork("Goerli");
    await widgetPage.selectPaymentToken("NTDL");
    await widgetPage.validateNoWrapStepIsPresent();
  });
  test("Wrap step not being shown for native tokens", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    let testOption = paymentOptions.defaultPaymentOption;
    testOption.superToken = "ETHx";
    testOption.superTokenName = "Super ETH";
    await builderPage.openPaymentTab();
    await builderPage.addPaymentOption(testOption);
    await widgetPage.selectPaymentNetwork("Goerli");
    await widgetPage.selectPaymentToken("ETHx");
    await widgetPage.validateNoWrapStepIsPresent();
  });
  // TODO Playwright forces the focus on the element and at that point scroll bar appears and it is possible to scroll to, re-enable this test case once https://github.com/superfluid-finance/widget/issues/92 is fixed and add visual regression test
  // Currently it would pass and give a false negative result
  // test("Searching choosing a payment option with more than 8 options available" , async ({ page }) => {
  //   let widgetPage = new WidgetPage(page);
  //   let builderPage = new BuilderPage(page);
  //   await builderPage.clickOnJsonEditorButton()
  //   await builderPage.editJsonEditorTo("tonsOfOptions")
  //   await widgetPage.selectPaymentNetwork("Goerli")
  //   await widgetPage.selectPaymentToken("fUSDCx")
  // })
});
//# sourceMappingURL=widgetNoWallet.spec.js.map
