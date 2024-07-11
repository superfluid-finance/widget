import "dotenv/config";

import { defineWalletSetup, MetaMask } from "@synthetixio/synpress";

import { EthHelper } from "../helpers/ethHelper.js";
import { rebounderAddresses } from "../pageObjects/basePage.js";

const SEED_PHRASE =
  "test test test test test test test test test test test junk";
const PASSWORD = "VeryTopSecretPasswordOmgDontSteal";
const opSepolia = {
  symbol: "ETH",
  name: "Optimism Sepolia",
  rpcUrl: "https://rpc-endpoints.superfluid.dev/optimism-sepolia",
  chainId: 11155420,
};

const ethHelper = new EthHelper(
  "Optimism Sepolia",
  process.env.WIDGET_WALLET_PRIVATE_KEY!,
);
await ethHelper.revokeAllowanceIfNeccesary(
  "fUSDCx",
  ethHelper.getTokenBySymbolAndChainId("fUSDC", 11155420).address,
);

//Delete flow before tests, otherwise the widget might not pick it up
await ethHelper.deleteFlowIfNeccesary(
  "fDAIx",
  process.env.WIDGET_WALLET_PUBLIC_KEY!,
  rebounderAddresses["optimism-sepolia"],
);

export default defineWalletSetup(
  PASSWORD,
  async (context: any, walletPage: any) => {
    const metamask = new MetaMask(context, walletPage, PASSWORD);
    await metamask.importWallet(SEED_PHRASE);
    await metamask.addNetwork(opSepolia);
    await metamask.switchNetwork(opSepolia.name);

    await metamask.importWalletFromPrivateKey(
      process.env.WIDGET_WALLET_PRIVATE_KEY!,
    );
  },
);
