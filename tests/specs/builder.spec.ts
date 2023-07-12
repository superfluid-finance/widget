import { test } from "@playwright/test";
import { WidgetPage } from "../pageObjects/widgetPage";
import { BuilderPage } from "../pageObjects/builderPage";
import {
  rebounderAddresses,
  testOption,
  defaultPaymentOption,
} from "../pageObjects/basePage";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
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

test.only("Adding a payment new option", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
  await builderPage.addPaymentOption(testOption);
  await builderPage.verifyAddedPaymentOptions([
    defaultPaymentOption,
    testOption,
  ]);
  await builderPage.validateAddedPaymentOptionCount("2");
  await widgetPage.selectPaymentNetwork("Goerli");
  await widgetPage.selectPaymentToken("TDLx");
  await widgetPage.validateSelectedPaymentOption(testOption);
});

test("Deleting a payment option", async ({ page }) => {
  let widgetPage = new WidgetPage(page);
  let builderPage = new BuilderPage(page);
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

test("Uploading a product image", async ({ page }) => {
  let builderPage = new BuilderPage(page);
  let widgetPage = new WidgetPage(page);
  await builderPage.openUITab();
  await builderPage.uploadTestImage();
  await widgetPage.validateUsedTestImage();
});
