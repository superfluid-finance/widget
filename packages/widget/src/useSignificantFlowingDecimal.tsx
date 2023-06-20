import { useMemo } from "react";
import { formatEther } from "viem";
import { absoluteValue } from "./utils";

export const useSignificantFlowingDecimal = (
  flowRate: bigint,
  animationStepTimeInMs: number
): number | undefined =>
  useMemo(() => {
    if (flowRate === 0n) {
      return undefined;
    }

    const ticksPerSecond = 1000 / animationStepTimeInMs;
    const flowRatePerTick = flowRate / BigInt(ticksPerSecond);

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

    if (lengthToFirstSignificatDecimal === 16) return 18; // Don't go over 18.

    // This will usually have the last 3 numbers flowing smoothly.
    return lengthToFirstSignificatDecimal + 2;
  }, [flowRate]);
