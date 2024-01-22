import { expect, test } from "@playwright/test";
import { ethers } from "ethers";
import fs from "fs";
import {
  BasePage,
  randomDetailsSet,
  randomReceiver,
  supportedNetworks,
} from "./basePage.js";
export class BuilderPage extends BasePage {
  page;
  stylingTab;
  productTab;
  exportTab;
  paymentTab;
  gatingTab;
  productNameField;
  productDescriptionField;
  networkOptions;
  superTokenOption;
  streamRateOption;
  timeUnitSelection;
  receiverOption;
  networkOptionsBorder;
  superTokenOptionBorder;
  flowRateOptionBorder;
  timeUnitSelectionBorder;
  receiverOptionBorder;
  useAsDefaultPaymentSwitch;
  addPaymentOptionButton;
  paymentOptionCount;
  summaryNetworks;
  summaryTokens;
  superTokenOptionsInDropdown;
  summaryFlowRate;
  summaryReceiver;
  summaryDeleteButtons;
  darkModeSwitch;
  containerBorderSlider;
  containerBorderSliderValue;
  fieldBorderSlider;
  fieldBorderSliderValue;
  buttonBorderSlider;
  buttonBorderSliderValue;
  primaryColorPickerTextField;
  secondaryColorPickerTextField;
  fontPicker;
  verticalStepperButton;
  horizontalStepperButton;
  exportOptions;
  exportIPFSOption;
  exportJSONoption;
  publishButton;
  downloadButton;
  demoModeSwitch;
  goToHostedWidgetButton;
  publishedWidgetMessage;
  noOptionsMessage;
  uploadImageField;
  addPaymentOptionFormButton;
  discardPaymentOption;
  wandButton;
  selectedProductImage;
  nextButton;
  backButton;
  inlineButton;
  dialogButton;
  drawerButton;
  fullScreenButton;
  bookDemoButton;
  shownTooltip;
  removeImageButton;
  paymentFormNetworkTooltip;
  paymentFormReceiverAddressTooltip;
  paymentFormSuperTokenTooltip;
  paymentFormStreamRateTooltip;
  paymentFormUpfrontPaymentAmountTooltip;
  paymentFormUpfrontPaymentSwitchTooltip;
  fixedRateButton;
  userDefinedRateButton;
  upfrontPaymentInputField;
  upfrontPaymentSwitch;
  rateHelperText;
  closeButton;
  dialogs;
  paymentFormNetworkTitle;
  paymentFormReceiverAddressTitle;
  paymentFormSuperTokenTitle;
  paymentFormStreamRateTitle;
  paymentFormUpfrontPaymentAmountTitle;
  upfrontPaymentInputFieldBorder;
  flowRateTimeUnitBorder;
  superTokenOptionSymbols;
  superTokenOptionNames;
  noOptionsDemoLink;
  superTokenSelectionXButton;
  nftSymbolInputField;
  nftNameInputField;
  contractOwnerInputField;
  createNftButton;
  colorPickerHueSliderRail;
  colorPickerHueSliderThumb;
  colorPickerAlphaSliderRail;
  colorPickerAlphaSliderThumb;
  colorPallete;
  primaryColorPickerButton;
  secondaryColorPickerButton;
  summaryUpfrontPayment;
  summaryCopyButtons;
  summaryEditButtons;
  paymentOptionContainers;
  gatingNFTSymbolTooltip;
  gatingNFTNameTooltip;
  gatingNFTContractOwnerTooltip;
  gatingNFTImageTooltip;
  jsonEditorButton;
  jsonEditorBackdrop;
  editorErrorMessage;
  editorHoverErrorMessage;
  paymentOptionDuringTest;
  paymentFormFieldWordMap;
  randomReceiverAddress;
  constructor(page) {
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
    this.networkOptions = page.getByTestId("network-selection");
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
    this.streamRateOption = page
      .getByTestId("flow-rate-input")
      .locator("input");
    this.timeUnitSelection = page.getByTestId("time-unit-selection");
    this.receiverOption = page
      .getByTestId("receiver-input-field")
      .locator("input");
    this.useAsDefaultPaymentSwitch = page.getByLabel(
      "Use as default payment option",
    );
    this.addPaymentOptionButton = page.getByTestId("add-option-button");
    this.paymentOptionCount = page.getByTestId("added-payment-options-count");
    this.summaryNetworks = page.getByTestId("added-network-option");
    this.summaryTokens = page.getByTestId("added-token-option");
    this.summaryFlowRate = page.getByTestId("stream-rate-added-payment-option");
    this.summaryReceiver = page.getByTestId("added-payment-receiver");
    this.summaryUpfrontPayment = page.getByTestId(
      "upfront-payment-amount-added-payment-option",
    );
    this.summaryDeleteButtons = page.getByTestId(
      "delete-payment-option-button",
    );
    this.summaryEditButtons = page.getByTestId("edit-payment-option-button");
    this.summaryCopyButtons = page.getByTestId("clone-payment-option-button");
    this.uploadImageField = page.getByTestId("file-upload-field");
    this.darkModeSwitch = page.getByLabel("Dark mode: off");
    this.containerBorderSlider = page.getByTestId("container-radius-slider");
    this.containerBorderSliderValue = page.getByTestId(
      "container-radius-value",
    );
    this.fieldBorderSlider = page.getByTestId("field-border-slider");
    this.fieldBorderSliderValue = page.getByTestId("field-border-radius-value");
    this.buttonBorderSlider = page.getByTestId("button-border-radius-slider");
    this.buttonBorderSliderValue = page.getByTestId("button-border-radius");
    this.primaryColorPickerTextField = page
      .getByTestId("primary-color-picker")
      .getByRole("textbox");
    this.secondaryColorPickerTextField = page
      .getByTestId("secondary-color-picker")
      .getByRole("textbox");
    this.primaryColorPickerButton = page
      .getByTestId("primary-color-picker")
      .locator("button");
    this.secondaryColorPickerButton = page
      .getByTestId("secondary-color-picker")
      .locator("button");
    this.fontPicker = page.getByTestId("font-picker").getByRole("combobox");
    this.verticalStepperButton = page.getByTestId("vertical-stepper-button");
    this.horizontalStepperButton = page.getByTestId(
      "horizontal-stepper-button",
    );
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
    this.colorPickerAlphaSliderRail = page.locator(
      "#color-popover .MuiColorInput-HueSlider .MuiSlider-rail",
    );
    this.colorPickerAlphaSliderThumb = page.locator(
      "#color-popover .MuiColorInput-HueSlider .MuiSlider-rail",
    );
    this.colorPickerHueSliderRail = page.locator(
      "#color-popover .MuiColorInput-HueSlider .MuiSlider-rail",
    );
    this.colorPickerHueSliderThumb = page.locator(
      "#color-popover .MuiColorInput-HueSlider .MuiSlider-thumb",
    );
    this.colorPallete = page.locator(".MuiColorInput-ColorSpace");
    this.paymentOptionContainers = page.getByTestId("payment-option-container");
    this.gatingNFTSymbolTooltip = page
      .getByTestId("nft-symbol-title")
      .locator("+ [data-testid=tooltip-icon]");
    this.gatingNFTNameTooltip = page
      .getByTestId("nft-name-title")
      .locator("+ [data-testid=tooltip-icon]");
    this.gatingNFTContractOwnerTooltip = page
      .getByTestId("contract-owner-title")
      .locator("+ [data-testid=tooltip-icon]");
    this.gatingNFTImageTooltip = page
      .getByTestId("nft-image-title")
      .locator("+ [data-testid=tooltip-icon]");
    this.paymentFormFieldWordMap = new Map([
      ["network", this.networkOptions],
      ["receiver", this.receiverOption],
      ["token", this.superTokenOption],
      ["flowRate", this.streamRateOption],
      ["upfrontPaymentAmount", this.upfrontPaymentInputField],
    ]);
    this.jsonEditorButton = page.getByTestId("json-editor-button");
    this.jsonEditorBackdrop = page.locator(".MuiBackdrop-root");
    this.editorErrorMessage = page.locator(
      "[data-testid=editor-error] .MuiAlert-message",
    );
    this.editorHoverErrorMessage = page.locator(".hover-row .marker span");
  }
  async clickOnTheMiddleOfTheColorPallete() {
    await this.colorPallete.click();
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
  async searchAndValidateTokenInDropdown(tokenSymbol) {
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
  async inputInvalidValuesAndVerifyPaymentFormError(field) {
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
  async validateTokensInDropdown(network) {
    await test.step(`Checking that tokens shown in the dropdowns are there for Goerli `, async () => {
      const currentlyListedGoerliTokens = [
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
      let tooltipStringMap = new Map([
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
      await this.hoverOnTooltipIconAndValidateShownTooltip(tooltipStringMap);
    });
  }
  async hoverAndValidateAllGatingFormTooltipTexts() {
    await test.step(`Hovering on all payment form tooltips and validating their text`, async () => {
      let tooltipStringMap = new Map([
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
      await this.hoverOnTooltipIconAndValidateShownTooltip(tooltipStringMap);
    });
  }
  async hoverAndVerifyAllGatingTabTooltips() {
    await test.step(`Hovering on all payment form tooltips and validating their text`, async () => {
      let tooltipStringMap = new Map([
        [
          this.gatingNFTSymbolTooltip,
          "The Symbol of your NFT. It will be displayed in your users' wallets.",
        ],
        [
          this.gatingNFTNameTooltip,
          "The Name of your NFT. It will be displayed in your users' wallets.",
        ],
        [
          this.gatingNFTContractOwnerTooltip,
          "The address with authority to add further PaymentOptions or deprecate the contract.",
        ],
        [
          this.gatingNFTImageTooltip,
          "The custom artwork for the NFT, which will be displayed in your users' wallets",
        ],
      ]);
      await this.hoverOnTooltipIconAndValidateShownTooltip(tooltipStringMap);
    });
  }
  async hoverOnTooltipIconAndValidateShownTooltip(tooltipStringMap) {
    for (let testableTooltip of tooltipStringMap.keys()) {
      await testableTooltip.hover();
      await expect(this.shownTooltip.last()).toHaveText(
        tooltipStringMap.get(testableTooltip),
      );
      await testableTooltip.click();
    }
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
  async addPartialPaymentOption(partialOption) {
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
          await this.streamRateOption.fill(partialOption.flowRate);
          if (partialOption.timeUnit != "month") {
            await this.timeUnitSelection.click();
            await this.page
              .locator(`[data-value=${partialOption.timeUnit}]`)
              .click();
          }
        } else {
          await this.userDefinedRateButton.click();
        }
        this.streamRateOption.fill(partialOption.flowRate);
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
  async validateOptionFormFieldError(field) {
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
      await expect(this.streamRateOption).toBeVisible();
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
      await expect(this.streamRateOption).not.toBeVisible();
    });
  }
  async removeUsedTestImage() {
    await test.step(`Removing the image set for the widget`, async () => {
      await this.removeImageButton.click();
    });
  }
  async hoverOnWandButtonAndValidateTooltipText(text) {
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
      await expect(this.primaryColorPickerTextField).toBeVisible();
      await expect(this.secondaryColorPickerTextField).toBeVisible();
      await expect(this.fontPicker).toBeVisible();
      await expect(this.verticalStepperButton).toBeVisible();
      await expect(this.horizontalStepperButton).toBeVisible();
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
          maxDiffPixelRatio: 0.02,
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
          await expect(this.shownTooltip).toHaveText(label);
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
  async selectNetworkForPaymentOption(network) {
    await test.step(`Selecting ${network} as the network for the payment option`, async () => {
      await this.networkOptions.click();
      await this.page.locator(`[data-value=${network}]`).click();
    });
  }
  async addPaymentOption(paymentOption) {
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
        await this.streamRateOption.fill(paymentOption.flowRate);
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
  async verifyAddedPaymentOptions(paymentOptions) {
    await test.step(`Verifying added payment options`, async () => {
      for (const [index, option] of paymentOptions.entries()) {
        paymentOptions.forEach(async (option, index) => {
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
          if (option.upfrontPayment) {
            await expect(
              this.paymentOptionContainers
                .nth(index)
                .locator(this.summaryUpfrontPayment),
            ).toHaveText(
              `Upfront Payment Amount${option.upfrontPayment} ${option.superToken}`,
            );
          }
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
  async validateAddedPaymentOptionCount(count) {
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
  async chooseExportOption(exportType) {
    await test.step(`Choosing ${exportType} as the export option`, async () => {
      await this.exportOptions.click();
      await this.page.locator(`[data-value=${exportType}]`).click();
    });
  }
  async exportWidget(exportType) {
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
  async clickInlineViewModeButton() {
    await test.step(`Setting the widget view type to inline`, async () => {
      await this.inlineButton.click();
    });
  }
  async clickDialogViewModeButton() {
    await test.step(`Setting the widget view type to dialog`, async () => {
      await this.dialogButton.click();
    });
  }
  async clickDrawerViewModeButton() {
    await test.step(`Setting the widget view type to drawer`, async () => {
      await this.drawerButton.click();
    });
  }
  async clickFullScreenViewModeButton() {
    await test.step(`Setting the widget view type to full screen`, async () => {
      await this.fullScreenButton.click();
    });
  }
  async enableDarkMode() {
    await test.step(`Enabling dark mode`, async () => {
      await this.darkModeSwitch.check();
    });
  }
  async enableLightMode() {
    await test.step(`Enabling light mode`, async () => {
      await this.darkModeSwitch.uncheck();
    });
  }
  async changeSliderTo(
    page,
    minRadius,
    maxRadius,
    targetRadius,
    thumbLocator,
    sliderRail,
    valueLocator,
    message,
  ) {
    let targetPercentage = (100 / (maxRadius - minRadius)) * targetRadius;
    await BasePage.slideSlider(
      page,
      thumbLocator,
      sliderRail,
      targetPercentage,
    );
    await expect(valueLocator).toHaveText(message);
  }
  async changeBorderRadius(field, targetRadius) {
    await test.step(`Sliding the ${field} field to ${targetRadius}`, async () => {
      let sliderRail;
      let thumbSlider;
      let valueLocator;
      let maxRadius;
      let message;
      let minRadius = 0;
      switch (field.toLowerCase()) {
        case "container":
          sliderRail = this.containerBorderSlider.locator(".MuiSlider-rail");
          thumbSlider = this.containerBorderSlider.locator("input");
          valueLocator = this.containerBorderSliderValue;
          message = `Container border-radius: ${targetRadius}`;
          maxRadius = 50;
          break;
        case "field":
          sliderRail = this.fieldBorderSlider.locator(".MuiSlider-rail");
          thumbSlider = this.fieldBorderSlider.locator("input");
          valueLocator = this.fieldBorderSliderValue;
          message = `Field border-radius: ${targetRadius}`;
          maxRadius = 25;
          break;
        case "button":
          sliderRail = this.buttonBorderSlider.locator(".MuiSlider-rail");
          thumbSlider = this.buttonBorderSlider.locator("input");
          valueLocator = this.buttonBorderSliderValue;
          message = `Button border-radius: ${targetRadius}`;
          maxRadius = 25;
          break;
        default:
          throw new Error(
            `You need to define ${field} field elements to slide those sliders`,
          );
      }
      await this.changeSliderTo(
        this.page,
        minRadius,
        maxRadius,
        targetRadius,
        thumbSlider,
        sliderRail,
        valueLocator,
        message,
      );
    });
  }
  async changePrimaryColorTo(color) {
    await test.step(`Changing the primary color to ${color}`, async () => {
      await this.primaryColorPickerTextField.fill(color);
    });
  }
  async changeSecondaryColorTo(color) {
    await test.step(`Changing the secondary color to ${color}`, async () => {
      await this.secondaryColorPickerTextField.fill(color);
    });
  }
  async changeWidgetFontTo(font) {
    await test.step(`Changing the widget font to ${font}`, async () => {
      await this.fontPicker.click();
      await this.page.getByText(font.replace(/"/g, "")).click();
    });
  }
  async changeStepperToVertical() {
    await test.step(`Clicking on the vertical stepper button`, async () => {
      await this.verticalStepperButton.click();
    });
  }
  async forcefullyChangeStepperToVertical() {
    await test.step(`Forcing a click on the disabled vertical stepper button`, async () => {
      await this.verticalStepperButton.click({ force: true });
    });
  }
  async changeStepperToHorizontal() {
    await test.step(`Clicking on the horizontal stepper button`, async () => {
      await this.horizontalStepperButton.click();
    });
  }
  async openPrimaryColorPicker() {
    await test.step(`Opening primary color picker`, async () => {
      await this.primaryColorPickerButton.click();
    });
  }
  async slideColorPickerHueSliderToMiddle() {
    await test.step(`Sliding the color picker hue slider to middle`, async () => {
      await BasePage.slideSlider(
        this.page,
        this.colorPickerHueSliderThumb,
        this.colorPickerHueSliderRail,
        5,
      );
    });
  }
  async slideColorPickerAlphaSliderToMiddle() {
    await test.step(`Sliding the color picker alpha slider to middle`, async () => {
      await BasePage.slideSlider(
        this.page,
        this.colorPickerAlphaSliderThumb,
        this.colorPickerAlphaSliderRail,
        5,
      );
    });
  }
  async openSecondaryColorPicker() {
    await test.step(`Opening secondary color picker`, async () => {
      await this.secondaryColorPickerButton.click();
    });
  }
  async clickOnNthCopyPaymentOptionButton(index) {
    await test.step(`Clicking on the ${index}th copy payment option button`, async () => {
      await this.summaryCopyButtons.nth(index).click();
    });
  }
  async clickOnNthEditPaymentOptionButton(index) {
    await test.step(`Clicking on the ${index}th edit payment option button`, async () => {
      await this.summaryEditButtons.nth(index).click();
    });
  }
  async verifyPaymentOptionShownInForm(paymentOption) {
    await test.step(`Verifying the payment option shown in the form`, async () => {
      await expect(this.networkOptions.locator("> div")).toContainText(
        paymentOption.network,
      );
      await expect(this.receiverOption).toHaveValue(
        paymentOption.receiver.toLowerCase(),
      );
      await expect(this.superTokenOption).toHaveValue(paymentOption.superToken);
      if (paymentOption.userDefinedRate) {
        await expect(this.streamRateOption).not.toBeVisible();
        await expect(this.upfrontPaymentSwitch).not.toBeVisible();
        await expect(this.upfrontPaymentInputField).not.toBeVisible();
        await expect(this.fixedRateButton).toHaveAttribute(
          "aria-pressed",
          "false",
        );
        await expect(this.userDefinedRateButton).toHaveAttribute(
          "aria-pressed",
          "true",
        );
      } else {
        await expect(this.fixedRateButton).toHaveAttribute(
          "aria-pressed",
          "true",
        );
        await expect(this.userDefinedRateButton).toHaveAttribute(
          "aria-pressed",
          "false",
        );
        await expect(this.streamRateOption).toHaveValue(paymentOption.flowRate);
        await expect(this.timeUnitSelection.locator("div")).toHaveText(
          `/${paymentOption.timeUnit}`,
        );
      }
      if (paymentOption.upfrontPayment) {
        await expect(this.upfrontPaymentInputField).toHaveValue(
          paymentOption.upfrontPayment,
        );
        await expect(this.upfrontPaymentSwitch.locator("input")).toHaveValue(
          "true",
        );
      } else {
        await expect(this.upfrontPaymentInputField).not.toBeVisible();
        await expect(this.upfrontPaymentSwitch.locator("input")).toHaveValue(
          "false",
        );
      }
    });
  }
  async editPaymentOptionFlowRateTo(flowRate) {
    await test.step(`Editing the payment option flow rate to ${flowRate}`, async () => {
      await this.streamRateOption.clear();
      await this.streamRateOption.fill(flowRate);
      await this.addPaymentOptionButton.click();
    });
  }
  async editUpfrontPaymentAmountTo(ethersAmount) {
    await test.step(`Editing the upfront payment amount to ${ethersAmount}`, async () => {
      await this.upfrontPaymentInputField.clear();
      await this.upfrontPaymentInputField.fill(ethersAmount);
      await this.addPaymentOptionButton.click();
    });
  }
  async disableUserDefinedRate() {
    await test.step(`Disabling user defined rate`, async () => {
      await this.fixedRateButton.click();
    });
  }
  async inputNFTDetails(nftDetails) {
    await test.step(`Inputting NFT details`, async () => {
      if (nftDetails.symbol) {
        await this.nftSymbolInputField.fill(nftDetails.symbol);
      }
      if (nftDetails.name) {
        await this.nftNameInputField.fill(nftDetails.name);
      }
      if (nftDetails.owner) {
        await this.contractOwnerInputField.fill(nftDetails.owner);
      }
      if (nftDetails.image) {
        await this.uploadImageField.setInputFiles(nftDetails.image);
      }
      if (nftDetails.networks) {
        const networkNames = Array.isArray(nftDetails.networks)
          ? nftDetails.networks
          : [nftDetails.networks];
        for (const network of networkNames) {
          await this.page.getByTestId(`${network}-checkbox`).click();
        }
      }
    });
  }
  async verifyNetworksShownInNftSelection(networkNames) {
    await test.step(`Verifying networks shown in NFT selection`, async () => {
      for (const network of networkNames) {
        await expect(
          this.page.getByTestId(`${network}-checkbox`),
        ).toBeVisible();
      }
    });
  }
  async clickOnBookADemoAndVerifyPageWasOpen() {
    await test.step(`Clicking on "Book a demo" and verifying page was open`, async () => {
      await BasePage.clickLinkAndVaguelyVerifyOpenedLink(
        this.page,
        this.bookDemoButton,
        "https://use.superfluid.finance/subscriptions",
        "https://airtable.com/appmq3TJDdQUrTQpx/shrJ9Og5dbweZfxB8",
        "Superfluid Subscriptions",
      );
    });
  }
  async editJsonEditorTo(jsonObjectToUse, closeEditor = true) {
    await test.step(`Editing JSON editor to ${jsonObjectToUse}`, async () => {
      const json = JSON.parse(
        fs.readFileSync("data/editorConfigurations.json", "utf-8"),
      );
      let dataToUse;
      if (jsonObjectToUse === "invalidJson") {
        dataToUse = JSON.stringify(json.allNetworks).slice(0, -1);
      } else {
        dataToUse = JSON.stringify(json[jsonObjectToUse]);
      }
      if (jsonObjectToUse === "randomUpfrontPaymentReceiver") {
        let walletToUse = ethers.Wallet.createRandom().address;
        randomReceiver.address = walletToUse;
        json[jsonObjectToUse].paymentDetails.paymentOptions[0].receiverAddress =
          walletToUse;
        dataToUse = JSON.stringify(json[jsonObjectToUse]);
      }
      await this.page.evaluate((data) => {
        window.setEditorValue(data);
      }, dataToUse);
      if (closeEditor) {
        await expect(this.page.getByText("Saved...")).toBeVisible();
        await expect(this.page.getByText("Saved...")).not.toBeVisible();
        await this.jsonEditorBackdrop.click();
      }
    });
  }
  async verifyJsonEditorErrorIsShown() {
    await test.step(`Verifying JSON editor error is shown`, async () => {
      await expect(this.editorErrorMessage).toHaveText("Could not parse JSON");
    });
  }
  async verifyJsonEditorSchemaErrorsAreShown() {
    await test.step(`Verifying JSON editor schema errors are shown`, async () => {
      await expect(this.editorErrorMessage).toHaveText(
        '[ { "code": "invalid_type", "expected": "string", "received": "undefined", "path": [ "productDetails", "name" ], "message": "Required" } ]',
      );
      await expect(this.editorErrorMessage).not.toBeVisible();
      await this.page.getByText("productDetails").hover();
      await expect(this.editorHoverErrorMessage).toBeVisible();
      await expect(this.editorHoverErrorMessage).toHaveText(
        'Missing property "name".',
      );
    });
  }
  async clickOnJsonEditorButton() {
    await test.step(`Clicking on JSON editor button`, async () => {
      await this.jsonEditorButton.click();
      await expect(this.page.getByText("Loading")).not.toBeVisible();
    });
  }
}
//# sourceMappingURL=builderPage.js.map
