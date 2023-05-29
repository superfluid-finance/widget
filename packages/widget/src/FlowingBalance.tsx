import { memo, ReactElement } from "react";
import useFlowingBalance, {
  ANIMATION_MINIMUM_STEP_TIME,
} from "./useFlowingBalance";
import { useSignificantFlowingDecimal } from "./useSignificantFlowingDecimal";
import { formatEther } from "viem";
import { toFixedUsingStrings } from "./utils";

type FlowingBalanceProps = {
  startingBalance: bigint;
  startingBalanceDate: Date;
  flowRate: bigint;
};

export default memo(function FlowingBalance({
  startingBalance,
  startingBalanceDate,
  flowRate,
}: FlowingBalanceProps): ReactElement {
  const flowingBalance = useFlowingBalance(
    startingBalance,
    startingBalanceDate,
    flowRate
  );

  const decimalPlaces = useSignificantFlowingDecimal(
    flowRate,
    ANIMATION_MINIMUM_STEP_TIME
  );

  return (
    <>
      {decimalPlaces
        ? toFixedUsingStrings(formatEther(flowingBalance), decimalPlaces)
        : formatEther(flowingBalance)}
    </>
  );
});
