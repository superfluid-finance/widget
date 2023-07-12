import { expect, Locator, Page } from "@playwright/test";
import * as metamask from "@synthetixio/synpress/commands/metamask";
import { BasePage } from "./basePage";
import * as EthHelper from "../helpers/ethHelper";

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
  // readonly copyButtons: Locator;
  // readonly selectNetworkDropdown: Locator;
  // readonly selectTokenDropdown: Locator;
  // readonly productDetails: Locator;
  // readonly poweredBySuperfluidButton: Locator;
  // readonly selectedNetworkBadge: Locator;
  // readonly switchNetworkButton: Locator;
  // readonly transactionProgressBar: Locator;
  // readonly transactionProgressCount: Locator;
  // readonly closeButton: Locator;
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
      "[data-testid=wrap-amount-input] input"
    );
    this.wrapAmountMirrorAmount = page.locator(
      "[data-testid=wrap-amount-mirror-amount] input"
    );
    this.whyWrapTokensButton = page.getByTestId("why-wrap-tokens-button");
    this.reviewUnderlyingWrapAmount = page.getByTestId(
      "review-underlying-wrap-amount"
    );
    this.reviewUnderlyingTokenSymbol = page.getByTestId(
      "review-underlying-token-symbol"
    );
    this.reviewSuperTokenAmount = page.getByTestId("review-super-wrap-amount");
    this.reviewSuperTokenSymbol = page.getByTestId("review-super-token-symbol");
    this.successStreamedAmount = page.getByTestId("streamed-amount");
    this.reviewSuperTokenBalanceAndSymbol = page.getByTestId(
      "review-supertoken-balance-and-symbol"
    );
    this.reviewExchangeRate = page.getByTestId("exchange-rate");
    this.receiverAddress = page.getByTestId("receiver-address");
    this.weRecomendMessage = page.getByTestId("we-recommend-message");
    this.senderAddress = page.getByTestId("sender-address");
    this.metamaskWalletButton = page.getByRole("button", {
      name: "MetaMask INSTALLED",
    });
    this.transactionStatuses = page.getByTestId("transaction-status");
    this.transactionTypes = page.getByTestId("transaction-type");
    this.transactionButton = page.getByTestId("transaction-button");
    this.transactionButtonLoadingSpinner = page.locator(
      ".MuiLoadingButton-loadingIndicator"
    );
    this.continueToMerchantButton = page.getByTestId(
      "continue-to-merchant-button"
    );
    this.openSuperfluidDashboard = page.getByTestId("open-dashboard-button");
    this.skipWrapButton = page
      .getByTestId("continue-button")
      .filter({ hasText: "Skip this step" });
    this.productName = page.getByTestId("product-name");
    this.productDescription = page.getByTestId("product-description");
    this.widgetErrorMessage = page.locator(
      "[data-testid=widget-error] .MuiAlert-message"
    );
    this.widgetErrorTitle = page.locator(
      "[data-testid=widget-error] .MuiAlert-message div"
    );
    this.productImage = page.getByTestId("widget-product-image");
    this.transactionCount = page.getByTestId("transaction-count");
    this.transactionCircularProgress = page.getByTestId(
      "transaction-progress-circular-progress"
    );
    this.transactionSpinningProgress = page.getByTestId(
      "spinning-circular-progress"
    );
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async connectWallet() {
    await this.clickContinueButton();
    await this.metamaskWalletButton.click();
    metamask.acceptAccess();
  }

  async selectPaymentNetwork(network: string) {
    await this.networkSelectionButton.click();
    await this.page
      .getByTestId("network-option")
      .filter({ hasText: network })
      .click();
  }

  async selectPaymentToken(token: string) {
    await this.tokenSelectionButton.click();
    await this.page
      .getByTestId("token-option")
      .filter({ hasText: token })
      .click();
    this.selectedTokenDuringTest = token;
  }
  async setWrapAmount(amount: string) {
    this.wrapAmountDuringTest = amount;
    await this.wrapAmountInput.fill(amount);
    await expect(this.wrapAmountMirrorAmount).toHaveValue(amount);
    await expect(this.weRecomendMessage).toBeVisible();
    await expect(this.weRecomendMessage).toHaveText(
      "We recommend wrapping at least 1 month of the subscription amount."
    );
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
          -1
        )} Allowance`;
    }
  }

  async validateTransactionStatuses(
    transactionList: string[],
    statusList: string[]
  ) {
    for (const [index, transaction] of transactionList.entries()) {
      await expect(this.transactionTypes.nth(index)).toHaveText(
        index + 1 + ". " + this.getTransactionTypeString(transaction)
      );
      await expect(this.transactionStatuses.nth(index)).toHaveText(
        statusList[index],
        { timeout: 60000 }
      );
    }
    await this.validateTransactionCounter(statusList);
  }

  async validateTransactionButtonTextAndClick(text: string) {
    await expect(this.transactionButton).toHaveText(
      this.getTransactionTypeString(text)!
    );
    await this.transactionButton.click();
  }

  async validateTransactionButtonLoading() {
    await expect(this.transactionButton).toBeDisabled();
    await expect(this.transactionButtonLoadingSpinner).toBeVisible();
  }

  async acceptMetamaskTransaction() {
    metamask.confirmTransaction("aggressive");
  }

  async acceptMetamaskAllowanceTransaction(allowance: string) {
    metamask.confirmPermissionToSpend(allowance);
  }

  async validateSuccessMessage(flowRatePerMonth: string) {
    const flowRateInWei = parseFloat(flowRatePerMonth) / 2628000;
    await this.successStreamedAmount.isVisible({ timeout: 60000 });
    const amountShownInSuccessScreen =
      await this.successStreamedAmount.innerText();
    const expectedFlowAmountIncrease = flowRateInWei * 2;
    const expectedAmount =
      parseFloat(amountShownInSuccessScreen) + expectedFlowAmountIncrease;
    await this.page.waitForTimeout(2000);
    expect(
      parseFloat(await this.successStreamedAmount.innerText())
    ).toBeGreaterThan(parseFloat(amountShownInSuccessScreen));
    expect(
      parseFloat(await this.successStreamedAmount.innerText())
    ).toBeCloseTo(expectedAmount, flowRateInWei / 1e17);
    await expect(this.senderAddress.last()).toHaveText(
      BasePage.shortenHex(this.senderAddressDuringTest!)
    );
    await expect(this.receiverAddress.last()).toHaveText(
      BasePage.shortenHex(this.receiverAddressDuringTest!)
    );
  }

  async validateAndSaveSenderAndReceiverAddresses(
    sender: string,
    receiver: string
  ) {
    await expect(this.senderAddress).toHaveText(BasePage.shortenHex(sender));
    await expect(this.receiverAddress).toHaveText(
      BasePage.shortenHex(receiver)
    );
    this.senderAddressDuringTest = sender;
    this.receiverAddressDuringTest = receiver;
  }

  async validateWrapReviewAmount(amount: string) {
    await expect(this.reviewUnderlyingWrapAmount).toHaveText(amount);
  }

  async skipWrapStep() {
    await this.skipWrapButton.click();
  }

  async validateProductName(name: string) {
    await expect(this.productName).toHaveText(name);
  }

  async validateProductDescription(description: string) {
    await expect(this.productDescription).toHaveText(description);
  }

  async validateSelectedPaymentOption(option: PaymentOption) {
    await expect(this.chosenFlowRate).toHaveText(option.flowRate);
    await expect(this.chosenToken).toHaveText(option.superToken);
    await expect(this.chosenFlowRatePeriod).toHaveText(
      `per ${option.timeUnit}`
    );
    await expect(
      this.page
        .getByTestId(`selected-option-paper`)
        .getByTestId(`${option.chainId}-badge`)
    ).toBeVisible();
  }

  async validateWidgetNoPaymentOptionsError() {
    await expect(this.widgetErrorTitle).toHaveText("Input Error");
    //TODO validate the message too, playwright returns 17 strings??
    //This will probobly be a nicer message in the future so wont spend time on it for now
  }
  async validateUsedTestImage() {
    const screenshot = await this.productImage.screenshot();
    //Snapshot is saved in specs/specFileName.ts-snapshots
    //Sometimes the rounded edges can show up abit different than the screenshot in different viewports, so the 1% threshold
    await expect(screenshot).toMatchSnapshot("./data/Superfluid_logo.png", {
      maxDiffPixelRatio: 1,
    });
  }

  async validateTransactionCounter(statusList: string[]) {
    if (statusList.length === 1) {
      await expect(this.transactionSpinningProgress).toBeVisible();
      await expect(this.transactionCount).not.toBeVisible();
    } else {
      let completedStatusCount = 0;
      for (const [index, status] of statusList.entries()) {
        if (status === "Completed") {
          completedStatusCount++;
        }
      }
      let progressPercentage =
        completedStatusCount === 0
          ? (4).toString()
          : Math.round(
              (completedStatusCount / statusList.length) * 100
            ).toString();
      await expect(this.transactionCount).toHaveText(
        `${completedStatusCount}/${statusList.length}`
      );
      await expect(this.transactionCircularProgress).toHaveAttribute(
        "aria-valuenow",
        progressPercentage
      );
    }
  }

  async validateTokenBalanceAfterWrap() {
    let wrappedAmount = BigInt(1e18) * BigInt(this.wrapAmountDuringTest!);
    await EthHelper.getUnderlyingTokenBalance().then(
      async (underlyingBalance) => {
        await expect(
          this.underlyingTokenBalanceBeforeWrap! - wrappedAmount
        ).toEqual(underlyingBalance);
      }
    );

    await EthHelper.getSuperTokenBalance().then(async (superTokenBalance) => {
      await expect(this.superTokenBalanceBeforeWrap! + wrappedAmount).toEqual(
        superTokenBalance[0]
      );
    });
  }

  async validateAndSaveWrapPageBalances() {
    await EthHelper.getUnderlyingTokenBalance().then(
      async (underlyingBalance) => {
        this.underlyingTokenBalanceBeforeWrap = underlyingBalance;
        let underlyingBalanceToAssert = BasePage.approximateIfDecimal(
          (underlyingBalance.toString() / 1e18).toString()
        );
        await expect(this.wrapUnderlyingBalance).toHaveText(
          `Balance: ${underlyingBalanceToAssert}`
        );
      }
    );

    await EthHelper.getSuperTokenBalance().then(async (superTokenBalance) => {
      this.superTokenBalanceBeforeWrap = superTokenBalance[0];
      let superTokenBalanceToAssert = BasePage.approximateIfDecimal(
        (superTokenBalance[0].toString() / 1e18).toString()
      );
      await expect(this.wrapSuperTokenBalance).toHaveText(
        `Balance: ${superTokenBalanceToAssert}`
      );
    });
  }
}
