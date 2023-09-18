import {
  ChainId,
  PaymentOption,
  ProductDetails,
} from "@superfluid-finance/widget";
import metadata from "@superfluid-finance/widget/metadata";
import sortBy from "lodash/sortBy";
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
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as chains from "viem/chains";

import { superfluidRpcUrls } from "../../superfluidRpcUrls";
import { ExistentialNFTCloneFactoryABI } from "../../types/abi-types";
import { createBaseURI } from "../../utils/baseURI";
import { verifyCaptcha } from "../../utils/captcha";
import { pinNFTImageToIPFS } from "../../utils/pinata";
import rateLimit, { checkRateLimit } from "../../utils/rate-limit";
import { calculatePerSecondFlowRate } from "../../utils/utils";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const DEFAULT_ACCOUNT =
  "0xb3fb798d8cc15dac3bcfb791900b745998ea4ae7a28ff9072cffdbb84fd4f161";

const DEPLOYMENT_GAS_LIMIT = BigInt(
  Number(process.env.DEPLOYMENT_GAS_LIMIT ?? 800_000),
);

const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? DEFAULT_ACCOUNT;
const account = privateKeyToAccount(privateKey as Hash);

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
    return res
      .status(429)
      .json({ error: "Deployment Failed: Too many requests" });
  }

  try {
    await verifyCaptcha(recaptchaToken);
  } catch {
    return res
      .status(400)
      .json({ error: "Deployment Failed: Invalid recaptcha token" });
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

          const sortedPaymentOptions = sortBy(paymentOptions, ({ flowRate }) =>
            calculatePerSecondFlowRate(flowRate, 1n),
          );

          const cloneArgs = [
            contractOwner,
            sortedPaymentOptions.map(({ superToken }) => superToken.address),
            sortedPaymentOptions.map(({ receiverAddress }) => receiverAddress),
            sortedPaymentOptions.map(({ flowRate }) =>
              calculatePerSecondFlowRate(flowRate, 1n),
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

          if (gas > DEPLOYMENT_GAS_LIMIT) {
            return {
              [chain.id]:
                "Deployment Failed: Gas estimation reached maximum limit, try with less payment options on this network.",
            };
          }

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
    res.status(500).json({
      error: "Deployment Failed: Internal Server Error",
      message: JSON.stringify(e),
    });
  }
};

export default handler;
