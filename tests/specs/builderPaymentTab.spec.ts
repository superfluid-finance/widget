import { test } from "@playwright/test";

import { demoOptions, paymentOptions } from "../pageObjects/basePage.js";
import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});
test.describe.configure({ mode: "parallel" }); // This will allow describe to run in parallel and be sharded.

test.describe("Payment tab test cases", () => {
  test("Adding a new payment option", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.changeProductName("Testing");
    await builderPage.addPaymentOption(paymentOptions.testOption);
    await builderPage.verifyAddedPaymentOptions([
      paymentOptions.testOption,
      paymentOptions.defaultPaymentOption,
    ]);
    await builderPage.validateAddedPaymentOptionCount("2");
    await widgetPage.selectPaymentNetwork("Goerli");
    await widgetPage.selectPaymentToken("TDLx");
    await widgetPage.validateSelectedPaymentOption(paymentOptions.testOption);
  });

  test("Deleting a payment option", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.deleteLastAddedPaymentOption();
    await builderPage.validateAddedPaymentOptionCount("0");
    await builderPage.validateNoPaymentOptionsAddedMessage();
    await widgetPage.validateWidgetNoPaymentOptionsError();
  });

  test("Adding a new payment option - stream rate with a time unit", async ({
    page,
  }) => {
    let testOption: PaymentOption = paymentOptions.testOption as PaymentOption;
    testOption.timeUnit = "day";
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.changeProductName("Testing");
    await builderPage.addPaymentOption(testOption);
    await builderPage.verifyAddedPaymentOptions([testOption]);
    await builderPage.validateAddedPaymentOptionCount("2");
    await widgetPage.selectPaymentOption(testOption);
    await widgetPage.validateSelectedPaymentOption(testOption);
  });

  test("Adding a new payment option - user defined rate", async ({ page }) => {
    let testOption = paymentOptions.testOption as PaymentOption;
    testOption.userDefinedRate = true;
    testOption.flowRate = "0"; // Custom amount is 0 by default
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.changeProductName("Testing");
    await builderPage.addPaymentOption(testOption);
    await builderPage.verifyAddedPaymentOptions([testOption]);
    await builderPage.validateAddedPaymentOptionCount("2");
    await widgetPage.selectPaymentOption(testOption);
    await widgetPage.validateSelectedPaymentOption(testOption);
    await widgetPage.changeCustomPaymentAmount("1", "day");
    testOption.flowRate = "1";
    testOption.timeUnit = "day";
    await widgetPage.validateSelectedPaymentOption(testOption);
  });

  test("Adding a new payment option - upfront payment", async ({ page }) => {
    let testOption = paymentOptions.testOption as PaymentOption;
    testOption.upfrontPayment = "1";
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.changeProductName("Testing");
    await builderPage.addPaymentOption(testOption);
    await builderPage.verifyAddedPaymentOptions([testOption]);
    await builderPage.validateAddedPaymentOptionCount("2");
    await widgetPage.selectPaymentOption(testOption);
    await widgetPage.validateSelectedPaymentOption(testOption);
  });

  test("Cloning a payment option - just flow rate", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnNthCopyPaymentOptionButton(0);
    await builderPage.verifyPaymentOptionShownInForm(
      paymentOptions.defaultPaymentOption,
    );
    await builderPage.clickAddPaymentOptionButton();
    await builderPage.verifyAddedPaymentOptions([
      paymentOptions.defaultPaymentOption,
      paymentOptions.defaultPaymentOption,
    ]);
    await widgetPage.verifyDuplicateOptionError();
  });

  test("Cloning a payment option - user defined rate", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let finalOptions: PaymentOption[] = [demoOptions[1], ...demoOptions];
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await builderPage.verifyAddedPaymentOptions(demoOptions);
    await builderPage.clickOnNthCopyPaymentOptionButton(1);
    await builderPage.verifyPaymentOptionShownInForm(demoOptions[1]);
    await builderPage.clickAddPaymentOptionButton();
    await builderPage.verifyAddedPaymentOptions(finalOptions);
    await widgetPage.verifyDuplicateOptionError();
  });

  test("Cloning a payment option - upfront payment", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let finalOptions: PaymentOption[] = [demoOptions[2], ...demoOptions];
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await builderPage.clickOnNthCopyPaymentOptionButton(2);
    await builderPage.verifyPaymentOptionShownInForm(demoOptions[2]);
    await builderPage.clickAddPaymentOptionButton();
    await builderPage.verifyAddedPaymentOptions(finalOptions);
    await widgetPage.verifyDuplicateOptionError();
  });

  test("Editing a payment option - just flow rate", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnNthEditPaymentOptionButton(0);
    await builderPage.verifyPaymentOptionShownInForm(
      paymentOptions.defaultPaymentOption,
    );
    await builderPage.editPaymentOptionFlowRateTo("10");
    let expectedTestOption: PaymentOption[] = [
      { ...paymentOptions.defaultPaymentOption, flowRate: "10" },
    ];
    await builderPage.verifyAddedPaymentOptions(expectedTestOption);
  });

  test("Editing a payment option - user defined rate", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await builderPage.clickOnNthEditPaymentOptionButton(1);
    await builderPage.verifyPaymentOptionShownInForm(demoOptions[1]);
    await builderPage.disableUserDefinedRate();
    await builderPage.editPaymentOptionFlowRateTo("10");
    let finalOptions: PaymentOption[] = [...demoOptions];
    finalOptions[1].flowRate = "10";
    finalOptions[1].userDefinedRate = false;
    await builderPage.verifyAddedPaymentOptions(finalOptions);
  });

  test("Editing a payment option - upfront payment", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await builderPage.clickOnNthEditPaymentOptionButton(2);
    await builderPage.verifyPaymentOptionShownInForm(demoOptions[2]);
    await builderPage.editUpfrontPaymentAmountTo("10");
    let finalOptions: PaymentOption[] = [...demoOptions];
    finalOptions[2].upfrontPayment = "10";
    await builderPage.verifyAddedPaymentOptions(finalOptions);
  });

  test("Adding a new payment option - discard form", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.validateAddPaymentFormIsOpen();
    await builderPage.clickDiscardPaymentOptionButton();
    await builderPage.validateAddPaymentFormIsNotOpen();
  });

  test("Adding a new payment option - close form with x", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.validateAddPaymentFormIsOpen();
    await builderPage.closeFormWithXButton();
    await builderPage.validateAddPaymentFormIsNotOpen();
  });

  test("Add payment option form errors ( red borders and field titles )", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.enableUpfrontPaymentSwitch();
    await builderPage.clickAddPaymentOptionButton();
    await builderPage.validateOptionFormFieldError("network");
    await builderPage.validateOptionFormFieldError("receiver");
    await builderPage.validateOptionFormFieldError("token");
    await builderPage.validateOptionFormFieldError("flowRate");
    await builderPage.validateOptionFormFieldError("upfrontPaymentAmount");
  });

  test("Add payment option form tooltips (network, receiver address, super token, stream rate, upfront switch and upfront payment amount)", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.enableUpfrontPaymentSwitch();
    await builderPage.hoverAndValidateAllPaymentFormTooltipTexts();
  });

  test("Add payment option form - Networks shown in the dropdown", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.clickPaymentFormNetworkDropdown();
    await builderPage.validateNetworksInDropdown();
  });

  test("Add payment option form - tokens and their icons shown in the dropdown", async ({
    page,
  }) => {
    let testOption = {
      network: "Goerli",
    };
    let builderPage = new BuilderPage(page);
    await builderPage.addPartialPaymentOption(testOption);
    await builderPage.validateTokensInDropdown("Goerli");
  });

  test("Add payment option form - searching for a token", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.selectNetworkForPaymentOption("Goerli");
    await builderPage.searchAndValidateTokenInDropdown("TDLx");
  });

  test("Add payment option form - invalid receiver field values", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.inputInvalidValuesAndVerifyPaymentFormError("receiver");
  });

  test("Add payment option form - invalid flow rate field values", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.inputInvalidValuesAndVerifyPaymentFormError("flowRate");
  });

  test("Add payment option form - invalid upfront payment field values ", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.enableUpfrontPaymentSwitch();
    await builderPage.inputInvalidValuesAndVerifyPaymentFormError(
      "upfrontPaymentAmount",
    );
  });

  test("Replace with demo data hyperlink adding demo options", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openPaymentTab();
    await builderPage.deleteLastAddedPaymentOption();
    await builderPage.clickReplaceWithDemoDatalink();
    await builderPage.verifyAddedPaymentOptions(demoOptions);
    await widgetPage.validateNoOptionIsSelected();
  });

  test("Using magic wand to generate payment options and its tooltip", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openPaymentTab();
    await builderPage.hoverOnWandButtonAndValidateTooltipText(
      "Replace with demo payment details",
    );
    await builderPage.clickOnWandButton();
    await builderPage.verifyAddedPaymentOptions(demoOptions);
    await builderPage.validateAddedPaymentOptionCount("8");
    await widgetPage.validateNoOptionIsSelected();
  });

  test("Address tooltips shown in the payment list", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.hoverOnFirstAddressInPaymentListAndValidateTooltip();
  });

  test("Fixed and User defined rate descriptions in the add payment form", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickAddPaymentOptionFormButton();
    await builderPage.validateFixedRateHelperMessage();
    await builderPage.clickDiscardPaymentOptionButton();
    await builderPage.openProductTab();
    await builderPage.addPartialPaymentOption({
      flowRate: "1",
      userDefinedRate: true,
    });
    await builderPage.validateUserDefinedRateHelperMessage();
  });

  test("Payment option form - Clearing the selected token with the x button", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.addPartialPaymentOption({
      network: "Goerli",
      superToken: "TDLx",
      chainId: "5",
    });
    await builderPage.clearSelectedTokenWithXButton();
    await builderPage.validateNoTokenIsSelectedInAddPaymentForm();
  });
});
