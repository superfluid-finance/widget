import { test } from "@playwright/test";

import { BuilderPage } from "../pageObjects/builderPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/builder");
});
test.describe.configure({ mode: "parallel" }); // This will allow describe to run in parallel and be sharded.

test.describe("Gating tab test cases", () => {
  test("Tooltips shown in the gating tab", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openGatingTab();
    await builderPage.hoverAndVerifyAllGatingTabTooltips();
  });

  test("Inputing symbols and emojis in fields and uploading wrong format file does not crash the page", async ({
    page,
  }) => {
    let builderPage = new BuilderPage(page);
    let nftDetails: NFTDetails = {
      symbol: "Yolo420!@£$%^&*()😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗",
      name: "Yolo420!@£$%^&*()😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗",
      owner: "Yolo420!@£$%^&*()😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗",
      image: "./data/export.json",
      networks: ["Goerli"],
    };
    await builderPage.openGatingTab();
    await builderPage.inputNFTDetails(nftDetails);
  });

  test("Networks shown in the NFT selection", async ({ page }) => {
    let builderPage = new BuilderPage(page);
    await builderPage.openPaymentTab();
    await builderPage.clickOnWandButton();
    await builderPage.openGatingTab();
    //TODO Check all networks once I figure out an easy way to import the widget
    await builderPage.verifyNetworksShownInNftSelection([
      "Goerli",
      "Polygon Mumbai",
      "Celo",
    ]);
  });

  // TODO Logic should look pretty much like this, do these cases once the NFT deployment part gets re-worked
  // test("Deploying an NFT with an image", async ({ page }) => {
  //   let nftDetails: NFTDetails = {
  //     symbol:"Test",
  //     name: "Test",
  //     owner: process.env.WIDGET_WALLET_PUBLIC_KEY!,
  //     image: "./data/Superfluid_logo.png",
  //     networks: ["Goerli"]
  //   }
  //   let builderPage = new BuilderPage(page);
  //   await builderPage.openGatingTab();
  //   await builderPage.inputNFTDetails(nftDetails);
  //   await builderPage.clickCreateNFTButton();
  //   await builderPage.verifyNftSuccessScreenIsDisplayed();
  //   await builderPage.openNftSuccessScreenDocumentation();
  //   await builderPage.exportAndValidateNFTAddresses()
  //   await ethHelper.verifyDeployedNFTDetails(nftDetails,paymentOptions.defaultPaymentOption)
  //   await builderPage.clickOnNftSuccessScreenCloseButton();
  //   await builderPage.verifyNftSuccessScreenIsNotDisplayed();
  // });

  // test("Deploying an NFT without an image", async ({ page }) => {
  //   let nftDetails: NFTDetails = {
  //     symbol:"Test",
  //     name: "Test",
  //     owner: process.env.WIDGET_WALLET_PUBLIC_KEY!,
  //     networks: ["Goerli"]
  //   }
  //   let builderPage = new BuilderPage(page);
  //   await builderPage.openGatingTab();
  //   await builderPage.inputNFTDetails(nftDetails)
  //   await builderPage.clickCreateNFTButton();
  //   await builderPage.verifyNftSuccessScreenIsDisplayed();
  //   await ethHelper.verifyDeployedNFTDetails(nftDetails,paymentOptions.defaultPaymentOption)
  // });

  // test("Mocked - deployment api call gets an error ( Deployment failed, reset? button )", async ({ page }) => {
  //   let builderPage = new BuilderPage(page);
  //   await builderPage.openGatingTab();
  //   let nftDetails: NFTDetails = {
  //     symbol:"Test",
  //     name: "Test",
  //     owner: process.env.WIDGET_WALLET_PUBLIC_KEY!,
  //     networks: ["Goerli"]
  //   }
  //   await builderPage.inputNFTDetails(nftDetails)
  //   await builderPage.mockDeploymentApiCallError();
  //   await builderPage.clickCreateNFTButton();
  //   await builderPage.verifyNftDeploymentFailedButtonIsDisplayed();
  //   await builderPage.clickRetryNFTDeployment()
  //   await builderPage.verifyNftSuccessScreenIsDisplayed();
  //   await ethHelper.verifyDeployedNFTDetails(nftDetails,paymentOptions.defaultPaymentOption)});
  //
});
