import { expect, Locator, Page, test } from "@playwright/test";
import metamask from "@synthetixio/synpress/commands/metamask.js";

import { EthHelper } from "../helpers/ethHelper.js";
import {
  BasePage,
  randomDetailsSet,
  randomReceiver,
  supportedNetworks,
} from "./basePage.js";

export class WidgetPage extends BasePage {
  readonly page: Page;
  readonly chosenFlowRate: Locator;
  readonly chosenToken: Locator;
  readonly chosenFlowRatePeriod: Locator;
  readonly continueButton: Locator;
  readonly termsLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly wrapUnderlyingBalance: Locator;
  readonly wrapSuperTokenBalance: Locator;
  readonly wrapAmountInput: Locator;
  readonly wrapAmountMirrorAmount: Locator;
  readonly whyWrapTokensButton: Locator;
  readonly reviewUnderlyingWrapAmount: Locator;
  readonly reviewUnderlyingTokenSymbol: Locator;
  readonly reviewSuperTokenAmount: Locator;
  readonly reviewSuperTokenSymbol: Locator;
  readonly reviewSuperTokenBalanceAndSymbol: Locator;
  readonly senderAddress: Locator;
  readonly receiverAddress: Locator;
  readonly networkSelectionButton: Locator;
  readonly tokenSelectionButton: Locator;
  readonly weRecomendMessage: Locator;
  readonly transactionButton: Locator;
  readonly successStreamedAmount: Locator;
  readonly continueToMerchantButton: Locator;
  readonly openSuperfluidDashboard: Locator;
  readonly reviewExchangeRate: Locator;
  readonly metamaskWalletButton: Locator;
  readonly transactionStatuses: Locator;
  readonly transactionTypes: Locator;
  readonly transactionButtonLoadingSpinner: Locator;
  readonly skipWrapButton: Locator;
  readonly productDescription: Locator;
  readonly productName: Locator;
  readonly widgetErrorMessage: Locator;
  readonly widgetErrorTitle: Locator;
  readonly productImage: Locator;
  readonly transactionCount: Locator;
  readonly transactionCircularProgress: Locator;
  readonly transactionSpinningProgress: Locator;
  readonly reviewStepError: Locator;
  readonly switchNetworkButton: Locator;
  readonly customAmountInput: Locator;
  readonly customAmountTimeUnitDropdown: Locator;
  readonly openCheckoutInButton: Locator;
  readonly dialogView: Locator;
  readonly drawerView: Locator;
  readonly fullScreenView: Locator;
  readonly widgetContainer: Locator;
  readonly transactionStatusIcons: Locator;
  readonly circleIcons: Locator;
  readonly checkmarkIcons: Locator;
  readonly transactionTypesAndStatuses: Locator;
  // readonly copyButtons: Locator;
  // readonly productDetails: Locator;
  // readonly selectedNetworkBadge: Locator;
  readonly poweredBySuperfluidButton: Locator;
  readonly closeButton: Locator;
  readonly chosenUpfrontFee: Locator;
  readonly chosenOptionsPaperComponent: Locator;
  readonly networkOptions: Locator;
  readonly tokenOptions: Locator;
  readonly web3ModalConnectionErrorMessage: Locator;
  readonly wrapStepUnderlyingIcon: Locator;
  readonly wrapStepSuperTokenIcon: Locator;
  readonly reviewStepUnderlyingIcon: Locator;
  readonly reviewStepSuperTokenIcon: Locator;
  readonly reviewWrapSuperTokenComponent: Locator;
  readonly reviewWrapUnderlyingTokenComponent: Locator;
  selectedTokenDuringTest?: string;
  senderAddressDuringTest?: string;
  receiverAddressDuringTest?: string;
  wrapAmountDuringTest?: string;
  underlyingTokenBalanceBeforeWrap?: bigint;
  superTokenBalanceBeforeWrap?: bigint;

  constructor(page: Page) {
    super();
    this.page = page;
    this.chosenFlowRate = page.getByTestId("main-token-amount");
    this.chosenToken = page.getByTestId("main-token-selected");
    this.chosenFlowRatePeriod = page.getByTestId("main-flow-rate-period");
    this.continueButton = page.getByTestId("continue-button").first();
    this.termsLink = page.getByTestId("terms-link");
    this.networkSelectionButton = page.getByTestId("widget-network-selection");
    this.tokenSelectionButton = page.getByTestId("token-selection-button");
    this.privacyPolicyLink = page.getByTestId("privacy-link");
    this.wrapUnderlyingBalance = page.getByTestId("underlying-balance");
    this.wrapSuperTokenBalance = page.getByTestId("super-balance");
    this.wrapAmountInput = page.locator(
      "[data-testid=wrap-amount-input] input",
    );
    this.wrapAmountMirrorAmount = page.locator(
      "[data-testid=wrap-amount-mirror-amount] input",
    );
    this.whyWrapTokensButton = page.getByTestId("why-wrap-tokens-button");
    this.reviewUnderlyingWrapAmount = page.getByTestId(
      "review-underlying-wrap-amount",
    );
    this.reviewUnderlyingTokenSymbol = page.getByTestId(
      "review-underlying-token-symbol",
    );
    this.reviewSuperTokenAmount = page.getByTestId("review-super-wrap-amount");
    this.reviewSuperTokenSymbol = page.getByTestId("review-super-token-symbol");
    this.successStreamedAmount = page.getByTestId("streamed-amount");
    this.reviewSuperTokenBalanceAndSymbol = page.getByTestId(
      "review-supertoken-balance-and-symbol",
    );
    this.reviewExchangeRate = page.getByTestId("exchange-rate");
    this.receiverAddress = page.getByTestId("receiver-address");
    this.weRecomendMessage = page.getByTestId("we-recommend-message");
    this.senderAddress = page.getByTestId("sender-address");
    this.metamaskWalletButton = page.getByRole("button", {
      name: "MetaMask INSTALLED",
    });
    this.transactionTypesAndStatuses = page.getByTestId(
      "transaction-type-and-status",
    );
    this.transactionStatuses = page
      .getByTestId("transaction-type-and-status")
      .locator("p");
    this.transactionTypes = page
      .getByTestId("transaction-type-and-status")
      .locator("span");
    this.transactionButton = page.getByTestId("transaction-button");
    this.transactionButtonLoadingSpinner = page.locator(
      ".MuiLoadingButton-loadingIndicator",
    );
    this.continueToMerchantButton = page.getByTestId(
      "continue-to-merchant-button",
    );
    this.openSuperfluidDashboard = page.getByTestId("open-dashboard-button");
    this.skipWrapButton = page
      .getByTestId("continue-button")
      .filter({ hasText: "Skip this step" });
    this.productName = page.getByTestId("product-name");
    this.productDescription = page.getByTestId("product-description");
    this.widgetErrorMessage = page.locator(
      "[data-testid=widget-error] .MuiAlert-message p",
    );
    this.widgetErrorTitle = page.locator(
      "[data-testid=widget-error] .MuiAlert-message div",
    );
    this.productImage = page.getByTestId("widget-product-image");
    this.transactionCount = page.getByTestId("transaction-count");
    this.transactionCircularProgress = page.getByTestId(
      "transaction-progress-circular-progress",
    );
    this.transactionSpinningProgress = page.getByTestId(
      "spinning-circular-progress",
    );
    this.reviewStepError = page.getByTestId("review-error");
    this.switchNetworkButton = page.getByTestId("switch-network-button");
    this.customAmountInput = page
      .getByTestId("custom-flow-rate-input-field")
      .locator("input");
    this.customAmountTimeUnitDropdown = page.getByTestId(
      "custom-time-unit-dropdown",
    );
    this.openCheckoutInButton = page.getByTestId("open-checkout-in-button");
    this.dialogView = page.locator(".MuiDialog-container");
    this.drawerView = page.locator(".MuiDrawer-root[role=presentation]");
    this.fullScreenView = page.locator(".MuiDialog-root[role=presentation]");
    this.closeButton = page.getByTestId("CloseIcon");
    this.widgetContainer = page.locator(".MuiPaper-elevation1.MuiPaper-root");
    this.poweredBySuperfluidButton = page.getByTestId("powered-by-superfluid");
    this.transactionStatusIcons = page.getByTestId("transaction-status-icon");
    this.circleIcons = page.getByTestId("CircleIcon");
    this.checkmarkIcons = page.getByTestId("CheckIcon");
    this.chosenUpfrontFee = page.getByTestId("upfront-fee");
    this.chosenOptionsPaperComponent = page.getByTestId(
      "selected-option-paper",
    );
    this.networkOptions = page.getByTestId("network-option");
    this.tokenOptions = page.getByTestId("token-option");
    this.web3ModalConnectionErrorMessage = page.locator(
      "[data-useid=partial-connector-error-text]",
    );
    this.wrapStepUnderlyingIcon = page
      .getByTestId("underlying-icon")
      .locator("img");
    this.wrapStepSuperTokenIcon = page.getByTestId("super-icon").locator("img");
    this.reviewStepUnderlyingIcon = page
      .getByTestId("review-underlying-icon")
      .locator("img");

    this.reviewStepSuperTokenIcon = page
      .getByTestId("review-super-icon")
      .locator("img");
    this.reviewWrapSuperTokenComponent = page.getByTestId(
      "review-super-wrap-component",
    );
    this.reviewWrapUnderlyingTokenComponent = page.getByTestId(
      "review-underlying-wrap-component",
    );
  }

  async changeCustomPaymentAmount(amount: string, timeunit = "month") {
    await this.customAmountInput.fill(amount);
    if (timeunit !== "month") {
      //Default is month
      this.customAmountTimeUnitDropdown.click();
      this.page.locator(`[data-value=${timeunit}]`).click();
    }
  }

  async validateNoOptionIsSelected() {
    await expect(this.networkSelectionButton.locator("input")).toHaveAttribute(
      "placeholder",
      "Network",
    );
    await expect(this.tokenSelectionButton.locator("input")).toHaveAttribute(
      "placeholder",
      "Token",
    );
    await this.networkSelectionButton
      .getAttribute("value")
      .then(async (value) => {
        await expect(value).toBe(null);
      });
    await this.tokenSelectionButton
      .getAttribute("value")
      .then(async (value) => {
        await expect(value).toBe(null);
      });
  }

  async validateReviewStepIsOpen() {
    await expect(this.reviewExchangeRate).toBeVisible();
    await expect(this.reviewSuperTokenAmount).toBeVisible();
    await expect(this.reviewSuperTokenBalanceAndSymbol).toBeVisible();
    await expect(this.reviewSuperTokenSymbol).toBeVisible();
    await expect(this.reviewUnderlyingTokenSymbol).toBeVisible();
    await expect(this.reviewUnderlyingWrapAmount).toBeVisible();
  }

  async validateNoTestImageIsSet() {
    await test.step(`Validate no image is set in the widget`, async () => {
      await expect(this.productImage).not.toBeVisible();
    });
  }
  async validateRandomProductDetailsIsShown() {
    await test.step(`Make sure the magic wand random details are seen in the widget`, async () => {
      await expect(this.productDescription).toHaveText(
        randomDetailsSet.description,
      );
      await expect(this.productName).toHaveText(randomDetailsSet.name);
      await expect(this.productImage).toBeVisible();
      await expect(this.productImage).toHaveCSS(
        "background-image",
        `url("https://picsum.photos/200/200")`,
      );
    });
  }
  async validateInvalidTestImage() {
    await test.step(`Making sure the widget shows a blank picture if the image format is invalid`, async () => {
      //Snapshot is saved in specs/specFileName.ts-snapshots
      //Sometimes the rounded edges can show up abit different than the screenshot in different viewports, so the 1% threshold
      await expect(this.productImage).toHaveScreenshot(
        "./data/emptyImage.png",
        {
          maxDiffPixelRatio: 0.01,
        },
      );
    });
  }

  async clickContinueButton() {
    await test.step(`Clicking on the continue button`, async () => {
      await this.continueButton.click();
    });
  }

  async connectWallet() {
    await test.step(`Clicking continue button and accepting Metamask access`, async () => {
      await this.clickContinueButton();
      await this.metamaskWalletButton.click();
      await metamask.acceptAccess();
    });
  }

  async selectPaymentNetwork(network: string) {
    await test.step(`Selecting ${network} as the payment network`, async () => {
      await this.networkSelectionButton.click();
      await this.page
        .getByTestId("network-option")
        .filter({ hasText: network })
        .click();
    });
  }

  async selectPaymentToken(token: string) {
    await test.step(`Selecting ${token} as the token used for the payment`, async () => {
      await this.tokenSelectionButton.click();
      await this.page
        .getByTestId("token-option")
        .filter({ hasText: token })
        .click();
      this.selectedTokenDuringTest = token;
    });
  }

  async selectPaymentOption(paymentOption: PaymentOption) {
    await test.step(`Selecting ${paymentOption.flowRate} ${paymentOption.superToken}/${paymentOption.timeUnit} payment option`, async () => {
      await this.selectPaymentNetwork(paymentOption.network);
      let optionString = paymentOption.upfrontPayment
        ? `${paymentOption.upfrontPayment} + ${paymentOption.flowRate} ${paymentOption.superToken}/${paymentOption.timeUnit}`
        : `${paymentOption.flowRate} ${paymentOption.superToken}/${paymentOption.timeUnit}`;
      if (paymentOption.userDefinedRate === true) {
        optionString = `${paymentOption.superToken} - Custom amount`;
      }
      await this.selectPaymentToken(optionString);
    });
  }

  async setWrapAmount(amount: string) {
    await test.step(`Setting the wrap amount to ${amount}`, async () => {
      this.wrapAmountDuringTest = amount;
      await this.wrapAmountInput.fill(amount);
      await expect(this.wrapAmountMirrorAmount).toHaveValue(amount);
      await expect(this.weRecomendMessage).toBeVisible();
      await expect(this.weRecomendMessage).toHaveText(
        "We recommend wrapping at least 3 months of the subscription amount.",
      );
    });
  }

  getTransactionTypeString(type: string) {
    switch (type) {
      case "wrap":
        return `Wrap ${this.selectedTokenDuringTest!.slice(0, -1)} into ${
          this.selectedTokenDuringTest
        }`;
      case "modify":
        return "Modify Stream";
      case "send":
        return "Send Stream";
      case "approve":
        return `Approve ${this.selectedTokenDuringTest!.slice(
          0,
          -1,
        )} Allowance`;
      case "transfer":
        return `Transfer`;
    }
  }

  async validateTransactionStatuses(
    transactionList: string[],
    statusList: string[],
  ) {
    await test.step(`Validating transaction statuses`, async () => {
      for (const [index, transaction] of transactionList.entries()) {
        await expect(
          this.transactionTypesAndStatuses
            .nth(index)
            .locator("span.MuiTypography-root"),
        ).toHaveText(this.getTransactionTypeString(transaction) as string);
        await expect(
          this.transactionTypesAndStatuses.nth(index).locator("p"),
        ).toHaveText(statusList[index], { timeout: 60000 });
      }
      await this.validateTransactionCounterAndIcons(statusList);
    });
  }

  async validateTransactionButtonTextAndClick(text = "Send transaction") {
    await test.step(`Making sure the transaction text is ${text} and clicking it`, async () => {
      await expect(this.transactionButton).toHaveText(text);
      await this.transactionButton.click();
    });
  }

  async validateTransactionButtonLoading() {
    await test.step(`Making sure the transaction button is disabled and a loading spinner is visible`, async () => {
      await expect(this.transactionButton).toBeDisabled();
      await expect(this.transactionButtonLoadingSpinner).toBeVisible();
    });
  }

  async acceptMetamaskTransaction() {
    await test.step(`Accepting Metamask transaction (aggressive)`, async () => {
      metamask.confirmTransaction("aggressive");
    });
  }

  async acceptMetamaskAllowanceTransaction(allowance: string) {
    await test.step(`Giving permission to spend ${allowance} tokens`, async () => {
      metamask.confirmPermissionToSpend(allowance);
    });
  }

  async validateSuccessMessage(flowRatePerMonth: string) {
    await test.step(`Validating that the success message is correctly shown for ${flowRatePerMonth} per month`, async () => {
      const flowRateInWei = parseFloat(flowRatePerMonth) / 2628000;
      await this.successStreamedAmount.isVisible({ timeout: 60000 });
      const amountShownInSuccessScreen =
        await this.successStreamedAmount.innerText();
      const expectedFlowAmountIncrease = flowRateInWei * 2;
      const expectedAmount =
        parseFloat(amountShownInSuccessScreen) + expectedFlowAmountIncrease;
      await this.page.waitForTimeout(2000);
      expect(
        parseFloat(await this.successStreamedAmount.innerText()),
      ).toBeGreaterThan(parseFloat(amountShownInSuccessScreen));
      expect(
        parseFloat(await this.successStreamedAmount.innerText()),
      ).toBeCloseTo(expectedAmount, flowRateInWei / 1e17);
      await expect(this.senderAddress.last()).toHaveText(
        BasePage.shortenHex(this.senderAddressDuringTest!),
      );
      await expect(this.receiverAddress.last()).toHaveText(
        BasePage.shortenHex(this.receiverAddressDuringTest!),
      );
    });
  }

  async validateAndSaveSenderAndReceiverAddresses(
    sender: string,
    receiver: string,
  ) {
    await test.step(`Making sure the sender is ${sender} and receiver is ${receiver}`, async () => {
      await expect(this.senderAddress).toHaveText(BasePage.shortenHex(sender));
      await expect(this.receiverAddress).toHaveText(
        BasePage.shortenHex(receiver),
      );
      this.senderAddressDuringTest = sender;
      this.receiverAddressDuringTest = receiver;
    });
  }

  async validateWrapReviewAmount(amount: string) {
    await test.step(`Making sure the wrap amount in review tab is ${amount}`, async () => {
      await expect(this.reviewUnderlyingWrapAmount).toHaveText(amount);
    });
  }

  async skipWrapStep() {
    await test.step(`Clicking on "Skip this step" button`, async () => {
      await this.skipWrapButton.click();
    });
  }

  async validateProductName(name: string) {
    await test.step(`Making sure the product name shown in the widget is ${name}`, async () => {
      await expect(this.productName).toHaveText(name);
    });
  }

  async validateProductDescription(description: string) {
    await test.step(`Making sure the product description shown in the widget is ${description}`, async () => {
      await expect(this.productDescription).toHaveText(description);
    });
  }

  async validateSelectedPaymentOption(option: PaymentOption) {
    await test.step(`Validating that the selected option is ${option.flowRate} ${option.superToken} per ${option.timeUnit}`, async () => {
      await expect(this.chosenFlowRate).toHaveText(option.flowRate);
      await expect(this.chosenToken).toHaveText(option.superToken);
      await expect(this.chosenFlowRatePeriod).toHaveText(
        `per ${option.timeUnit}`,
      );
      await expect(
        this.page
          .getByTestId(`selected-option-paper`)
          .getByTestId(`${option.chainId}-badge`),
      ).toBeVisible();
      if (option.upfrontPayment) {
        await expect(this.chosenUpfrontFee).toHaveText(
          `+${option.upfrontPayment} ${option.superToken} upfront fee`,
        );
      }
    });
  }

  async validateWidgetNoPaymentOptionsError() {
    await test.step(`Checking if an error is shown in the widget if no payment options are set`, async () => {
      await expect(this.widgetErrorTitle).toHaveText("Input Error");
      //TODO validate the message too, playwright returns 17 strings??
      //This will probobly be a nicer message in the future so wont spend time on it for now
    });
  }
  async validateUsedTestImage() {
    await test.step(`Making sure the Superfluid logo is shown in the widget`, async () => {
      //Snapshot is saved in specs/specFileName.ts-snapshots
      //Sometimes the rounded edges can show up abit different than the screenshot in different viewports, so the 1% threshold
      await expect(this.productImage).toHaveScreenshot(
        "./data/Superfluid_logo.png",
        {
          maxDiffPixelRatio: 0.01,
        },
      );
    });
  }

  async validateTransactionCounterAndIcons(statusList: string[]) {
    await test.step(`Checking if the transaction is correctly shown`, async () => {
      for (const [index, status] of statusList.entries()) {
        if (status === "Ready to send") {
          await expect(
            this.transactionStatusIcons.nth(index).locator(this.circleIcons),
          ).toHaveCSS("color", "rgb(16, 187, 53)");
        }
        if (status === "Queued") {
          await expect(
            this.transactionStatusIcons.nth(index).locator(this.circleIcons),
          ).toHaveCSS("color", "rgba(0, 0, 0, 0.26)");
        }

        if (status === "Transaction sent") {
          await expect(
            this.transactionStatusIcons.nth(index).locator(this.circleIcons),
          ).toHaveCSS("color", "rgb(243, 160, 2)");
          await expect(
            this.transactionTypesAndStatuses
              .nth(index)
              .locator("span.MuiTouchRipple-root"),
          ).toBeVisible();
        }
        if (status === "Completed") {
          await expect(
            this.transactionStatusIcons.nth(index).locator(this.checkmarkIcons),
          ).toHaveCSS("color", "rgb(0, 137, 0)");
          await expect(
            this.transactionTypesAndStatuses
              .nth(index)
              .locator("span.MuiTouchRipple-root"),
          ).toBeVisible();
        }
        if (
          status === "Error" ||
          status === "Estimation error" ||
          status === "Failed"
        ) {
          await expect(
            this.transactionStatusIcons.nth(index).locator(this.circleIcons),
          ).toHaveCSS("color", "rgb(210, 37, 37)");
        }
      }

      await expect(this.transactionCount).toHaveText(
        `Transactions (${statusList.length.toString()})`,
      );
    });
  }

  async validateTokenBalanceAfterWrap() {
    await test.step(`Checking if token got wrapped succesfully`, async () => {
      let wrappedAmount = BigInt(1e18) * BigInt(this.wrapAmountDuringTest!);
      const ethHelper = new EthHelper(
        "Goerli",
        process.env.WIDGET_WALLET_PRIVATE_KEY!,
      );
      await ethHelper
        .getUnderlyingTokenBalance("fUSDC")
        .then(async (underlyingBalance) => {
          await expect(
            this.underlyingTokenBalanceBeforeWrap! - wrappedAmount,
          ).toEqual(underlyingBalance);
        });

      await ethHelper
        .getSuperTokenBalance("fUSDCx")
        .then(async (superTokenBalance) => {
          await expect(
            this.superTokenBalanceBeforeWrap! + wrappedAmount,
          ).toEqual(superTokenBalance[0]);
        });
    });
  }

  async validateAndSaveWrapPageBalances(
    humanReadableNetworkName: string,
    superToken: string,
  ) {
    await test.step(`Checking if wrap page shows correct token balances`, async () => {
      const ethHelper = new EthHelper(
        humanReadableNetworkName,
        process.env.WIDGET_WALLET_PRIVATE_KEY!,
      );
      let underlyingTokenSymbol = ethHelper.getTokenBySymbolAndChainId;
      await ethHelper
        .getUnderlyingTokenBalance("fUSDC")
        .then(async (underlyingBalance) => {
          this.underlyingTokenBalanceBeforeWrap = underlyingBalance;
          let underlyingBalanceToAssert = BasePage.approximateIfDecimal(
            (underlyingBalance.toString() / 1e18).toString(),
          );
          await expect(this.wrapUnderlyingBalance).toBeVisible({
            timeout: 20000,
          });
          await expect(this.wrapUnderlyingBalance).toHaveText(
            `Balance: ${underlyingBalanceToAssert}`,
          );
        });

      await ethHelper
        .getSuperTokenBalance("fUSDCx")
        .then(async (superTokenBalance) => {
          this.superTokenBalanceBeforeWrap = superTokenBalance[0];
          let superTokenBalanceToAssert = BasePage.approximateIfDecimal(
            (superTokenBalance[0].toString() / 1e18).toString(),
          );
          await expect(this.wrapSuperTokenBalance).toHaveText(
            `Balance: ${superTokenBalanceToAssert}`,
          );
        });
    });
  }

  async validateReviewStepError(message: string) {
    await test.step(`Checking the review step error and making sure its disabled`, async () => {
      await expect(this.reviewStepError).toHaveText(message);
      await expect(this.continueButton).toBeDisabled();
    });
  }

  async clickSwitchNetworkButton() {
    await test.step(`Clicking the switch network button`, async () => {
      await expect(this.switchNetworkButton).toBeVisible({ timeout: 30000 });
      await this.switchNetworkButton.click();
    });
  }

  async validateThatWrapAmountInputIs(amount: string) {
    await expect(this.wrapAmountInput).toBeVisible();
    await expect(this.wrapAmountInput).toHaveValue(amount);
    await expect(this.wrapAmountMirrorAmount).toHaveValue(amount);
  }

  async validateInlineWidgetIsVisible() {
    await test.step(`Make sure the inline widget is visible`, async () => {
      await expect(this.widgetContainer).toBeVisible();
      await expect(this.networkSelectionButton).toBeVisible();
      await expect(this.tokenSelectionButton).toBeVisible();
      await expect(this.continueButton).toBeVisible();
      await expect(this.continueButton).toHaveText(
        "Connect Wallet to Continue",
      );
    });
  }
  async clickOnOpenWidgetInButton() {
    await test.step(`Clicking on the "Open checkout in X" button`, async () => {
      await this.openCheckoutInButton.click();
    });
  }
  async validateDialogViewWidgetIsVisible() {
    await test.step(`Making sure the widget is open in a dialog`, async () => {
      await expect(
        this.dialogView.locator(this.networkSelectionButton),
      ).toBeVisible();
      await expect(
        this.dialogView.locator(this.tokenSelectionButton),
      ).toBeVisible();
      await expect(this.dialogView.locator(this.continueButton)).toBeVisible();
      await expect(this.dialogView.locator(this.continueButton)).toHaveText(
        "Connect Wallet to Continue",
      );
    });
  }

  async validateDrawerViewWidgetIsVisible() {
    await test.step(`Making sure the widget is open in a drawer`, async () => {
      await expect(
        this.drawerView.locator(this.networkSelectionButton),
      ).toBeVisible();
      await expect(
        this.drawerView.locator(this.tokenSelectionButton),
      ).toBeVisible();
      await expect(this.drawerView.locator(this.continueButton)).toBeVisible();
      await expect(this.drawerView.locator(this.continueButton)).toHaveText(
        "Connect Wallet to Continue",
      );
    });
  }

  async validateFullScreenViewWidgetIsVisible() {
    await test.step(`Making sure the widget is open in full screen view`, async () => {
      await expect(
        this.fullScreenView.locator(this.networkSelectionButton),
      ).toBeVisible();
      await expect(
        this.fullScreenView.locator(this.tokenSelectionButton),
      ).toBeVisible();
      await expect(
        this.fullScreenView.locator(this.continueButton),
      ).toBeVisible();
      await expect(this.fullScreenView.locator(this.continueButton)).toHaveText(
        "Connect Wallet to Continue",
      );
      await expect(this.fullScreenView.locator(this.closeButton)).toBeVisible();
    });
  }

  async validateDarkModeIsEnabled() {
    await test.step(`Checking if widget background color is dark grey`, async () => {
      await expect(this.widgetContainer).toHaveCSS(
        "background-color",
        "rgb(21, 22, 25)",
      );
    });
  }
  async validateLightModeIsEnabled() {
    await test.step(`Checking if widget background color is white`, async () => {
      await expect(this.widgetContainer).toHaveCSS(
        "background-color",
        "rgb(255, 255, 255)",
      );
    });
  }

  async validateContainerBorderRadiusIs(radius: number) {
    await test.step(`Making sure the widget container border radius is ${radius}`, async () => {
      await expect(this.widgetContainer).toHaveCSS(
        "border-radius",
        `${radius}px`,
      );
    });
  }

  async validateFieldBorderRadiusIs(radius: number) {
    await test.step(`Making sure the widget field border radius is ${radius}`, async () => {
      await expect(
        this.tokenSelectionButton.locator(".MuiInputBase-root"),
      ).toHaveCSS("border-radius", `${radius}px`);
      await expect(
        this.networkSelectionButton.locator(".MuiInputBase-root"),
      ).toHaveCSS("border-radius", `${radius}px`);
    });
  }

  async validateButtonBorderRadiusIs(radius: number) {
    await test.step(`Making sure the widget button border radius is ${radius}`, async () => {
      await expect(this.continueButton.locator("span")).toHaveCSS(
        "border-radius",
        `${radius}px`,
      );
    });
  }
  async validatePrimaryColorIs(color: string) {
    await test.step(`Checking if widgets primary color is ${color}`, async () => {
      await expect(this.continueButton).toHaveCSS("background-color", color);
      await expect(this.page.locator("[data-testid=step-1] circle")).toHaveCSS(
        "color",
        color,
      );
    });
  }
  async validateSecondaryColorIs(color: string) {
    await test.step(`Checking if widgets secondary color is ${color}`, async () => {
      await expect(this.page.locator("[data-testid=step-1] text")).toHaveCSS(
        "fill",
        color,
      );
      await expect(this.page.locator("[data-testid=step-2] text")).toHaveCSS(
        "fill",
        color,
      );
      await expect(this.page.locator("[data-testid=step-3] text")).toHaveCSS(
        "fill",
        color,
      );
    });
  }
  async validateWidgetFontIs(font: string) {
    await test.step(`Making sure the widget uses ${font} as the font`, async () => {
      await expect(this.networkSelectionButton.locator("input")).toHaveCSS(
        "font-family",
        font,
      );
      await expect(this.tokenSelectionButton.locator("input")).toHaveCSS(
        "font-family",
        font,
      );
      await expect(this.continueButton).toHaveCSS("font-family", font);
      await expect(
        this.page.locator("[data-testid=step-1] .MuiStepLabel-label"),
      ).toHaveCSS("font-family", font);
      await expect(
        this.page.locator("[data-testid=step-2] .MuiStepLabel-label"),
      ).toHaveCSS("font-family", font);
      await expect(
        this.page.locator("[data-testid=step-3] .MuiStepLabel-label"),
      ).toHaveCSS("font-family", font);
      await expect(this.page.locator("[data-testid=step-1] text")).toHaveCSS(
        "font-family",
        font,
      );
      await expect(this.page.locator("[data-testid=step-2] text")).toHaveCSS(
        "font-family",
        font,
      );
      await expect(this.page.locator("[data-testid=step-3] text")).toHaveCSS(
        "font-family",
        font,
      );
      await expect(this.poweredBySuperfluidButton).toHaveCSS(
        "font-family",
        font,
      );
      await expect(this.page).toHaveScreenshot(
        `changedFont-${font.replace(/"/g, "")}.png`,
        { maxDiffPixelRatio: 0.01 },
      );
    });
  }

  async validateWidgetStepperIsVertical() {
    await test.step(`Checking if the widget is using vertical stepper`, async () => {
      await expect(
        this.page.locator("[data-testid=step-1] .MuiStepLabel-label"),
      ).toHaveText("Select network and token");
      await expect(
        this.page.locator("[data-testid=step-2] .MuiStepLabel-label"),
      ).toHaveText("Wrap to Super Tokens");
      await expect(
        this.page.locator("[data-testid=step-3] .MuiStepLabel-label"),
      ).toHaveText("Review the transaction(s)");
      await expect(this.widgetContainer).toHaveScreenshot(
        "verticalWidget.png",
        { maxDiffPixelRatio: 0.01 },
      );
    });
  }

  async validateWidgetStepperIsHorizontal() {
    await test.step(`Checking if the widget is using horizontal stepper`, async () => {
      await expect(
        this.page.locator("[data-testid=step-1] .MuiStepLabel-label"),
      ).toHaveText("Network & Token");
      await expect(
        this.page.locator("[data-testid=step-2] .MuiStepLabel-label"),
      ).toHaveText("Wrap");
      await expect(
        this.page.locator("[data-testid=step-3] .MuiStepLabel-label"),
      ).toHaveText("Review");
      await expect(this.widgetContainer).toHaveScreenshot(
        "horizontalWidget.png",
        { maxDiffPixelRatio: 0.01 },
      );
    });
  }

  async validateRandomStylingIsGenerated() {
    await test.step(`Comparing current widgets screenshot with the default one`, async () => {
      await expect(this.widgetContainer).not.toHaveScreenshot(
        "verticalWidget.png",
        { maxDiffPixelRatio: 0.01 },
      );
    });
  }

  async clickFullScreenWidgetCloseButton() {
    await test.step(`Closing the full screen widget view`, async () => {
      await this.fullScreenView.locator(this.closeButton).click();
    });
  }

  async validateOpenWidgetInButtonIsVisible() {
    await test.step(`Making sure the "open widget in x" button is visible`, async () => {
      await expect(this.openCheckoutInButton).toBeVisible();
    });
  }

  async validateWidgetIsNotShown() {
    await test.step(`Making sure the widget preview is not visible`, async () => {
      await expect(this.widgetContainer).not.toBeVisible();
      await expect(this.networkSelectionButton).not.toBeVisible();
      await expect(this.tokenSelectionButton).not.toBeVisible();
      await expect(this.continueButton).not.toBeVisible();
    });
  }
  async verifyDuplicateOptionError() {
    await test.step(`Verifying duplicate option error`, async () => {
      await expect(this.widgetErrorTitle).toHaveText("Input Error");
      await expect(this.widgetErrorMessage).toHaveText(
        `Validation error: Payment options must be unique. Please remove the duplicates. at "paymentDetails.paymentOptions"`,
      );
    });
  }

  async validateAllNetworksAreVisibleInTheWidgetSelection() {
    await test.step(`Validating all networks are visible in the widget selection`, async () => {
      await this.networkSelectionButton.click();
      for (const [index, network] of supportedNetworks.entries()) {
        await expect(
          this.page
            .getByTestId("network-option")
            .getByText(network, { exact: true }),
        ).toBeVisible();
      }
    });
  }

  async clickAndVerifyTermsOfUsePageIsOpen() {
    await test.step(`Clicking on the terms of use link and verifying the page is open`, async () => {
      await BasePage.clickLinkAndVaguelyVerifyOpenedLink(
        this.page,
        this.termsLink,
        "https://www.superfluid.finance/termsofuse/",
        "https://www.superfluid.finance/terms",
        "SUPERFLUID TERMS OF USE",
      );
    });
  }
  async clickAndVerifyPrivacyPolicyPageIsOpen() {
    await test.step(`Clicking on the privacy policy link and verifying the page is open`, async () => {
      await BasePage.clickLinkAndVaguelyVerifyOpenedLink(
        this.page,
        this.privacyPolicyLink,
        "https://www.iubenda.com/privacy-policy/34415583/legal",
        "https://www.iubenda.com/privacy-policy/34415583/legal",
        "Privacy Policy of superfluid.finance",
      );
    });
  }

  async validateRandomReceiverTokenBalanceAfterTransfer(
    network: string,
    token: string,
    expectedBalance: number,
  ) {
    const ethHelper = new EthHelper(
      network,
      process.env.WIDGET_WALLET_PRIVATE_KEY!,
    );
    await ethHelper
      .getSuperTokenBalance(token, randomReceiver.address)
      .then(async (balance) => {
        await expect(balance[0].toString() / 1e18).toEqual(expectedBalance);
      });
  }

  async waitForTransactionsToGetValidated() {
    await expect(this.continueButton).toHaveText("Validating...");
    await expect(this.continueButton).toHaveText("Continue");
  }

  async validateNoProductDetailsAreShown() {
    await expect(this.chosenOptionsPaperComponent).not.toBeVisible();
    await expect(this.chosenFlowRate).not.toBeVisible();
    await expect(this.chosenFlowRatePeriod).not.toBeVisible();
    await expect(this.chosenToken).not.toBeVisible();
    await expect(this.chosenUpfrontFee).not.toBeVisible();
  }

  async clickOnPoweredBySuperfluidAndValidateOpenedLink() {
    await test.step(`Clicking on the powered by superfluid button and verifying the page is open`, async () => {
      await BasePage.clickLinkAndVaguelyVerifyOpenedLink(
        this.page,
        this.poweredBySuperfluidButton,
        "https://superfluid.finance",
        "https://www.superfluid.finance/",
        "Stream money every second.",
      );
    });
  }

  async validateAvailablePaymentOptions(options: PaymentOption[]) {
    const uniqueNetworks = new Set(options.map((option) => option.network));
    for (const network of uniqueNetworks) {
      await this.networkSelectionButton.click();
      await expect(this.networkOptions.getByText(network)).toBeVisible();
      await this.networkOptions.getByText(network).click();
      const networkSpecificOptions = options.filter(
        (option) => option.network === network,
      );
      await this.tokenSelectionButton.click();
      for (const option of networkSpecificOptions) {
        let expectedString;
        if (option.upfrontPayment) {
          expectedString = `${option.upfrontPayment} + ${option.flowRate} ${option.superToken}/${option.timeUnit}`;
        } else if (option.userDefinedRate === true) {
          expectedString = `${option.superToken} - Custom amount`;
        } else {
          expectedString = `${option.flowRate} ${option.superToken}/${option.timeUnit}`;
        }
        await expect(this.tokenOptions.getByText(expectedString)).toBeVisible();
      }
    }
  }

  async validateWeb3ModalDeclinedConnectionError() {
    await expect(this.web3ModalConnectionErrorMessage).toHaveText(
      "Connection declined",
    );
  }
  async clickWeb3ModalMetamaskButton() {
    await this.metamaskWalletButton.click();
  }
  async verifySelectPaymentOptionStepIsVisible() {
    await expect(this.networkSelectionButton).toBeVisible();
    await expect(this.tokenSelectionButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.wrapAmountInput).not.toBeVisible();
  }

  async clickOnStepNumber(step: string) {
    await this.page.getByTestId(`step-${step}`).click();
  }
  async clickTransactionScreenXButton() {
    await this.closeButton.click();
  }

  async validateNoWrapStepIsPresent() {
    await expect(this.page.getByTestId("step-3")).not.toBeVisible();
    await expect(
      this.page.getByTestId("step-2").locator("button span span span"),
    ).toHaveText("Review the transaction(s)");
  }

  async clickNetworkSelectionButton() {
    await this.networkSelectionButton.click();
  }
  async searchForPaymentOptionNetwork(network: string) {
    await this.networkSelectionButton.locator("input").fill(network);
  }
  async validateOnlyNetworksContainingTextAreVisible(network: string) {
    await this.networkOptions.all().then((options) => {
      options.forEach(async (option) => {
        await expect(option).toContainText(network);
      });
    });
  }
  async validateNoOptionsAreShown() {
    await expect(this.networkOptions).not.toBeVisible();
    await expect(this.page.getByText("No options")).toBeVisible();
  }
  async clickTokenSelectionButton() {
    await this.tokenSelectionButton.click();
  }
  async searchForPaymentOptionToken(token: string) {
    await this.tokenSelectionButton.locator("input").fill(token);
  }
  async validateOnlyTokensContainingTextAreVisible(token: string) {
    await this.tokenOptions.all().then((options) => {
      options.forEach(async (option) => {
        await expect(option).toContainText(token);
      });
    });
  }

  async validateTokenIcon(testTokenSymbol: string, element: Locator) {
    await expect(element).toHaveScreenshot(`data-${testTokenSymbol}.png`, {
      maxDiffPixelRatio: 0.11,
    });
  }

  async validateTokenIconInPaymentOptionStep(testTokenSymbol: string) {
    await this.validateTokenIcon(
      testTokenSymbol,
      this.tokenSelectionButton.locator("img"),
    );
  }

  async validateTokenIconsInWrapStep(testTokenSymbol: string) {
    await this.validateTokenIcon(testTokenSymbol, this.wrapStepUnderlyingIcon);
    await this.validateTokenIcon(testTokenSymbol, this.wrapStepSuperTokenIcon);
  }

  async validateTokenIconsInReviewStep(testTokenSymbol: string) {
    await this.validateTokenIcon(
      `review-${testTokenSymbol}`,
      this.reviewWrapSuperTokenComponent,
    );
    await this.validateTokenIcon(
      `review-${testTokenSymbol}`,
      this.reviewWrapUnderlyingTokenComponent,
    );
  }

  async clickWhyDoINeedToWrapTokensAndValidatePageOpen() {
    await BasePage.clickLinkAndVaguelyVerifyOpenedLink(
      this.page,
      this.whyWrapTokensButton,
      "https://help.superfluid.finance/en/articles/7969656-why-do-i-need-to-wrap-tokens",
      "https://help.superfluid.finance/en/articles/7969656-why-do-i-need-to-wrap-tokens",
      "Why do I need to wrap tokens?",
    );
  }
}
