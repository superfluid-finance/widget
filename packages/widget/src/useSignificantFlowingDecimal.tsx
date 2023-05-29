import { useMemo } from "react";
import { formatEther } from "viem";
import { absoluteValue } from "./utils";

export const useSignificantFlowingDecimal = (
  flowRate: bigint,
  animationStepTimeInMs: bigint
): number | undefined =>
  useMemo(() => {
    if (flowRate === 0n) {
      return undefined;
    }

    const ticksPerSecond = 1000n / animationStepTimeInMs;
    const flowRatePerTick = flowRate / ticksPerSecond;

    const [beforeEtherDecimal, afterEtherDecimal] =
      formatEther(flowRatePerTick).split(".");

    const isFlowingInWholeNumbers =
      absoluteValue(BigInt(beforeEtherDecimal)) > 0n;

    if (isFlowingInWholeNumbers) {
      return 0; // Flowing in whole numbers per tick.
    }
    const numberAfterDecimalWithoutLeadingZeroes = BigInt(afterEtherDecimal);

    const lengthToFirstSignificatDecimal = afterEtherDecimal
      .toString()
      .replace(numberAfterDecimalWithoutLeadingZeroes.toString(), "").length; // We're basically counting the zeroes.

    // If you want to add any extra here, check for 18 first, i.e. don't go over it.
    return lengthToFirstSignificatDecimal;
  }, [flowRate]);
