import { cfAv1ForwarderABI } from "@superfluid-finance/widget";
import { getContract } from "viem";
import { polygonMumbai } from "wagmi/chains";

import { wagmiConfigDemo } from "../DEMO-wagmi";

const CFAV1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const fUSDCxAddress = "0x42bb40bf79730451b11f6de1cba222f17b87afd7";

const sender = "0xab1D164065aed9A3e42fca42c2c20997f369A2B0";
const receiver = "0xa80bc03d75b2F2519a669a1A2740827b5BA17625";

export async function deleteFlow() {
  const publicClient = wagmiConfigDemo.getPublicClient();
  const walletClient = await wagmiConfigDemo.connectors[0].getWalletClient({
    chainId: polygonMumbai.id,
  });

  const cfaV1Forwarder = getContract({
    address: CFAV1ForwarderAddress,
    abi: cfAv1ForwarderABI,
    client: walletClient,
  });

  const executeDelete = async () => {
    console.info("Flow still ongoing, deleting...");
    const hash = await cfaV1Forwarder.write.deleteFlow([
      fUSDCxAddress,
      sender,
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
      fUSDCxAddress,
      sender,
      receiver,
    ]);

    if (flow[1] > 0) {
      await executeDelete();
    }
  } catch (e) {
    console.error("Error deleting flow: ", e);
  }
}
