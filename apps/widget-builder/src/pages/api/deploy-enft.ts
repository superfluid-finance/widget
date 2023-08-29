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

import { IPFS_GATEWAY } from "../../constants";
import { getNetworkByChainIdOrThrow } from "../../networkDefinitions";
import { verifyCaptcha } from "../../utils/captcha";
import { checkRateLimit } from "../../utils/ip";
import { pinNFTMetaToIPFS } from "../../utils/pinata";
import rateLimit from "../../utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const mnemonic = process.env.DEPLOYER_MNEMONIC ?? "";
const account = mnemonic
  ? mnemonicToAccount(mnemonic)
  : privateKeyToAccount(
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
    recaptchaToken,
  }: {
    tokenName: string;
    tokenSymbol: string;
    nftImage: string;
    selectedPaymentOptions: Partial<Record<ChainId, PaymentOption[]>>;
    recaptchaToken: string;
  } = JSON.parse(req.body);

  try {
    await checkRateLimit(req, res, limiter.check);
  } catch {
    return res.status(429);
  }

  try {
    await verifyCaptcha(recaptchaToken);
  } catch {
    return res.status(400).json({ error: "Invalid recaptcha token" });
  }

  const metaHash = await pinNFTMetaToIPFS({
    tokenName,
    tokenSymbol,
    nftImage,
    selectedPaymentOptions,
  });

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
            `${IPFS_GATEWAY}/ipfs/${metaHash}`,
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
