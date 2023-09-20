import { expect, Locator, Page, test } from "@playwright/test";
import fs from "fs";

import { BasePage, randomDetailsSet } from "./basePage";

export class BuilderPage extends BasePage {
  readonly page: Page;
  readonly stylingTab: Locator;
  readonly productTab: Locator;
  readonly exportTab: Locator;
  readonly paymentTab: Locator;
  readonly gatingTab: Locator;
  readonly productNameField: Locator;
  readonly productDescriptionField: Locator;
  readonly networkOptions: Locator;
  readonly superTokenOption: Locator;
  readonly flowRateOption: Locator;
  readonly timeUnitSelection: Locator;
  readonly receiverOption: Locator;
  readonly networkOptionsBorder: Locator;
  readonly superTokenOptionBorder: Locator;
  readonly flowRateOptionBorder: Locator;
  readonly timeUnitSelectionBorder: Locator;
  readonly receiverOptionBorder: Locator;
  readonly useAsDefaultPaymentSwitch: Locator;
  readonly addPaymentOptionButton: Locator;
  readonly paymentOptionCount: Locator;
  readonly summaryNetworks: Locator;
  readonly summaryTokens: Locator;
  readonly superTokenOptionsInDropdown: Locator;
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
  readonly shownTooltip: Locator;
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
  readonly upfrontPaymentInputFieldBorder: Locator;
  readonly flowRateTimeUnitBorder: Locator;
  readonly superTokenOptionSymbols: Locator;
  readonly superTokenOptionNames: Locator;
  readonly noOptionsDemoLink: Locator;
  readonly superTokenSelectionXButton: Locator;
  readonly nftSymbolInputField: Locator;
  readonly nftNameInputField: Locator;
  readonly contractOwnerInputField: Locator;
  readonly nftImageInputField?: Locator;
  readonly createNftButton: Locator;
  paymentOptionDuringTest: PaymentOption | PartialPaymentOption | undefined;
  paymentFormFieldWordMap: Map<string, Locator>;

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
    this.superTokenOptionsInDropdown = page.locator(
      "[id*=token-select-option]",
    );
    this.superTokenOptionNames = page.locator(
      "[data-testid=token-selection-name-and-symbol] span:last-of-type",
    );
    this.superTokenOptionSymbols = page.locator(
      "[data-testid=token-selection-name-and-symbol] span:first-of-type",
    );
    this.superTokenSelectionXButton = page.locator(
      "#token-select + div [data-testid=CloseIcon]",
    );
    this.flowRateOption = page
      .getByTestId("flow-rate-input")
      .getByRole("textbox");
    this.timeUnitSelection = page.getByTestId("time-unit-selection");
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
    this.summaryFlowRate = page.getByTestId("stream-rate-added-payment-option");
    this.summaryReceiver = page.getByTestId("added-payment-receiver");
    this.summaryDeleteButtons = page.getByTestId(
      "delete-payment-option-button",
    );
    this.uploadImageField = page.getByTestId("file-upload-field");
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
    this.noOptionsDemoLink = this.noOptionsMessage.locator("span");
    this.paymentTab = page.getByTestId("payment-tab");
    this.addPaymentOptionFormButton = page.getByTestId(
      "add-payment-option-button",
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
    this.shownTooltip = page.locator("[role=tooltip]");
    this.removeImageButton = page.getByTestId("remove-image-button");
    this.paymentFormNetworkTooltip = page.locator(
      "[data-testid=network-title] + [data-testid=tooltip-icon]",
    );
    this.paymentFormNetworkTitle = page.locator("[data-testid=network-title]");
    this.paymentFormReceiverAddressTooltip = page.locator(
      "[data-testid=receiver-title] + [data-testid=tooltip-icon]",
    );
    this.paymentFormSuperTokenTooltip = page.locator(
      "[data-testid=token-title] + [data-testid=tooltip-icon]",
    );
    this.paymentFormStreamRateTooltip = page.locator(
      "[data-testid=stream-rate-title] + [data-testid=tooltip-icon]",
    );
    this.paymentFormUpfrontPaymentAmountTooltip = page.locator(
      "[data-testid=upfront-payment-title] + [data-testid=tooltip-icon]",
    );
    this.paymentFormUpfrontPaymentSwitchTooltip = page.locator(
      "[data-testid=upfront-payment-label] + [data-testid=tooltip-icon]",
    );
    this.fixedRateButton = page.getByTestId("fixed-rate-button");
    this.userDefinedRateButton = page.getByTestId("user-defined-rate-button");
    this.upfrontPaymentInputField = page
      .getByTestId("upfront-payment-amount-input")
      .locator("input");
    this.upfrontPaymentInputFieldBorder = page
      .getByTestId("upfront-payment-amount-input")
      .locator("fieldset");
    this.upfrontPaymentSwitch = page.getByTestId("upfront-payment-switch");
    this.rateHelperText = page.getByTestId("helper-text");
    this.closeButton = page.getByTestId("CloseIcon");
    this.dialogs = page.locator("[role=dialog]");
    this.paymentFormReceiverAddressTitle = page.getByTestId("receiver-title");
    this.paymentFormSuperTokenTitle = page.getByTestId("token-title");
    this.paymentFormStreamRateTitle = page.getByTestId("stream-rate-title");
    this.paymentFormUpfrontPaymentAmountTitle = page.getByTestId(
      "upfront-payment-title",
    );
    this.networkOptionsBorder = page
      .getByTestId("network-selection")
      .locator("fieldset");
    this.superTokenOptionBorder = page
      .locator("#token-select")
      .locator("fieldset");
    this.flowRateOptionBorder = page
      .getByTestId("flow-rate-input")
      .locator("fieldset");
    this.timeUnitSelectionBorder = page
      .getByTestId("time-unit-selection")
      .locator("fieldset");
    this.receiverOptionBorder = page
      .getByTestId("receiver-input-field")
      .locator("fieldset");
    this.flowRateTimeUnitBorder = page
      .getByTestId("time-unit-selection")
      .locator("fieldset");
    this.gatingTab = page.getByTestId("gating-tab");

    this.nftSymbolInputField = page
      .getByTestId("nft-symbol-input-field")
      .locator("input");
    this.nftNameInputField = page
      .getByTestId("nft-name-input-field")
      .locator("input");
    this.contractOwnerInputField = page
      .getByTestId("contract-owner-input-field")
      .locator("input");
    this.createNftButton = page.getByTestId("create-nft-button");

    this.paymentFormFieldWordMap = new Map<string, Locator>([
      ["network", this.networkOptions],
      ["receiver", this.receiverOption],
      ["token", this.superTokenOption],
      ["flowRate", this.flowRateOption],
      ["upfrontPaymentAmount", this.upfrontPaymentInputField],
    ]);
  }

  async validateFixedRateHelperMessage() {
    await test.step(`Validating fixed rate message`, async () => {
      await expect(this.rateHelperText).toHaveText(
        "Fixed rate is a payment type suited for regular subscriptions where users pay a predetermined amount over a given period of time.",
      );
    });
  }
  async validateUserDefinedRateHelperMessage() {
    await test.step(`Validating user defined rate message`, async () => {
      await expect(this.rateHelperText).toHaveText(
        "User-defined rate is a payment type suited for donations where users determine the amount they want to pay over a given period of time.",
      );
    });
  }

  async openGatingTab() {
    await test.step(`Opening Gating Tab`, async () => {
      await this.gatingTab.click();
    });
  }

  async searchAndValidateTokenInDropdown(tokenSymbol: string) {
    await test.step(`Searching for ${tokenSymbol} and making sure it is found in the token dropdown`, async () => {
      await this.superTokenOption.click();
      await this.superTokenOption.type(tokenSymbol);
      await expect(
        (await this.superTokenOptionsInDropdown.all()).length,
      ).toBeGreaterThan(0);
      let allTokenSymbols = await this.superTokenOptionSymbols.all();
      for (let element of allTokenSymbols) {
        await expect(element).toHaveText(tokenSymbol);
      }
    });
  }

  async inputInvalidValuesAndVerifyPaymentFormError(field: string) {
    await test.step(`Inputing a bunch of invalid values and making sure the ${field} field is turning red`, async () => {
      let fieldToInteractWith = this.paymentFormFieldWordMap.get(field);
      await fieldToInteractWith?.type("1e18");
      await this.addPaymentOptionButton.click();
      await this.validateOptionFormFieldError(field);
      await fieldToInteractWith?.clear();
      await fieldToInteractWith?.type(
        "Hello !@£$%^&*() 😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗",
      );
      await this.addPaymentOptionButton.click();
      await this.validateOptionFormFieldError(field);
      await fieldToInteractWith?.clear();
      await fieldToInteractWith?.type("-420");
      await this.addPaymentOptionButton.click();
      await this.validateOptionFormFieldError(field);
      await fieldToInteractWith?.clear();
      await fieldToInteractWith?.type("0");
      await this.addPaymentOptionButton.click();
      await this.validateOptionFormFieldError(field);
    });
  }

  //Tokenlists are in progress, and this will have to be reworked anyways, so keeping it simple and hardcoded for now
  async validateTokensInDropdown(network: string) {
    await test.step(`Checking that tokens shown in the dropdowns are there for Goerli `, async () => {
      type Token = {
        name: string;
        symbol: string;
      };

      const currentlyListedGoerliTokens: Token[] = [
        {
          name: "TDLx",
          symbol: "Super TDL Fake Token",
        },
        {
          name: "SMILE",
          symbol: "Smile Super Token",
        },
        {
          name: "ETHx",
          symbol: "Super ETH",
        },
        {
          name: "ZYA",
          symbol: "Zaya Token",
        },
        {
          name: "fUSDCx",
          symbol: "Super fUSDC Fake Token",
        },
        {
          name: "fTUSDx",
          symbol: "Super fTUSD Fake Token",
        },
        {
          name: "NTDL",
          symbol: "NTDL",
        },
        {
          name: "FUNDx",
          symbol: "Super FUND (Goerli)",
        },
        {
          name: "fDAIx",
          symbol: "Super fDAI Fake Token",
        },
      ];
      await this.superTokenOption.click();
      for (let [index, token] of currentlyListedGoerliTokens.entries()) {
        await expect(this.superTokenOptionNames.nth(index)).toHaveText(
          token.symbol,
        );
        await expect(this.superTokenOptionSymbols.nth(index)).toHaveText(
          token.name,
        );
        //The SVG sometimes loads fuzzy and leads to a breaking test for FUNDx
        let diffRatio = token.name === "FUNDx" ? 0.2 : 0.03;
        await expect(
          this.superTokenOptionsInDropdown.nth(index).locator("img"),
        ).toHaveScreenshot(`./data/${token.name}.png`, {
          maxDiffPixelRatio: diffRatio,
        });
      }
    });
  }

  async hoverAndValidateAllPaymentFormTooltipTexts() {
    await test.step(`Hovering on all payment form tooltips and validating their text`, async () => {
      let tooltipStringMap = new Map<Locator, string>([
        [
          this.paymentFormNetworkTooltip,
          "Select the network you'd like to request payment on.",
        ],
        [
          this.paymentFormReceiverAddressTooltip,
          "Set your wallet or multisig address on the relevant network.",
        ],
        [
          this.paymentFormSuperTokenTooltip,
          "Select the SuperToken you'd like to request payment in.",
        ],
        [
          this.paymentFormStreamRateTooltip,
          "Set the amount of tokens per month for the payment.",
        ],
        [
          this.paymentFormUpfrontPaymentSwitchTooltip,
          "A one-time payment amount to be paid before the stream starts.",
        ],
        [
          this.paymentFormUpfrontPaymentAmountTooltip,
          "The ERC-20 transfer amount the user should send as an upfront payment.",
        ],
      ]);
      for (let testableTooltip of tooltipStringMap.keys()) {
        await testableTooltip.hover();
        await expect(this.shownTooltip.last()).toHaveText(
          tooltipStringMap.get(testableTooltip) as string,
        );
        await testableTooltip.click();
      }
    });
  }

  async validateNoTokenIsSelectedInAddPaymentForm() {
    await test.step(`Making sure no token is selected in the add payment form`, async () => {
      await expect(this.superTokenOption).toHaveText("");
    });
  }
  async clearSelectedTokenWithXButton() {
    await test.step(`Clearing the selected token with the X button`, async () => {
      await this.superTokenOption.hover();
      await this.superTokenSelectionXButton.click();
    });
  }

  async clickAddPaymentOptionButton() {
    await test.step(`Clicking the add payment button`, async () => {
      this.addPaymentOptionButton.click();
    });
  }

  async addPartialPaymentOption(
    partialOption: PaymentOption | PartialPaymentOption,
  ) {
    await test.step(`Adding a partial payment option`, async () => {
      await this.paymentTab.click();
      await this.addPaymentOptionFormButton.click();

      if (partialOption.chainId && partialOption.network) {
        this.networkOptions.click();
        await this.page
          .locator(`[data-value=${partialOption.network}]`)
          .click();
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
        await this.page
          .locator(`[data-value=${partialOption.network}]`)
          .click();
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
      if (!partialOption.userDefinedRate) {
        await this.upfrontPaymentSwitch.click();
      }
      if (partialOption.upfrontPayment) {
        await this.upfrontPaymentInputField.fill(partialOption.upfrontPayment);
      }
    });
  }

  async enableUpfrontPaymentSwitch() {
    await test.step(`Enabling the upfront payment switch`, async () => {
      this.upfrontPaymentSwitch.setChecked(true);
      await expect(this.paymentFormUpfrontPaymentAmountTitle).toBeVisible();
    });
  }

  async validateOptionFormFieldError(field: string) {
    await test.step(`Validating add payment option field error for ${field} field`, async () => {
      let errorColor = "rgb(210, 37, 37)";
      let errorBorder = `1px solid ${errorColor}`;
      let errorElementRegex = new RegExp("Mui-error");
      switch (field) {
        case "network":
        case "chain":
        case "token":
          await expect(this.paymentFormNetworkTitle).toHaveCSS(
            "color",
            errorColor,
          );
          await expect(this.paymentFormNetworkTitle).toHaveClass(
            errorElementRegex,
          );
          await expect(this.networkOptionsBorder).toHaveCSS(
            "border",
            errorBorder,
          );
          await expect(this.paymentFormSuperTokenTitle).toHaveCSS(
            "color",
            errorColor,
          );
          // Uncomment when this is fixed - https://github.com/superfluid-finance/widget/issues/164 , no border around token field if no network is selected
          // await expect(this.superTokenOptionBorder).toHaveCSS(
          //   "border",
          //   errorBorder
          // );
          break;
        case "receiver":
          await expect(this.paymentFormReceiverAddressTitle).toHaveCSS(
            "color",
            errorColor,
          );
          await expect(this.receiverOptionBorder).toHaveCSS(
            "border",
            errorBorder,
          );
          break;
        case "flowRate":
          await expect(this.paymentFormStreamRateTitle).toHaveCSS(
            "color",
            errorColor,
          );
          await expect(this.flowRateOptionBorder).toHaveCSS(
            "border",
            errorBorder,
          );
          await expect(this.flowRateTimeUnitBorder).toHaveCSS(
            "border",
            errorBorder,
          );
          break;
        case "upfrontPaymentAmount":
          await expect(this.paymentFormUpfrontPaymentAmountTitle).toHaveCSS(
            "color",
            errorColor,
          );
          await expect(this.upfrontPaymentInputFieldBorder).toHaveCSS(
            "border",
            errorBorder,
          );
          await expect(this.paymentFormUpfrontPaymentAmountTitle).toHaveCSS(
            "color",
            errorColor,
          );
          await expect(this.upfrontPaymentInputFieldBorder).toHaveCSS(
            "border",
            errorBorder,
          );
          break;
      }
    });
  }

  async validateNetworksInDropdown() {
    await test.step(`Making sure all networks except eth-mainnet are visible in the dropdown`, async () => {
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
          this.page.locator(`[data-value="${network}"]`),
        ).toBeVisible();
      }
      await expect(
        this.page.locator(`[data-value=Ethereum]`),
      ).not.toBeVisible(); // Mainnet disabled at the moment
    });
  }

  async clickPaymentFormNetworkDropdown() {
    await test.step(`Clicking on the payment form network dropdown`, async () => {
      await this.networkOptions.click();
    });
  }

  async clickReplaceWithDemoDatalink() {
    await test.step(`Clicking the demo hyperlink`, async () => {
      await this.noOptionsDemoLink.click();
    });
  }

  async validateGatingTabIsOpen() {
    await test.step(`Validating that gating tab elements are visible`, async () => {
      await expect(this.nftNameInputField).toBeVisible();
      await expect(this.nftSymbolInputField).toBeVisible();
      await expect(this.contractOwnerInputField).toBeVisible();
      await expect(this.backButton).toBeVisible();
      await expect(this.nextButton).not.toBeVisible();
    });
  }

  async closeFormWithXButton() {
    await test.step(`Closing the add payment form with the X button`, async () => {
      await this.closeButton.click();
    });
  }
  async clickDiscardPaymentOptionButton() {
    await test.step(`Clicking the discard button in the payment form`, async () => {
      await this.discardPaymentOption.click();
    });
  }
  async validateAddPaymentFormIsOpen() {
    await test.step(`Making sure add payment form is open and the elements are visible`, async () => {
      await expect(this.networkOptions).toBeVisible();
      await expect(this.receiverOption).toBeVisible();
      await expect(this.superTokenOption).toBeVisible();
      await expect(this.fixedRateButton).toBeVisible();
      await expect(this.userDefinedRateButton).toBeVisible();
      await expect(this.flowRateOption).toBeVisible();
    });
  }

  async validateAddPaymentFormIsNotOpen() {
    await test.step(`Making sure payment form IS NOT OPEN`, async () => {
      await expect(this.dialogs).not.toBeVisible();
      await expect(this.networkOptions).not.toBeVisible();
      await expect(this.receiverOption).not.toBeVisible();
      await expect(this.superTokenOption).not.toBeVisible();
      await expect(this.fixedRateButton).not.toBeVisible();
      await expect(this.userDefinedRateButton).not.toBeVisible();
      await expect(this.flowRateOption).not.toBeVisible();
    });
  }

  async removeUsedTestImage() {
    await test.step(`Removing the image set for the widget`, async () => {
      await this.removeImageButton.click();
    });
  }

  async hoverOnWandButtonAndValidateTooltipText(text: string) {
    await test.step(`Hovering on wand button and validating it is saying "${text}"`, async () => {
      await this.wandButton.hover();
      await expect(this.shownTooltip).toBeVisible();
      await expect(this.shownTooltip).toHaveText(text);
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
        "https://picsum.photos/200/200",
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
    await test.step(`Clicking on the "Add" button to open payment form`, async () => {
      await this.addPaymentOptionFormButton.click();
    });
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
      await expect(this.nextButton).toBeVisible();
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
        "not found",
      );
      await expect(this.selectedProductImage).toHaveScreenshot(
        "./data/invalidImageUploaded.png",
        {
          maxDiffPixelRatio: 0.01,
        },
      );
    });
  }

  async hoverOnFirstAddressInPaymentListAndValidateTooltip() {
    await test.step(`Hovering on the first address and making sure the address shown is correctly`, async () => {
      await this.summaryReceiver
        .first()
        .getAttribute("aria-label")
        .then(async (label) => {
          await this.summaryReceiver.first().hover();
          await expect(this.shownTooltip).toHaveText(label as string);
        });
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

  async selectNetworkForPaymentOption(network: string | undefined) {
    await test.step(`Selecting ${network} as the network for the payment option`, async () => {
      await this.networkOptions.click();
      await this.page.locator(`[data-value=${network}]`).click();
    });
  }

  async addPaymentOption(paymentOption: PaymentOption | PartialPaymentOption) {
    await test.step(`Adding a new payment option`, async () => {
      this.paymentOptionDuringTest = paymentOption;
      await this.paymentTab.click();
      await this.addPaymentOptionFormButton.click();
      await this.selectNetworkForPaymentOption(paymentOption.network);
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
              .getByTestId(`${option.chainId}-badge`),
          ).toBeVisible();
          await expect(this.summaryNetworks.nth(index)).toContainText(
            option.network,
          );
          await expect(this.summaryTokens.nth(index)).toHaveText(
            option.superTokenName,
          );
          //TODO Playwright seems to take the screenshot quite flakily doing 24 +/- 1 by 24 +/- 1 , having wrong resolution fails the test, quite a low priority case IMO, will re-check other options when there is less stuff to do
          // await expect(
          //   this.summaryTokens.nth(index).locator("img")
          // ).toHaveScreenshot(`./data/${option.superToken}.png`,{maxDiffPixelRatio: 0.1});

          let expectedFlowRateString = option.userDefinedRate
            ? "Stream RateUser-defined"
            : `Stream Rate${option.flowRate} ${option.superToken}/${option.timeUnit}`;
          await expect(this.summaryFlowRate.nth(index)).toHaveText(
            expectedFlowRateString,
          );
          await expect(this.summaryReceiver.nth(index)).toContainText(
            `${BasePage.shortenHex(option.receiver)}`,
            { ignoreCase: true },
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
        "You haven't added any payment options yet. Add your first one or replace with demo data.",
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
        "Your config is published to IPFS. Test it with our hosted widget:",
      );
    });
  }

  async validateExportedJsonFile() {
    await test.step(`Validating the exported JSON file`, async () => {
      const downloadPath = "./downloads/exportedWidget.json";
      const dataPath = "./data/export.json";
      const downloadedWidgetContents = JSON.parse(
        fs.readFileSync(downloadPath, "utf-8"),
      );
      const savedWidgetExportContents = JSON.parse(
        fs.readFileSync(dataPath, "utf-8"),
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
