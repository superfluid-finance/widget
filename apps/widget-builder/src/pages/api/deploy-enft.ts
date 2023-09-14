import {
  ChainId,
  mapTimePeriodToSeconds,
  PaymentOption,
  ProductDetails,
} from "@superfluid-finance/widget";
import metadata from "@superfluid-finance/widget/metadata";
import { NextApiHandler } from "next";
import {
  Address,
  Chain,
  createPublicClient,
  createWalletClient,
  decodeEventLog,
  getContract,
  Hash,
  http,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
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

const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? "";
const account = privateKey
  ? privateKeyToAccount(privateKey as Hash)
  : privateKeyToAccount(
      "0xb3fb798d8cc15dac3bcfb791900b745998ea4ae7a28ff9072cffdbb84fd4f161",
    );

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
    contractOwner: Address;
    selectedPaymentOptions: Partial<Record<ChainId, PaymentOption[]>>;
    recaptchaToken: string;
    nftImage?: string;
  } = JSON.parse(req.body);

  try {
    await checkRateLimit(req, res, limiter.check);
  } catch {
    return res.status(429).json({ error: "Too many requests" });
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
      if (!rpcUrl) {
        throw new Error("Superfluid RPC URL not found.");
      }

      const chain = Object.values(chains).find(
        (chain) => chain.id === Number(chainId) ?? chains.polygonMumbai,
      ) as Chain;

      const contractAddress: Address = metadata.getNetworkByChainId(chain.id)
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
            abi: ExistentialNFTCloneFactoryABI,
            address: contractAddress,
            publicClient,
            walletClient,
          });

          const cloneArgs = [
            contractOwner,
            paymentOptions.map(({ superToken }) => superToken.address),
            paymentOptions.map(({ receiverAddress }) => receiverAddress),
            paymentOptions.map(({ flowRate }) =>
              flowRate
                ? parseEther(flowRate.amountEther) /
                  mapTimePeriodToSeconds(flowRate!.period)
                : BigInt(1),
            ),
            tokenName,
            tokenSymbol,
            createBaseURI({
              name: productDetails.name,
              description: productDetails.description ?? "",
              chain: chain.id.toString(),
              ...(nftImageHash ? { ipfs: nftImageHash } : {}),
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

          return { [chain.id]: (args as { clone: Address }).clone };
        },
      ),
    );

    res.status(200).json({ deployments });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(e) });
  }
};

export default handler;
