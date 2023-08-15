import {
  ChainId,
  mapTimePeriodToSeconds,
  PaymentOption,
} from "@superfluid-finance/widget";
import difference from "lodash/difference";
import { NextApiHandler } from "next";
import { ExistentialNFTCloneFactory__factory } from "stream-gating";
import {
  Address,
  Chain,
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as chains from "viem/chains";

import {
  getNetworkByChainIdOrThrow,
  NetworkNames,
} from "../../networkDefinitions";

const pk = "0xb3fb798d8cc15dac3bcfb791900b745998ea4ae7a28ff9072cffdbb84fd4f161";
const account = privateKeyToAccount(pk);

const contractAddress: Address = "0x20eb33C9f7bF08558b492372B261076E2f8a08D2";

// @ts-ignore polyfill
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const handler: NextApiHandler = async (req, res) => {
  const {
    name,
    symbol,
    image,
    selectedPaymentOptions,
  }: {
    name: string;
    symbol: string;
    image: string;
    selectedPaymentOptions: Partial<Record<NetworkNames, PaymentOption[]>>;
  } = JSON.parse(req.body);

  const deployConfig = Object.entries(selectedPaymentOptions).map(
    ([chainId, paymentOptions]) => {
      const chain = (Object.values(chains).find(
        ({ id }) => Number(chainId) === id,
      ) ?? chains.polygonMumbai) as Chain;
      const rpcUrl = getNetworkByChainIdOrThrow(
        Number(chainId) as ChainId,
      ).rpcUrl;

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
        }) => {
          const cloneFactory = getContract({
            abi: ExistentialNFTCloneFactory__factory.abi,
            address: contractAddress,
            publicClient,
            walletClient,
          });

          const existingClones = await cloneFactory.read.getClones();

          await cloneFactory.write.deployClone([
            paymentOptions.map(({ superToken }) => superToken.address),
            paymentOptions.map(({ receiverAddress }) => receiverAddress),
            paymentOptions.map(
              ({ flowRate }) =>
                parseEther(flowRate!.amountEther) /
                mapTimePeriodToSeconds(flowRate!.period),
            ),
            name,
            symbol,
            image,
          ]);

          const newClones = await cloneFactory.read.getClones();

          return difference(newClones, existingClones);
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
