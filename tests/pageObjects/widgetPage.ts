import { expect, Locator, Page } from "@playwright/test";
import * as metamask from "@synthetixio/synpress/commands/metamask";
import { BasePage } from "./basePage";

export class WidgetPage extends BasePage {
  readonly page: Page;
  readonly chosenFlowRate: Locator;
  readonly chosenToken: Locator;
  readonly chosenFlowRatePeriod: Locator;
  readonly continueButton: Locator;
  readonly termsLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly wrapUnderlyingBalannce: Locator;
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
  // readonly copyButtons: Locator;
  // readonly selectNetworkDropdown: Locator;
  // readonly selectTokenDropdown: Locator;
  // readonly productDetails: Locator;
  // readonly productDescription: Locator;
  // readonly productName: Locator;
  // readonly poweredBySuperfluidButton: Locator;
  // readonly selectedNetworkBadge: Locator;
  // readonly switchNetworkButton: Locator;
  // readonly transactionProgressBar: Locator;
  // readonly transactionProgressCount: Locator;
  // readonly closeButton: Locator;
  selectedTokenDuringTest: string;
  senderAddressDuringTest: string;
  receiverAddressDuringTest: string;
  wrapAmountDuringTest: string;

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
    this.wrapUnderlyingBalannce = page.getByTestId("underlying-balance");
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
    //Should probobly create a test context class , move to basePage for context or look into playwrights BrowserContext
    this.selectedTokenDuringTest = "";
    this.senderAddressDuringTest = "";
    this.receiverAddressDuringTest = "";
    this.wrapAmountDuringTest = "";
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
    await this.page.getByTestId("network-option").filter().click();
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
        return `Wrap ${this.selectedTokenDuringTest.slice(0, -1)} into ${
          this.selectedTokenDuringTest
        }`;
      case "modify":
        return "Modify Stream";
      case "send":
        return "Send Stream";
      case "approve":
        return `Approve ${this.selectedTokenDuringTest.slice(0, -1)} Allowance`;
    }
  }

  async validateTransactionStatuses(
    transactionList: string[],
    statusList: string[]
  ) {
    //TODO add steps for the transaction counter too
    for (const [index, transaction] of transactionList.entries()) {
      await expect(this.transactionTypes.nth(index)).toHaveText(
        index + 1 + ". " + this.getTransactionTypeString(transaction)
      );
      await expect(this.transactionStatuses.nth(index)).toHaveText(
        statusList[index],
        { timeout: 60000 }
      );
    }
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
      BasePage.shortenHex(this.senderAddressDuringTest)
    );
    await expect(this.receiverAddress.last()).toHaveText(
      BasePage.shortenHex(this.receiverAddressDuringTest)
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
    expect(this.reviewUnderlyingWrapAmount);
  }
}
