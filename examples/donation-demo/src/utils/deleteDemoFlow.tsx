import { cfAv1ForwarderABI } from "@superfluid-finance/widget";
import { getContract } from "viem";
import { polygonMumbai } from "wagmi/chains";

import configuration from "@/configuration";

import { demoConfig } from "./connectionUtils";

const { CFAV1ForwarderAddress, Sender, Token } = configuration;

export async function deleteFlow(receiver: `0x${string}`) {
  const publicClient = demoConfig.getPublicClient();
  const walletClient = await demoConfig.connectors[0].getWalletClient({
    chainId: polygonMumbai.id,
  });

  const cfaV1Forwarder = getContract({
    address: CFAV1ForwarderAddress,
    abi: cfAv1ForwarderABI,
    publicClient,
    walletClient,
  });

  const executeDelete = async () => {
    console.info("Flow still ongoing, deleting...");
    const hash = await cfaV1Forwarder.write.deleteFlow([
      Token,
      Sender,
      receiver,
      "0x",
    ]);

    const transaction = await publicClient.waitForTransactionReceipt({
      confirmations: 5,
      hash,
    });

    console.info(`Flow deleted: ${transaction.transactionHash}`);
  };

  try {
    const flow = await cfaV1Forwarder.read.getFlowInfo([
      Token,
      Sender,
      receiver,
    ]);

    if (flow[1] > 0) {
      await executeDelete();
    }
  } catch (e) {
    console.error("Error deleting flow: ", e);
  }
}
