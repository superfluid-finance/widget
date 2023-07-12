import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

type PaymentOption = {
  network: string;
  superToken: string;
  flowRate: string;
  receiver: string;
  useAsDefault: boolean;
};

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
  readonly timeUnitOption: Locator;
  readonly receiverOption: Locator;
  readonly useAsDefaultPaymentSwitch: Locator;
  readonly addPaymentOptionButton: Locator;
  readonly paymentOptionCount: Locator;
  readonly summaryNetworks: Locator;
  readonly summaryTokens: Locator;
  readonly summaryFlowRate: Locator;
  readonly summaryReceiver: Locator;
  readonly summaryDeleteButtons: Locator;
  readonly productImageField: Locator;
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

  constructor(page: Page) {
    super();
    this.page = page;
    this.uiTab = page.getByTestId("ui-tab");
    this.productTab = page.getByTestId("product-tab");
    this.exportTab = page.getByTestId("export-tab");
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
    this.timeUnitOption = page.getByRole("button", { name: "/month" });
    this.receiverOption = page
      .getByTestId("receiver-input-field")
      .getByRole("textbox");
    this.useAsDefaultPaymentSwitch = page.getByLabel(
      "Use as default payment option",
    );
    this.addPaymentOptionButton = page.getByTestId("add-option-button");
    this.paymentOptionCount = page.getByTestId("added-payment-options-count");
    this.summaryNetworks = page.getByTestId("added-network-option");
    this.summaryTokens = page.getByTestId("added-token-option");
    this.summaryFlowRate = page.getByTestId("flow-rate-added-payment-option");
    this.summaryReceiver = page.getByTestId("added-payment-receiver");
    this.summaryDeleteButtons = page.getByTestId(
      "delete-payment-option-button",
    );
    this.productImageField = page.getByRole("button", {
      name: "Optional",
      exact: true,
    });
    this.darkModeSwitch = page.getByLabel("Dark mode: off");
    this.containerBorderSlider = page.getByTestId("container-radius-slider");
    this.containerBorderSliderAmount = page.getByTestId(
      "container-radius-slider-amount",
    );
    this.fieldBorderSlider = page.getByTestId("field-border-slider");
    this.fieldBorderSliderAmount = page.getByTestId(
      "field-border-slider-amount",
    );
    this.buttonBorderSlider = page.getByTestId("button-border-radius-slider");
    this.buttonBorderSliderAmount = page.getByTestId(
      "button-border-radius-amount",
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
    this.exportOptions = page.getByRole("button", {
      name: "Publish to IPFS to get a hosted link",
    });
    this.exportIPFSOption = page.getByRole("option", {
      name: "Publish to IPFS to get a hosted link",
    });
    this.exportJSONoption = page.getByRole("option", { name: "Download JSON" });
    this.publishButton = page.getByTestId("publish-button");
    this.downloadButton = page.getByTestId("download-button");
    this.demoModeSwitch = page.getByLabel("Demo mode");
    this.goToHostedWidgetButton = page.getByTestId("OpenInNewIcon");
  }

  async changeDescription(description = "Testing description") {
    await this.productDescriptionField.fill(description);
  }

  async changeProductName(name = "Testing name") {
    await this.productNameField.fill(name);
  }

  async addPaymentOption(paymentOption: PaymentOption) {
    await this.networkOptions.click();
    await this.page.getByText(paymentOption.network).click();
    await this.superTokenOption.click();
    await this.page.getByText(paymentOption.superToken).click();
    await this.flowRateOption.fill(paymentOption.flowRate);
    await this.receiverOption.fill(paymentOption.receiver);
    if (paymentOption.useAsDefault) {
      await this.useAsDefaultPaymentSwitch.click();
    }
  }

  async verifyAddedPaymentOption(paymentOption: PaymentOption) {
    await expect(this.summaryNetworks).toHaveText(paymentOption.network);
    await expect(this.summaryTokens).toHaveText(paymentOption.superToken);
    await expect(this.summaryFlowRate).toHaveText(paymentOption.flowRate);
    await expect(this.summaryReceiver).toHaveText(paymentOption.receiver);
  }

  async deleteAddedPaymentOption() {
    await this.summaryDeleteButtons.click();
  }

  async openExportTab() {
    this.exportTab.click();
  }

  async openUITab() {
    this.uiTab.click();
  }

  async openProductTab() {
    this.productTab.click();
  }

  async enableDemoMode() {
    this.demoModeSwitch.check();
  }

  async disableDemoMode() {
    this.demoModeSwitch.uncheck();
  }

  async selectIPFSExportOption() {
    this.exportOptions.click();
    this.exportIPFSOption.click();
  }

  async selectJSONExportOption() {
    this.exportOptions.click();
    this.exportJSONoption.click();
  }

  async publishToIPFS() {
    this.publishButton.click();
  }

  async downloadJSONExport() {
    const downloadPromise = this.page.waitForEvent("download");
    this.downloadButton.click();
    const download = await downloadPromise;
    await download.saveAs("/downloads/export.json");
    //TODO: Assert the downloaded json
  }

  async visitPublishedWidget() {
    this.goToHostedWidgetButton.click();
  }
}
