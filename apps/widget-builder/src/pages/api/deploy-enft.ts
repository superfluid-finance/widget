import {
  ChainId,
  mapTimePeriodToSeconds,
  PaymentOption,
  ProductDetails,
} from "@superfluid-finance/widget";
import { NextApiHandler } from "next";
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

import { superfluidRpcUrls } from "../../superfluidRpcUrls";
import { ExistentialNFTCloneFactoryABI } from "../../types/abi-types";
import { createBaseURI } from "../../utils/baseURI";
import { verifyCaptcha } from "../../utils/captcha";
import { pinNFTImageToIPFS } from "../../utils/pinata";
import rateLimit, { checkRateLimit } from "../../utils/rate-limit";

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
    productDetails,
    selectedPaymentOptions,
    tokenName,
    tokenSymbol,
    contractOwner,
    nftImage,
    recaptchaToken,
  }: {
    productDetails: ProductDetails;
    tokenName: string;
    tokenSymbol: string;
    nftImage: string;
    contractOwner: Address;
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

  const nftImageHash = await pinNFTImageToIPFS({
    tokenName,
    tokenSymbol,
    nftImage,
  });

  const deployConfig = Object.entries(selectedPaymentOptions).map(
    ([chainId, paymentOptions]) => {
      const rpcUrl = superfluidRpcUrls[Number(chainId)];
      if (rpcUrl) {
        throw new Error("Superfluid RPC URL not found.");
      }

      const chain = Object.values(chains).find(
        (chain) => chain.id === Number(chainId) ?? chains.polygonMumbai,
      ) as Chain;

      const contractAddress: Address =
        "0x227a2239Add53F753eA3e201E97608E817B46f38"; // metadata.getNetworkByChainId(chain.id)
      //?.contractsV1.existentialNFTCloneFactory as Address;

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
            abi: ExistentialNFTCloneFactoryABI,
            address: contractAddress,
            publicClient,
            walletClient,
          });

          const cloneArgs = [
            contractOwner,
            paymentOptions.map(({ superToken }) => superToken.address),
            paymentOptions.map(({ receiverAddress }) => receiverAddress),
            paymentOptions.map(
              ({ flowRate }) =>
                parseEther(flowRate!.amountEther) /
                mapTimePeriodToSeconds(flowRate!.period),
            ),
            tokenName,
            tokenSymbol,
            createBaseURI({
              name: productDetails.name,
              description: productDetails.description ?? "",
              chain: chain.id.toString(),
              ipfs: nftImageHash,
            }),
          ] as const;

          const gas = await publicClient.estimateContractGas({
            address: contractAddress,
            abi: ExistentialNFTCloneFactoryABI,
            functionName: "deployClone",
            account,
            args: cloneArgs,
          });

          const hash = await cloneFactory.write.deployClone(cloneArgs, { gas });

          const rc = await publicClient.waitForTransactionReceipt({ hash });

          const { args } = decodeEventLog({
            abi: ExistentialNFTCloneFactoryABI,
            data: rc.logs[0].data,
            topics: rc.logs[0].topics,
          });

          return { [chain.id]: (args as { clone: `0x${string}` }).clone };
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
