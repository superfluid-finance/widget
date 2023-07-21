import { ChainId, supportedNetwork, supportedNetworks } from "../core/index.js";
import superfluidMetadata from "@superfluid-finance/metadata";

/**
 * Calculates the date when a Super Token balance is critical and may be liquidated.
 * @returns `null` means it won't ever be critical.
 */
export const calculateDateWhenBalanceCritical = ({
  availableBalance,
  timestamp,
  accountFlowRate,
}: {
  availableBalance: bigint;
  timestamp: bigint;
  accountFlowRate: bigint;
}): Date | null => {
  if (accountFlowRate >= 0) {
    return null;
  }

  const timeToCritical = availableBalance / (accountFlowRate * -1n);
  const criticalTimestamp = (timestamp + timeToCritical) * 1000n;
  return new Date(Number(criticalTimestamp));
};
