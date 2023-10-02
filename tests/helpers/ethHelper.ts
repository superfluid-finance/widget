import sfMeta from "@superfluid-finance/metadata";
import { ethers } from "ethers";

import {
  cfAv1ForwarderABI,
  erc20ABI,
  superTokenABI,
} from "./abis/wagmi-generated";

export class EthHelper {
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;
  private extendedSuperTokenList: any;
  private sfMeta: any;

  constructor(
    private networkName: string,
    private privateKey: string,
  ) {
    const rpcUrl =
      "https://rpc-endpoints.superfluid.dev/" +
      this.getNetworkByHumanReadableName(networkName).name;
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.extendedSuperTokenList = null;
    this.sfMeta = null;
  }

  async initialize() {
    this.extendedSuperTokenList = await this.importExtendedSuperTokenList();
    this.sfMeta = await this.importMetadata();
  }

  private async importExtendedSuperTokenList() {
    await import("@superfluid-finance/tokenlist").then((module) => {
      console.log(module);
    });
  }

  private async importMetadata() {
    return await import("@superfluid-finance/metadata");
  }

  public getNetworkByHumanReadableName(name: string) {
    return sfMeta.networks.filter((n) => n.humanReadableName === name)[0];
  }

  public getTokenBySymbolAndChainId(symbol: string, chainId: number) {
    console.log(this.extendedSuperTokenList);
    return this.extendedSuperTokenList.tokens.filter(
      (token: any) => token.symbol === symbol && token.chainId === chainId,
    )[0];
  }

  public getTokenByAddress(address: string) {
    return this.extendedSuperTokenList.tokens.filter(
      (token: any) => token.address === address,
    )[0];
  }

  public getUnderlyingTokenSymbolFromSuperTokenSymbol(
    superTokenSymbol: string,
    networkHumanReadableName: string,
  ) {
    const token = this.getTokenBySymbolAndChainId(
      superTokenSymbol,
      this.getNetworkByHumanReadableName(networkHumanReadableName).chainId,
    );
    const tokenType = token.extensions.superTokenInfo.type;
    if (tokenType === "Pure" || tokenType === "Native Asset") {
      throw new Error(
        "Native assets (Most) and pure tokens don't have underlying tokens amigo",
      );
    }
    if ("underlyingTokenAddress" in token.extensions.superTokenInfo) {
      return this.getTokenByAddress(
        token.extensions.superTokenInfo.underlyingTokenAddress,
      );
    }
  }

  public async revokeAllowanceIfNeccesary(
    tokenSymbol: string,
    contractToRevokeAllowanceTo: string,
  ) {
    let chainId = this.getNetworkByHumanReadableName(this.networkName).chainId;
    const token = new ethers.Contract(
      this.getTokenBySymbolAndChainId(tokenSymbol, chainId).address,
      erc20ABI,
      this.wallet.provider,
    );

    await token
      .allowance(
        process.env.WIDGET_WALLET_PUBLIC_KEY,
        contractToRevokeAllowanceTo,
      )
      .then(async (allowance: bigint) => {
        if (Number(allowance) > 0) {
          console.log("Allowance over 0 , revoking...");
          const data = token.interface.encodeFunctionData("approve", [
            contractToRevokeAllowanceTo,
            0,
          ]);
          const tx = await this.wallet.sendTransaction({
            to: contractToRevokeAllowanceTo,
            from: this.wallet.address,
            data: data,
          });
          await tx.wait().then((receipt) => {
            console.log(`Allowance revoked: ${receipt?.hash}`);
          });
        }
      });
  }

  public async deleteFlowIfNeccesary(
    tokenSymbol: string,
    sender: string,
    receiver: string,
  ) {
    const chainId = this.getNetworkByHumanReadableName(
      this.networkName,
    ).chainId;
    const tokenAddress = this.getTokenBySymbolAndChainId(tokenSymbol, chainId);
    let cfaV1ForwarderAddress = this.getNetworkByHumanReadableName(
      this.networkName,
    ).contractsV1.cfaV1Forwarder;

    const CFAv1Forwarder = new ethers.Contract(
      cfaV1ForwarderAddress,
      cfAv1ForwarderABI,
      this.wallet.provider,
    );
    await CFAv1Forwarder.getFlowInfo(tokenAddress, sender, receiver).then(
      async (flow: bigint[]) => {
        //returns lastUpdated uint256, flowRate int96, deposit uint256, owedDeposit uint256
        if (flow[1] > 0) {
          console.log("Flow still ongoing, deleting...");
          const data = CFAv1Forwarder.interface.encodeFunctionData(
            "deleteFlow",
            [tokenAddress, sender, receiver, "0x"],
          );
          const tx = await this.wallet.sendTransaction({
            to: cfaV1ForwarderAddress,
            from: this.wallet.address,
            data: data,
          });
          await tx.wait().then((receipt) => {
            console.log(`Flow deleted: ${receipt?.hash}`);
          });
        }
      },
    );
  }

  public async getUnderlyingTokenBalance(
    tokenSymbol: string,
    addressToCheckBalanceOf = process.env.WIDGET_WALLET_PUBLIC_KEY,
  ) {
    let chainId = this.getNetworkByHumanReadableName(this.networkName).chainId;
    const token = new ethers.Contract(
      this.getTokenBySymbolAndChainId(tokenSymbol, chainId).address,
      erc20ABI,
      this.wallet.provider,
    );
    return await token.balanceOf(addressToCheckBalanceOf);
  }

  public async getSuperTokenBalance(
    tokenSymbol: string,
    addressToCheckBalanceOf = process.env.WIDGET_WALLET_PUBLIC_KEY,
  ) {
    let chainId = this.getNetworkByHumanReadableName(this.networkName).chainId;
    const token = new ethers.Contract(
      this.getTokenBySymbolAndChainId(tokenSymbol, chainId).address,
      superTokenABI,
      this.wallet.provider,
    );
    return await token.realtimeBalanceOfNow(addressToCheckBalanceOf);
  }
}
