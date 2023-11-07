import { test } from "@playwright/test";

import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});
test.describe("Export tab test cases", () => {
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
  test("Book a demo button opening the form", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openExportTab();
    await builderPage.clickOnBookADemoAndVerifyPageWasOpen();
  });
});
//# sourceMappingURL=builderExportTab.spec.js.map
