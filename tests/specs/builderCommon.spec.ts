import { test } from "@playwright/test";

import { BuilderPage } from "../pageObjects/builderPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test.describe("Common test cases", () => {
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
});
