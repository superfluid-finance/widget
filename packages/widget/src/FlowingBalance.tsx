import { memo, ReactElement } from "react";
import { formatEther } from "viem";

import useFlowingBalance, {
  ANIMATION_MINIMUM_STEP_TIME,
} from "./useFlowingBalance.js";
import { useSignificantFlowingDecimal } from "./useSignificantFlowingDecimal.js";
import { toFixedUsingString } from "./utils.js";

// TODO: re-use with useFlowingBalance?
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
    flowRate,
  );

  const decimalPlaces = useSignificantFlowingDecimal(
    flowRate,
    ANIMATION_MINIMUM_STEP_TIME,
  );

  return (
    <>
      {decimalPlaces
        ? toFixedUsingString(formatEther(flowingBalance), decimalPlaces)
        : formatEther(flowingBalance)}
    </>
  );
});
