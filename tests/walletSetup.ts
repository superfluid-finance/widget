import { test as base, chromium, type BrowserContext } from "@playwright/test";
import { initialSetup } from "@synthetixio/synpress/commands/metamask";
import { prepareMetamask } from "@synthetixio/synpress/helpers";
import * as ethHelper from "./helpers/ethHelper";

export const test = base.extend<{
  context: BrowserContext;
}>({
  context: async ({}, use) => {
    // required for synpress
    //@ts-ignore
    global.expect = expect;
    // download metamask
    const metamaskPath = await prepareMetamask(
      process.env.METAMASK_VERSION || "10.25.0"
    );
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      "--remote-debugging-port=9222",
    ];
    if (process.env.CI) {
      browserArgs.push("--disable-gpu");
    }
    if (process.env.HEADLESS_MODE) {
      browserArgs.push("--headless=new");
    }
    // launch browser
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: browserArgs,
    });
    context.setDefaultTimeout(30000);
    // wait for metamask
    await context.pages()[0].waitForTimeout(3000);
    //Revoke allowance before tests, otherwise the widget does not pick it u
    await ethHelper.revokeAllowanceIfNeccesary();
    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: process.env.WIDGET_WALLET_PRIVATE_KEY,
      network: "goerli",
      password: "Tester@1234",
      enableAdvancedSettings: false,
      enableExperimentalSettings: false,
    });
    await use(context);
    await context.close();
  },
});
export const expect = test.expect;
