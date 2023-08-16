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
import { privateKeyToAccount } from "viem/accounts";
import * as chains from "viem/chains";

import { getNetworkByChainIdOrThrow } from "../../networkDefinitions";

const pk = "0xb3fb798d8cc15dac3bcfb791900b745998ea4ae7a28ff9072cffdbb84fd4f161";
const account = privateKeyToAccount(pk);

const contractAddress: Address = "0x9b232002da833f4540186191ec230b414110e22b";

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

          const hash = await cloneFactory.write.deployClone([
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
          ]);

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
