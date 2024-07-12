import { test } from "@playwright/test";

import { BuilderPage } from "../pageObjects/builderPage.ts";
import { WidgetPage } from "../pageObjects/widgetPage.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test.describe("Products tab test cases", () => {
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

  test("Trying to upload wrong image format", async ({ page }) => {
    let widgetPage = new WidgetPage(page);
    let builderPage = new BuilderPage(page);
    await builderPage.changeProductName("Testing");
    await builderPage.uploadInvalidFormatTestImage();
    await widgetPage.validateInvalidTestImage();
  });
});
