import { test } from "@playwright/test";

import { BuilderPage } from "../pageObjects/builderPage.js";
import { WidgetPage } from "../pageObjects/widgetPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});

test.describe("Styling tab test cases", () => {
  test("View types - Inline", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.clickInlineViewModeButton();
    await widgetPage.validateInlineWidgetIsVisible();
  });

  test("View types - Dialog", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.clickDialogViewModeButton();
    await widgetPage.clickOnOpenWidgetInButton();
    await widgetPage.validateDialogViewWidgetIsVisible();
  });

  test("View types - Drawer", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.clickDrawerViewModeButton();
    await widgetPage.clickOnOpenWidgetInButton();
    await widgetPage.validateDrawerViewWidgetIsVisible();
  });

  test("View types - Full-screen", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.clickFullScreenViewModeButton();
    await widgetPage.clickOnOpenWidgetInButton();
    await widgetPage.validateFullScreenViewWidgetIsVisible();
  });

  test("Turning dark mode on", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.enableDarkMode();
    await widgetPage.validateDarkModeIsEnabled();
  });

  test("Turning dark mode off", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.enableLightMode();
    await widgetPage.validateLightModeIsEnabled();
  });

  test("Changing container border radius", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let minRadius = 0;
    let maxRadius = 50;
    let defaultRadius = 20;
    await builderPage.openStylingTab();
    await widgetPage.validateContainerBorderRadiusIs(defaultRadius);
    await builderPage.changeBorderRadius("container", minRadius);
    await widgetPage.validateContainerBorderRadiusIs(minRadius);
    await builderPage.changeBorderRadius("container", maxRadius);
    await widgetPage.validateContainerBorderRadiusIs(maxRadius);
  });

  test("Changing field border radius", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let minRadius = 0;
    let maxRadius = 25;
    let defaultRadius = 10;
    await builderPage.openStylingTab();
    await widgetPage.validateFieldBorderRadiusIs(defaultRadius);
    await builderPage.changeBorderRadius("field", minRadius);
    await widgetPage.validateFieldBorderRadiusIs(minRadius);
    await builderPage.changeBorderRadius("field", maxRadius);
    await widgetPage.validateFieldBorderRadiusIs(maxRadius);
  });

  test.skip("Changing button border radius", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let minRadius = 0;
    let maxRadius = 25;
    let defaultRadius = 10;
    await builderPage.openStylingTab();
    await widgetPage.validateButtonBorderRadiusIs(defaultRadius);
    await builderPage.changeBorderRadius("button", minRadius);
    await widgetPage.validateButtonBorderRadiusIs(minRadius);
    await builderPage.changeBorderRadius("button", maxRadius);
    await widgetPage.validateButtonBorderRadiusIs(maxRadius);
  });

  test.skip("Changing primary color by typing color in the field", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let defaultColor = "rgb(29, 178, 39)";
    let red = "rgb(255, 0, 0)";
    await builderPage.openStylingTab();
    await widgetPage.validatePrimaryColorIs(defaultColor);
    await builderPage.changePrimaryColorTo(red);
    await widgetPage.validatePrimaryColorIs(red);
  });

  test("Changing secondary color by typing color in the field", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let defaultColor = "rgb(255, 255, 255)";
    let red = "rgb(255, 0, 0)";
    await builderPage.openStylingTab();
    await widgetPage.validateSecondaryColorIs(defaultColor);
    await builderPage.changeSecondaryColorTo(red);
    await widgetPage.validateSecondaryColorIs(red);
  });

  test("Changing the font of the widget", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    let defaultFont = '"Noto Sans", "sans-serif"';
    let testFont = '"Azeret Mono", "monospace"';
    await builderPage.openStylingTab();
    await page.waitForTimeout(5000);
    await widgetPage.validateWidgetFontIs(defaultFont);
    await builderPage.changeWidgetFontTo(testFont);
    await widgetPage.validateWidgetFontIs(testFont);
  });

  test.skip("Changing the stepper to vertical and horizontal", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await widgetPage.validateWidgetStepperIsVertical();
    await builderPage.changeStepperToHorizontal();
    await widgetPage.validateWidgetStepperIsHorizontal();
    await builderPage.changeStepperToVertical();
    await widgetPage.validateWidgetStepperIsVertical();
  });

  //https://github.com/superfluid-finance/widget/issues/188
  test.skip("Chosing the same stepper possitioning does not crash the page", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.forcefullyChangeStepperToVertical();
    await widgetPage.validateWidgetStepperIsVertical();
  });

  test("Using the magic wand button to generate styling", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.clickOnWandButton();
    await widgetPage.validateRandomStylingIsGenerated();
  });

  test("View types - Closing full screen widget view", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    let widgetPage = new WidgetPage(page);
    await builderPage.openStylingTab();
    await builderPage.clickFullScreenViewModeButton();
    await widgetPage.clickOnOpenWidgetInButton();
    await widgetPage.clickFullScreenWidgetCloseButton();
    await widgetPage.validateOpenWidgetInButtonIsVisible();
    await widgetPage.validateWidgetIsNotShown();
  });

  // TODO Look into other ways of getting the elements coordinates and fix up the tests
  // Playwright can't seem to find the correct bounding boxes for the slider and thumb,
  // It might be related to it scrolling during the test case and getting the bounding box relative to the main frame viewport
  // https://playwright.dev/docs/api/class-locator#locator-bounding-box
  // Tried to simply offset the x/y but basicly every time the coordinates end up being random and failing the test
  // test("Changing primary color by using the color picker", async ({ page }) => {
  //   let builderPage = new BuilderPage(page);
  //   let widgetPage = new WidgetPage(page);
  //   await builderPage.openStylingTab();
  //   await builderPage.openPrimaryColorPicker();
  //   await builderPage.slideColorPickerHueSliderToMiddle();
  //   await widgetPage.validatePrimaryColorIs("rgb(178, 29, 31)");
  //   await builderPage.slideColorPickerAlphaSliderToMiddle();
  //   await widgetPage.validatePrimaryColorIs("rgb(178, 29, 29)");
  // });

  // test("Changing secondary color by using the color picker", async ({ page }) => {
  //   let builderPage = new BuilderPage(page);
  //   let widgetPage = new WidgetPage(page);
  //   await builderPage.openStylingTab();
  //   await builderPage.openSecondaryColorPicker();
  //   await builderPage.clickOnTheMiddleOfTheColorPallete();
  //   await builderPage.slideColorPickerHueSliderToMiddle();
  //   await widgetPage.validateSecondaryColorIs("rgb(178, 29, 29)");
  //   await builderPage.slideColorPickerAlphaSliderToMiddle();
  //   await widgetPage.validateSecondaryColorIs("rgb(178, 29, 29)");
  // });
});
