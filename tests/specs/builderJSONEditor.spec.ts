import { test } from "@playwright/test";

import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});
test.describe.configure({ mode: "parallel" }); // This will allow describe to run in parallel and be sharded.

test.describe("JSON Editor test cases", () => {
  test("JSON editor - Edit the JSON ( Change name,description,image all payment detail types on all chains )", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openExportTab();
    await builderPage.clickOnJsonEditorButton();
    await builderPage.editJsonEditorTo("allNetworks");
    await widgetPage.validateProductName("All networks test");
    await widgetPage.validateProductDescription(
      "This description was added by setting the config in json editor",
    );
    await widgetPage.validateAllNetworksAreVisibleInTheWidgetSelection();
  });

  test("JSON editor - error shown when invalid json is present", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openExportTab();
    await builderPage.clickOnJsonEditorButton();
    await builderPage.editJsonEditorTo("invalidJson", false);
    await builderPage.verifyJsonEditorErrorIsShown();
  });

  test("JSON editor - schema errors shown in the editor", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openExportTab();
    await builderPage.clickOnJsonEditorButton();
    await builderPage.editJsonEditorTo("schemaError", false);
    await builderPage.verifyJsonEditorSchemaErrorsAreShown();
  });
});
