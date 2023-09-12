import { expect, Locator, Page, test } from "@playwright/test";
import fs from "fs";

import { BasePage, randomDetailsSet } from "./basePage";

export class BuilderPage extends BasePage {
  readonly page: Page;
  readonly stylingTab: Locator;
  readonly productTab: Locator;
  readonly exportTab: Locator;
  readonly paymentTab: Locator;
  readonly productNameField: Locator;
  readonly productDescriptionField: Locator;
  readonly networkOptions: Locator;
  readonly superTokenOption: Locator;
  readonly flowRateOption: Locator;
  readonly timeUnitSelection: Locator;
  readonly receiverOption: Locator;
  readonly useAsDefaultPaymentSwitch: Locator;
  readonly addPaymentOptionButton: Locator;
  readonly paymentOptionCount: Locator;
  readonly summaryNetworks: Locator;
  readonly summaryTokens: Locator;
  readonly summaryFlowRate: Locator;
  readonly summaryReceiver: Locator;
  readonly summaryDeleteButtons: Locator;
  readonly darkModeSwitch: Locator;
  readonly containerBorderSlider: Locator;
  readonly containerBorderSliderAmount: Locator;
  readonly fieldBorderSlider: Locator;
  readonly fieldBorderSliderAmount: Locator;
  readonly buttonBorderSlider: Locator;
  readonly buttonBorderSliderAmount: Locator;
  readonly primaryColorPicker: Locator;
  readonly secondaryColorPicker: Locator;
  readonly fontPicker: Locator;
  readonly stepperPositionVertical: Locator;
  readonly stepperPossitionHorizontal: Locator;
  readonly exportOptions: Locator;
  readonly exportIPFSOption: Locator;
  readonly exportJSONoption: Locator;
  readonly publishButton: Locator;
  readonly downloadButton: Locator;
  readonly demoModeSwitch: Locator;
  readonly goToHostedWidgetButton: Locator;
  readonly publishedWidgetMessage: Locator;
  readonly noOptionsMessage: Locator;
  readonly uploadImageField: Locator;
  readonly addPaymentOptionFormButton: Locator;
  readonly discardPaymentOption: Locator;
  readonly wandButton: Locator;
  readonly selectedProductImage: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly inlineButton: Locator;
  readonly dialogButton: Locator;
  readonly drawerButton: Locator;
  readonly fullScreenButton: Locator;
  readonly bookDemoButton: Locator;
  readonly tooltip: Locator;
  readonly removeImageButton: Locator;
  readonly paymentFormNetworkTooltip: Locator;
  readonly paymentFormReceiverAddressTooltip: Locator;
  readonly paymentFormSuperTokenTooltip: Locator;
  readonly paymentFormStreamRateTooltip: Locator;
  readonly paymentFormUpfrontPaymentAmountTooltip: Locator;
  readonly paymentFormUpfrontPaymentSwitchTooltip: Locator;
  readonly fixedRateButton: Locator;
  readonly userDefinedRateButton: Locator;
  readonly upfrontPaymentInputField: Locator;
  readonly upfrontPaymentSwitch: Locator;
  readonly rateHelperText: Locator;
  readonly closeButton: Locator;
  readonly dialogs: Locator;
  readonly paymentFormNetworkTitle: Locator;
  readonly paymentFormReceiverAddressTitle: Locator;
  readonly paymentFormSuperTokenTitle: Locator;
  readonly paymentFormStreamRateTitle: Locator;
  readonly paymentFormUpfrontPaymentAmountTitle: Locator;

  paymentOptionDuringTest: PaymentOption | PartialPaymentOption | undefined;

  constructor(page: Page) {
    super();
    this.page = page;
    this.stylingTab = page.getByTestId("ui-tab");
    this.productTab = page.getByTestId("product-tab");
    this.exportTab = page.getByTestId("export-tab");
    this.publishedWidgetMessage = page.getByTestId("published-message");
    this.productNameField = page
      .getByTestId("product-name-field")
      .getByRole("textbox");
    this.productDescriptionField = page
      .getByTestId("product-description-field")
      .getByRole("textbox");
    this.networkOptions = page
      .getByTestId("network-selection")
      .getByRole("button");
    this.superTokenOption = page.locator("#token-select");
    this.flowRateOption = page
      .getByTestId("flow-rate-input")
      .getByRole("textbox");
    this.timeUnitSelection = page.getByTestId("time-unit-selection");
    this.receiverOption = page
      .getByTestId("receiver-input-field")
      .getByRole("textbox");
    this.useAsDefaultPaymentSwitch = page.getByLabel(
      "Use as default payment option"
    );
    this.addPaymentOptionButton = page.getByTestId("add-option-button");
    this.paymentOptionCount = page.getByTestId("added-payment-options-count");
    this.summaryNetworks = page.getByTestId("added-network-option");
    this.summaryTokens = page.getByTestId("added-token-option");
    this.summaryFlowRate = page.getByTestId("stream-rate-added-payment-option");
    this.summaryReceiver = page.getByTestId("added-payment-receiver");
    this.summaryDeleteButtons = page.getByTestId(
      "delete-payment-option-button"
    );
    this.uploadImageField = page.getByTestId("file-upload-field");
    this.darkModeSwitch = page.getByLabel("Dark mode: off");
    this.containerBorderSlider = page.getByTestId("container-radius-slider");
    this.containerBorderSliderAmount = page.getByTestId(
      "container-radius-slider-amount"
    );
    this.fieldBorderSlider = page.getByTestId("field-border-slider");
    this.fieldBorderSliderAmount = page.getByTestId(
      "field-border-slider-amount"
    );
    this.buttonBorderSlider = page.getByTestId("button-border-radius-slider");
    this.buttonBorderSliderAmount = page.getByTestId(
      "button-border-radius-amount"
    );
    this.primaryColorPicker = page
      .getByTestId("primary-color-picker")
      .getByRole("textbox");
    this.secondaryColorPicker = page
      .getByTestId("secondary-color-picker")
      .getByRole("textbox");
    this.fontPicker = page.getByTestId("font-picker").getByRole("combobox");
    this.stepperPositionVertical = page.getByRole("button", {
      name: "vertical stepper",
    });
    this.stepperPossitionHorizontal = page.getByRole("button", {
      name: "horizontal stepper",
    });
    this.exportOptions = page.getByTestId("export-option");
    this.exportIPFSOption = page.getByRole("option", {
      name: "Publish to IPFS to get a hosted link",
    });
    this.exportJSONoption = page.getByRole("option", { name: "Download JSON" });
    this.publishButton = page.getByTestId("publish-button");
    this.downloadButton = page.getByTestId("download-button");
    this.demoModeSwitch = page.getByTestId("demo-mode-switch");
    this.goToHostedWidgetButton = page.getByTestId("go-to-widget-button");
    this.noOptionsMessage = page.getByTestId("no-options-message");
    this.paymentTab = page.getByTestId("payment-tab");
    this.addPaymentOptionFormButton = page.getByTestId(
      "add-payment-option-button"
    );
    this.discardPaymentOption = page.getByTestId("discard-option-button");
    this.wandButton = page.getByTestId("wand-button");
    this.selectedProductImage = page.getByTestId("product-image");
    this.nextButton = page.getByTestId("next-button");
    this.backButton = page.getByTestId("back-button");
    this.inlineButton = page.getByTestId("inline-button");
    this.dialogButton = page.getByTestId("dialog-button");
    this.drawerButton = page.getByTestId("drawer-button");
    this.fullScreenButton = page.getByTestId("full-screen-button");
    this.bookDemoButton = page.getByTestId("book-demo-button");
    this.tooltip = page.locator("[role=tooltip]");
    this.removeImageButton = page.getByTestId("remove-image-button");
    this.paymentFormNetworkTooltip = page.locator(
      "[data-testid=network-title] + [data-testid=tooltip-icon]"
    );
    this.paymentFormNetworkTitle = page.locator("[data-testid=network-title]");
    this.paymentFormReceiverAddressTooltip = page.locator(
      "[data-testid=receiver-title] + [data-testid=tooltip-icon]"
    );
    this.paymentFormSuperTokenTooltip = page.locator(
      "[data-testid=super-token-title] + [data-testid=tooltip-icon]"
    );
    this.paymentFormStreamRateTooltip = page.locator(
      "[data-testid=stream-rate-title] + [data-testid=tooltip-icon]"
    );
    this.paymentFormUpfrontPaymentAmountTooltip = page.locator(
      "[data-testid=upfront-payment-title] + [data-testid=tooltip-icon]"
    );
    this.paymentFormUpfrontPaymentSwitchTooltip = page.locator(
      "[data-testid=upfront-payment-label] + [data-testid=tooltip-icon]"
    );
    this.fixedRateButton = page.getByTestId("fixed-rate-button");
    this.userDefinedRateButton = page.getByTestId("user-defined-rate-button");
    this.upfrontPaymentInputField = page
      .getByTestId("upfront-payment-amount-input")
      .locator("input");
    this.upfrontPaymentSwitch = page.getByTestId("upfront-payment-switch");
    this.rateHelperText = page.getByTestId("helper-text");
    this.closeButton = page.getByTestId("CloseIcon");
    this.dialogs = page.locator("[role=dialog]");
    this.paymentFormReceiverAddressTitle = page.getByTestId("receiver-title");
    this.paymentFormSuperTokenTitle = page.getByTestId("token-title");
    this.paymentFormStreamRateTitle = page.getByTestId("stream-rate-title");
    this.paymentFormUpfrontPaymentAmountTitle = page.getByTestId(
      "upfront-payment-title"
    );
  }

  async clickAddPaymentOptionButton() {
    this.addPaymentOptionButton.click();
  }

  async addPartialPaymentOption(
    partialOption: PaymentOption | PartialPaymentOption
  ) {
    await this.paymentTab.click();
    await this.addPaymentOptionFormButton.click();

    if (partialOption.chainId && partialOption.network) {
      this.networkOptions.click();
      await this.page.locator(`[data-value=${partialOption.network}]`).click();
    }
    if (partialOption.flowRate) {
      if (partialOption.userDefinedRate !== true) {
        await this.flowRateOption.fill(partialOption.flowRate);
        if (partialOption.timeUnit != "month") {
          await this.timeUnitSelection.click();
          await this.page
            .locator(`[data-value=${partialOption.timeUnit}]`)
            .click();
        }
      } else {
        await this.userDefinedRateButton.click();
      }
      this.flowRateOption.fill(partialOption.flowRate);
    }
    if (partialOption.network) {
      await this.networkOptions.click();
      await this.page.locator(`[data-value=${partialOption.network}]`).click();
    }
    if (partialOption.receiver) {
      await this.receiverOption.fill(partialOption.receiver);
    }
    if (
      partialOption.superToken &&
      partialOption.chainId &&
      partialOption.network
    ) {
      await this.superTokenOption.click();
      await this.page
        .getByRole("option", { name: partialOption.superToken })
        .click();
    }
    await this.upfrontPaymentSwitch.click();
    if (partialOption.upfrontPayment) {
      await this.upfrontPaymentInputField.fill(partialOption.upfrontPayment);
    }
    this.addPaymentOptionButton.click();
  }

  async enableUpfrontPaymentSwitch() {
    this.upfrontPaymentSwitch.check()
  }

  async validateOptionFormFieldError(field: string) {
    let errorColor = "rgb(210, 37, 37)";
    switch (field) {
      case "network":
      case "chain":
      case "token":
        await expect(this.paymentFormNetworkTitle).toHaveCSS(
          "color",
          errorColor
        );
        let border = await this.networkOptions.evaluate((el) => {
          let style = window.getComputedStyle(el);
          console.log("Border:", style.border);
          console.log("rest:", style);
        });
        await expect(this.paymentFormSuperTokenTitle).toHaveCSS(
          "color",
          errorColor
        );
        //TODO border check

        break;
      case "receiver":
        await expect(this.paymentFormReceiverAddressTitle).toHaveCSS(
          "color",
          errorColor
        );
        break;
      case "flowRate":
        await expect(this.paymentFormStreamRateTitle).toHaveCSS(
          "color",
          errorColor
        );
        break;
      case "upfrontPaymentAmount":
        await expect(this.paymentFormUpfrontPaymentAmountTitle).toHaveCSS(
          "color",
          errorColor
        );
        break;
    }
  }

  async validateNetworksInDropdown() {
    const supportedNetworks = [
      "Arbitrum One",
      "Avalanche",
      "Base",
      "BNB Smart Chain",
      "Celo",
      "Gnosis",
      "OP Mainnet",
      "Polygon",
      "Avalanche Fuji",
      "Base Goerli",
      "Goerli",
      "Polygon Mumbai",
    ];
    for (const [index, network] of supportedNetworks.entries()) {
      await expect(
        this.page.locator(`[data-value="${network}"]`)
      ).toBeVisible();
    }
    await expect(this.page.locator(`[data-value=Ethereum]`)).not.toBeVisible(); // Mainnet disabled at the moment
  }

  async clickPaymentFormNetworkDropdown() {
    await this.networkOptions.click();
  }

  async closeFormWithXButton() {
    await this.closeButton.click();
  }
  async clickDiscardPaymentOptionButton() {
    await this.discardPaymentOption.click();
  }
  async validateAddPaymentFormIsOpen() {
    await expect(this.networkOptions).toBeVisible();
    await expect(this.receiverOption).toBeVisible();
    await expect(this.superTokenOption).toBeVisible();
    await expect(this.fixedRateButton).toBeVisible();
    await expect(this.userDefinedRateButton).toBeVisible();
    await expect(this.flowRateOption).toBeVisible();
  }

  async validateAddPaymentFormIsNotOpen() {
    await expect(this.dialogs).not.toBeVisible();
    await expect(this.networkOptions).not.toBeVisible();
    await expect(this.receiverOption).not.toBeVisible();
    await expect(this.superTokenOption).not.toBeVisible();
    await expect(this.fixedRateButton).not.toBeVisible();
    await expect(this.userDefinedRateButton).not.toBeVisible();
    await expect(this.flowRateOption).not.toBeVisible();
  }

  async removeUsedTestImage() {
    await test.step(`Removing the image set for the widget`, async () => {
      await this.removeImageButton.click();
    });
  }

  async hoverOnWandButtonAndValidateTooltipText(text: string) {
    await test.step(`Hovering on wand button and validating it is saying "${text}"`, async () => {
      await this.wandButton.hover();
      await expect(this.tooltip).toBeVisible();
      await expect(this.tooltip).toHaveText(text);
    });
  }

  async validateRandomProductSectionIsSet() {
    await test.step(`Validating the product name , description and image is randomly set in the builder`, async () => {
      await expect(this.productNameField).not.toHaveValue("");
      await expect(this.productDescriptionField).not.toHaveValue("");
      randomDetailsSet.name = await this.productNameField.inputValue();
      randomDetailsSet.description =
        await this.productDescriptionField.inputValue();
      await expect(this.uploadImageField).not.toBeVisible();
      await expect(this.selectedProductImage).toHaveAttribute(
        "src",
        "https://picsum.photos/200/200"
      );
    });
  }
  async validateProductsTabIsOpen() {
    await test.step(`Checking that products tab components are visible`, async () => {
      await expect(this.backButton).not.toBeVisible();
      await expect(this.productNameField).toBeVisible();
      await expect(this.productDescriptionField).toBeVisible();
      await expect(this.uploadImageField).toHaveCount(1);
      await expect(this.wandButton).toBeVisible();
      await expect(this.nextButton).toBeVisible();
    });
  }

  async clickFooterNextButton() {
    await test.step(`Clicking on the builder footer "Next" button`, async () => {
      await this.nextButton.click();
    });
  }

  async clickAddPaymentOptionFormButton() {
    await this.addPaymentOptionFormButton.click();
  }

  async validatePaymentsTabIsOpen() {
    await test.step(`Checking that payments tab components are visible`, async () => {
      await expect(this.backButton).toBeVisible();
      await expect(this.addPaymentOptionFormButton).toBeVisible();
      await expect(this.paymentOptionCount).toBeVisible();
      await expect(this.summaryDeleteButtons).toBeVisible();
      await expect(this.wandButton).toBeVisible();
      await expect(this.nextButton).toBeVisible();
    });
  }

  async validateUITabIsOpen() {
    await test.step(`Checking that styling tab components are visible`, async () => {
      await expect(this.backButton).toBeVisible();
      await expect(this.darkModeSwitch).toBeVisible();
      await expect(this.containerBorderSlider).toBeVisible();
      await expect(this.fieldBorderSlider).toBeVisible();
      await expect(this.buttonBorderSlider).toBeVisible();
      await expect(this.primaryColorPicker).toBeVisible();
      await expect(this.secondaryColorPicker).toBeVisible();
      await expect(this.fontPicker).toBeVisible();
      await expect(this.stepperPositionVertical).toBeVisible();
      await expect(this.stepperPossitionHorizontal).toBeVisible();
      await expect(this.inlineButton).toBeVisible();
      await expect(this.dialogButton).toBeVisible();
      await expect(this.drawerButton).toBeVisible();
      await expect(this.fullScreenButton).toBeVisible();
      await expect(this.wandButton).toBeVisible();
      await expect(this.nextButton).toBeVisible();
    });
  }

  async validateExportTabIsOpen() {
    await test.step(`Checking that export tab components are visible`, async () => {
      await expect(this.backButton).toBeVisible();
      await expect(this.exportOptions).toBeVisible();
      await expect(this.publishButton).toBeVisible();
      await expect(this.bookDemoButton).toBeVisible();
      await expect(this.wandButton).not.toBeVisible();
      await expect(this.nextButton).not.toBeVisible();
    });
  }

  async clickFooterBackButton() {
    await test.step(`Clicking on the builder footer "Next" button`, async () => {
      await this.backButton.click();
    });
  }
  async uploadInvalidFormatTestImage() {
    await test.step(`Uploading a JSON instead of an image and validating the "not found" element`, async () => {
      await this.uploadImageField.setInputFiles("./data/export.json");
      await expect(this.selectedProductImage).toHaveAttribute(
        "alt",
        "not found"
      );
      const screenshot = await this.selectedProductImage.screenshot();
      await expect(screenshot).toMatchSnapshot(
        "./data/invalidImageUploaded.png"
      );
    });
  }

  async changeDescription(description = "Testing description") {
    await test.step(`Changing the products description to "${description}"`, async () => {
      await this.productDescriptionField.fill(description);
    });
  }

  async clickOnWandButton() {
    await test.step(`Clicking on the magic wand button`, async () => {
      await this.wandButton.click();
    });
  }

  async changeProductName(name = "Testing name") {
    await test.step(`Changing the products name to "${name}"`, async () => {
      await this.productNameField.fill(name);
    });
  }

  async addPaymentOption(paymentOption: PaymentOption | PartialPaymentOption) {
    await test.step(`Adding a new payment option`, async () => {
      this.paymentOptionDuringTest = paymentOption;
      await this.paymentTab.click();
      await this.addPaymentOptionFormButton.click();
      await this.networkOptions.click();
      await this.page.locator(`[data-value=${paymentOption.network}]`).click();
      await this.superTokenOption.click();
      await this.page
        .getByRole("option", { name: paymentOption.superToken })
        .click();
      if (paymentOption.userDefinedRate !== true && paymentOption.flowRate) {
        await this.flowRateOption.fill(paymentOption.flowRate);
        if (paymentOption.timeUnit != "month") {
          await this.timeUnitSelection.click();
          await this.page
            .locator(`[data-value=${paymentOption.timeUnit}]`)
            .click();
        }
      } else {
        await this.userDefinedRateButton.click();
      }

      if (paymentOption.receiver) {
        await this.receiverOption.fill(paymentOption.receiver);
      }
      if (paymentOption.upfrontPayment) {
        await this.upfrontPaymentSwitch.click();
        await this.upfrontPaymentInputField.fill(paymentOption.upfrontPayment);
      }
      await this.addPaymentOptionButton.click();
    });
  }

  async verifyAddedPaymentOptions(paymentOptions: PaymentOption[]) {
    await test.step(`Verifying added payment options`, async () => {
      for (const [index, option] of paymentOptions.entries()) {
        paymentOptions.forEach(async (option: PaymentOption, index: number) => {
          await expect(
            this.summaryNetworks
              .nth(index)
              .getByTestId(`${option.chainId}-badge`)
          ).toBeVisible();
          await expect(this.summaryNetworks.nth(index)).toContainText(
            option.network
          );
          await expect(this.summaryTokens.nth(index)).toHaveText(
            option.superTokenName
          );

          let expectedFlowRateString = option.userDefinedRate
            ? "Stream RateUser-defined"
            : `Stream Rate${option.flowRate} ${option.superToken}/${option.timeUnit}`;
          await expect(this.summaryFlowRate.nth(index)).toHaveText(
            expectedFlowRateString
          );
          await expect(this.summaryReceiver.nth(index)).toContainText(
            `${BasePage.shortenHex(option.receiver)}`,
            { ignoreCase: true }
          );
        });
      }
    });
  }

  async deleteLastAddedPaymentOption() {
    await test.step(`Deleting last payment option`, async () => {
      await this.summaryDeleteButtons.click();
    });
  }

  async openExportTab() {
    await test.step(`Opening Export Tab`, async () => {
      await this.exportTab.click();
    });
  }

  async openStylingTab() {
    await test.step(`Opening Styling Tab`, async () => {
      await this.stylingTab.click();
    });
  }

  async openPaymentTab() {
    await test.step(`Opening Payment Tab`, async () => {
      await this.paymentTab.click();
    });
  }

  async openProductTab() {
    await test.step(`Opening Product Tab`, async () => {
      await this.productTab.click();
    });
  }

  async enableDemoMode() {
    await this.demoModeSwitch.check();
  }

  async disableDemoMode() {
    await this.demoModeSwitch.uncheck();
  }

  async selectIPFSExportOption() {
    await test.step(`Selecting IPFS as the export option`, async () => {
      await this.exportOptions.click();
      await this.exportIPFSOption.click();
    });
  }

  async selectJSONExportOption() {
    await test.step(`Selecting JSON as the export option`, async () => {
      await this.exportOptions.click();
      await this.exportJSONoption.click();
    });
  }

  async publishToIPFS() {
    await test.step(`Publishing the widget to IPFS`, async () => {
      await this.publishButton.click();
    });
  }

  async visitPublishedWidget() {
    await test.step(`Visiting the freshly hosted widget`, async () => {
      await this.goToHostedWidgetButton.click();
    });
  }

  async validateAddedPaymentOptionCount(count: string) {
    await test.step(`Checking if the payment option count is ${count}`, async () => {
      await expect(this.paymentOptionCount).toHaveText(`(${count})`);
    });
  }

  async validateNoPaymentOptionsAddedMessage() {
    await test.step(`Validating the message shown when no options are added`, async () => {
      await expect(this.noOptionsMessage).toHaveText(
        "You haven't added any payment options yet. Add your first one or replace with demo data."
      );
    });
  }

  async chooseExportOption(exportType: string) {
    await test.step(`Choosing ${exportType} as the export option`, async () => {
      await this.exportOptions.click();
      await this.page.locator(`[data-value=${exportType}]`).click();
    });
  }

  async exportWidget(exportType: string) {
    await test.step(`Exporting the widget as ${exportType}`, async () => {
      let buttonToPress =
        exportType === "json" ? this.downloadButton : this.publishButton;
      if (exportType === "json") {
        const downloadPromise = this.page.waitForEvent("download");
        await buttonToPress.click();
        const download = await downloadPromise;
        await download.saveAs("downloads/exportedWidget.json");
      } else {
        await buttonToPress.click();
      }
    });
  }

  async validateIPFSPublishMessage() {
    await test.step(`Validating the message you get after publishing widget to IPFS`, async () => {
      await expect(this.publishedWidgetMessage).toHaveText(
        "Your config is published to IPFS. Test it with our hosted widget:"
      );
    });
  }

  async validateExportedJsonFile() {
    await test.step(`Validating the exported JSON file`, async () => {
      const downloadPath = "./downloads/exportedWidget.json";
      const dataPath = "./data/export.json";
      const downloadedWidgetContents = JSON.parse(
        fs.readFileSync(downloadPath, "utf-8")
      );
      const savedWidgetExportContents = JSON.parse(
        fs.readFileSync(dataPath, "utf-8")
      );
      await expect(downloadedWidgetContents).toEqual(savedWidgetExportContents);
    });
  }

  async uploadTestImage() {
    await test.step(`Uploading the Superfluid logo to the widget`, async () => {
      await this.uploadImageField.setInputFiles("./data/Superfluid_logo.png");
    });
  }
}
