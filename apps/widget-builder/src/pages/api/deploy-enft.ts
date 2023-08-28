import metadata from "@superfluid-finance/metadata";
import {
  ChainId,
  mapTimePeriodToSeconds,
  PaymentOption,
} from "@superfluid-finance/widget";
import { NextApiHandler } from "next";
import { ExistentialNFTCloneFactory__factory } from "stream-gating";
import {
  Address,
  Chain,
  createPublicClient,
  createWalletClient,
  decodeEventLog,
  getContract,
  http,
  parseEther,
} from "viem";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import * as chains from "viem/chains";

import { getNetworkByChainIdOrThrow } from "../../networkDefinitions";

const mnemonic = process.env.DEPLOYER_MNEMONIC ?? "";
const pk = process.env.DEPLOYER_PRIVATE_KEY ?? "";
const account = mnemonic
  ? mnemonicToAccount(mnemonic)
  : privateKeyToAccount(
      (pk as `0x${string}`) ??
        "0xb3fb798d8cc15dac3bcfb791900b745998ea4ae7a28ff9072cffdbb84fd4f161",
    );

// @ts-ignore polyfill
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const handler: NextApiHandler = async (req, res) => {
  const {
    tokenName,
    tokenSymbol,
    nftImage,
    selectedPaymentOptions,
  }: {
    tokenName: string;
    tokenSymbol: string;
    nftImage: string;
    selectedPaymentOptions: Partial<Record<ChainId, PaymentOption[]>>;
  } = JSON.parse(req.body);

  const deployConfig = Object.entries(selectedPaymentOptions).map(
    ([chainId, paymentOptions]) => {
      const rpcUrl = getNetworkByChainIdOrThrow(Number(chainId)).rpcUrl;
      const chain = Object.values(chains).find(
        (chain) => chain.id === Number(chainId) ?? chains.polygonMumbai,
      ) as Chain;

      const contractAddress = metadata.getNetworkByChainId(chain.id)
        ?.contractsV1.existentialNFTCloneFactory as Address;

      return {
        paymentOptions,
        contractAddress,
        publicClient: createPublicClient({
          chain,
          transport: http(rpcUrl),
        }),
        walletClient: createWalletClient({
          account,
          chain,
          transport: http(rpcUrl),
        }),
        chain,
      };
    },
  );

  try {
    const deployments = await Promise.all(
      deployConfig.map(
        async ({
          publicClient,
          walletClient,
          contractAddress,
          paymentOptions,
          chain,
        }) => {
          const cloneFactory = getContract({
            abi: ExistentialNFTCloneFactory__factory.abi,
            address: contractAddress,
            publicClient,
            walletClient,
          });

          const cloneArgs = [
            paymentOptions.map(({ superToken }) => superToken.address),
            paymentOptions.map(({ receiverAddress }) => receiverAddress),
            paymentOptions.map(
              ({ flowRate }) =>
                parseEther(flowRate!.amountEther) /
                mapTimePeriodToSeconds(flowRate!.period),
            ),
            tokenName,
            tokenSymbol,
            nftImage,
          ] as const;

          const gas = await publicClient.estimateContractGas({
            address: contractAddress,
            abi: ExistentialNFTCloneFactory__factory.abi,
            functionName: "deployClone",
            account,
            args: cloneArgs,
          });

          const hash = await cloneFactory.write.deployClone(cloneArgs, { gas });

          const rc = await publicClient.waitForTransactionReceipt({ hash });

          const {
            args,
          }: {
            eventName: "ExistentialNFT_CloneDeployed";
            args: { clone: Address };
          } = decodeEventLog({
            abi: ExistentialNFTCloneFactory__factory.abi,
            data: rc.logs[0].data,
            topics: rc.logs[0].topics,
          });

          return { [chain.id]: args.clone };
        },
      ),
    );

    res.status(200).json({ deployments });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "Something went wrong", message: JSON.stringify(e) });
  }
};

export default handler;
