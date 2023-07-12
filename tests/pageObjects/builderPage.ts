import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import fs from "fs";

export class BuilderPage extends BasePage {
  readonly page: Page;
  readonly uiTab: Locator;
  readonly productTab: Locator;
  readonly exportTab: Locator;
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
  paymentOptionDuringTest: PaymentOption | undefined;

  constructor(page: Page) {
    super();
    this.page = page;
    this.uiTab = page.getByTestId("ui-tab");
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
  }

  async changeDescription(description = "Testing description") {
    await this.productDescriptionField.fill(description);
  }

  async changeProductName(name = "Testing name") {
    await this.productNameField.fill(name);
  }

  async addPaymentOption(paymentOption: PaymentOption) {
    this.paymentOptionDuringTest = paymentOption;
    await this.networkOptions.click();
    await this.page.locator(`[data-value=${paymentOption.network}]`).click();
    await this.superTokenOption.click();
    await this.page.getByText(paymentOption.superToken).click();
    await this.flowRateOption.fill(paymentOption.flowRate);
    if (paymentOption.timeUnit != "month") {
      await this.timeUnitSelection.click();
      await this.page.locator(`[data-value=${paymentOption.timeUnit}]`).click();
    }
    await this.receiverOption.fill(paymentOption.receiver);
    // No more option like that
    // if (paymentOption.useAsDefault) {
    //   await this.useAsDefaultPaymentSwitch.click();
    // }
    await this.addPaymentOptionButton.click();
  }

  async verifyAddedPaymentOptions(paymentOptions: PaymentOption[]) {
    for (const [index, option] of paymentOptions.entries()) {
      paymentOptions.forEach(async (option: PaymentOption, index: number) => {
        await expect(this.summaryNetworks.nth(index)).toHaveText(
          option.network
        );
        await expect(this.summaryTokens.nth(index)).toHaveText(
          option.superTokenName
        );
        await expect(this.summaryFlowRate.nth(index)).toHaveText(
          `Stream Rate${option.flowRate} / ${option.timeUnit}`
        );
        await expect(this.summaryReceiver.nth(index)).toContainText(
          `${BasePage.shortenHex(option.receiver)}`,
          { ignoreCase: true }
        );
      });
    }
  }

  async deleteLastAddedPaymentOption() {
    await this.summaryDeleteButtons.click();
  }

  async openExportTab() {
    await this.exportTab.click();
  }

  async openUITab() {
    await this.uiTab.click();
  }

  async openProductTab() {
    await this.productTab.click();
  }

  async enableDemoMode() {
    await this.demoModeSwitch.check();
  }

  async disableDemoMode() {
    await this.demoModeSwitch.uncheck();
  }

  async selectIPFSExportOption() {
    await this.exportOptions.click();
    await this.exportIPFSOption.click();
  }

  async selectJSONExportOption() {
    await this.exportOptions.click();
    await this.exportJSONoption.click();
  }

  async publishToIPFS() {
    await this.publishButton.click();
  }

  async visitPublishedWidget() {
    await this.goToHostedWidgetButton.click();
  }

  async validateAddedPaymentOptionCount(count: string) {
    await expect(this.paymentOptionCount).toHaveText(`Added: ${count}`);
  }

  async validateNoPaymentOptionsAddedMessage() {
    await expect(this.noOptionsMessage).toHaveText("- None");
  }

  async chooseExportOption(exportType: string) {
    await this.exportOptions.click();
    await this.page.locator(`[data-value=${exportType}]`).click();
  }

  async exportWidget(exportType: string) {
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
  }

  async validateIPFSPublishMessage() {
    await expect(this.publishedWidgetMessage).toHaveText(
      "Your config is published to IPFS. Test it with our hosted widget:"
    );
  }

  async validateExportedJsonFile() {
    const downloadPath = "./downloads/exportedWidget.json";
    const dataPath = "./data/export.json";
    const downloadedWidgetContents = JSON.parse(
      fs.readFileSync(downloadPath, "utf-8")
    );
    const savedWidgetExportContents = JSON.parse(
      fs.readFileSync(dataPath, "utf-8")
    );
    await expect(downloadedWidgetContents).toEqual(savedWidgetExportContents);
  }

  async uploadTestImage() {
    await this.uploadImageField.setInputFiles("./data/Superfluid_logo.png");
  }
}
