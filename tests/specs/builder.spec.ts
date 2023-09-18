import { test } from "@playwright/test";

import { demoOptions, paymentOptions } from "../pageObjects/basePage";
import { BuilderPage } from "../pageObjects/builderPage";
import { WidgetPage } from "../pageObjects/widgetPage";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test("Changing the products name", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  let testString =
    "Testing changing product name !@£$%^&*() 😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗";
  await builderPage.changeProductName(testString);
  await widgetPage.validateProductName(testString);
});

test("Changing the products description", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  let testString =
    "Testing changing product description !@£$%^&*() 😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗";
  await builderPage.changeDescription(testString);
  await widgetPage.validateProductDescription(testString);
});

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

test("Exporting the widget to IPFS", async ({ page, context }) => {
  let builderPage = new BuilderPage(page);
  let testName = "Testing IPFS export";
  let testDescription = "Test description";
  await builderPage.changeProductName(testName);
  await builderPage.changeDescription(testDescription);
  await builderPage.openExportTab();
  await builderPage.chooseExportOption("ipfs");
  await builderPage.exportWidget("ipfs");
  await builderPage.validateIPFSPublishMessage();
  const pagePromise = context.waitForEvent("page");
  await builderPage.visitPublishedWidget();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  let hostedWidget = new WidgetPage(newPage);
  await hostedWidget.validateProductName(testName);
  await hostedWidget.validateProductDescription(testDescription);
});

test("Exporting the widget to JSON", async ({ page }) => {
  let builderPage = new BuilderPage(page);
  await builderPage.openExportTab();
  await builderPage.chooseExportOption("json");
  await builderPage.exportWidget("json");
  await builderPage.validateExportedJsonFile();
});

test("Uploading and removing a product image", async ({ page }) => {
  let builderPage = new BuilderPage(page);
  let widgetPage = new WidgetPage(page);
  await builderPage.changeProductName("Testing");
  await builderPage.uploadTestImage();
  await widgetPage.validateUsedTestImage();
  await builderPage.removeUsedTestImage();
  await widgetPage.validateNoTestImageIsSet();
});

test("Using magic wand to generate product details and its tooltip", async ({
  page,
}) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.hoverOnWandButtonAndValidateTooltipText(
    "Replace with demo product details",
  );
  await builderPage.clickOnWandButton();
  await builderPage.validateRandomProductSectionIsSet();
  await widgetPage.validateRandomProductDetailsIsShown();
});

test("Next/back button at the footer of builder switching tabs", async ({
  page,
}) => {
  let builderPage = new BuilderPage(page);
  await builderPage.validateProductsTabIsOpen();
  await builderPage.clickFooterNextButton();
  await builderPage.validatePaymentsTabIsOpen();
  await builderPage.clickFooterNextButton();
  await builderPage.validateUITabIsOpen();
  await builderPage.clickFooterNextButton();
  await builderPage.validateExportTabIsOpen();
  await builderPage.clickFooterNextButton();
  await builderPage.validateGatingTabIsOpen();
  await builderPage.clickFooterBackButton();
  await builderPage.validateExportTabIsOpen();
  await builderPage.clickFooterBackButton();
  await builderPage.validateUITabIsOpen();
  await builderPage.clickFooterBackButton();
  await builderPage.validatePaymentsTabIsOpen();
  await builderPage.clickFooterBackButton();
  await builderPage.validateProductsTabIsOpen();
});

test("Opening builder sections from the header tabs", async ({ page }) => {
  let builderPage = new BuilderPage(page);
  await builderPage.validateProductsTabIsOpen();
  await builderPage.openPaymentTab();
  await builderPage.validatePaymentsTabIsOpen();
  await builderPage.openStylingTab();
  await builderPage.validateUITabIsOpen();
  await builderPage.openExportTab();
  await builderPage.validateExportTabIsOpen();
  await builderPage.openGatingTab();
  await builderPage.validateGatingTabIsOpen();
  await builderPage.openProductTab();
  await builderPage.validateProductsTabIsOpen();
});

test("Trying to upload wrong image format", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.changeProductName("Testing");
  await builderPage.uploadInvalidFormatTestImage();
  await widgetPage.validateInvalidTestImage();
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
