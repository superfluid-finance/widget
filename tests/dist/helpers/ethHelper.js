import sfMeta from "@superfluid-finance/metadata";
import { extendedSuperTokenList } from "@superfluid-finance/tokenlist";
import { ethers } from "ethers";
import {
  cfAv1ForwarderABI,
  erc20ABI,
  superTokenABI,
} from "./abis/wagmi-generated.js";
export class EthHelper {
  wallet;
  provider;
  networkName;
  constructor(networkName, privateKey) {
    const rpcUrl =
      "https://rpc-endpoints.superfluid.dev/" +
      this.getNetworkByHumanReadableName(networkName).name;
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.networkName = networkName;
  }
  getNetworkByHumanReadableName(name) {
    return sfMeta.networks.filter((n) => n.humanReadableName === name)[0];
  }
  getTokenBySymbolAndChainId(symbol, chainId) {
    return extendedSuperTokenList.tokens.filter(
      (token) => token.symbol === symbol && token.chainId === chainId,
    )[0];
  }
  getTokenByAddress(address) {
    return extendedSuperTokenList.tokens.filter(
      (token) => token.address === address,
    )[0];
  }
  async revokeAllowanceIfNeccesary(tokenSymbol, contractToRevokeAllowanceTo) {
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
      .then(async (allowance) => {
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
  async deleteFlowIfNeccesary(tokenSymbol, sender, receiver) {
    const chainId = this.getNetworkByHumanReadableName(
      this.networkName,
    ).chainId;
    const tokenAddress = this.getTokenBySymbolAndChainId(
      tokenSymbol,
      chainId,
    ).address;
    let cfaV1ForwarderAddress = this.getNetworkByHumanReadableName(
      this.networkName,
    ).contractsV1.cfaV1Forwarder;
    const CFAv1Forwarder = new ethers.Contract(
      cfaV1ForwarderAddress,
      cfAv1ForwarderABI,
      this.wallet.provider,
    );
    await CFAv1Forwarder.getFlowInfo(tokenAddress, sender, receiver).then(
      async (flow) => {
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
  async getUnderlyingTokenBalance(
    tokenSymbol,
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
  async getSuperTokenBalance(
    tokenSymbol,
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
//# sourceMappingURL=ethHelper.js.map
