import { useEffect, useState } from "react";

export const ANIMATION_MINIMUM_STEP_TIME = 40;

const useFlowingBalance = (
  startingBalance: bigint,
  startingBalanceDate: Date,
  flowRate: bigint,
) => {
  const [flowingBalance, setFlowingBalance] = useState(startingBalance);

  useEffect(() => {
    // No need to show animation when flow rate is zero.
    if (flowRate === 0n) return;

    let lastAnimationTimestamp: DOMHighResTimeStamp = 0;

    const animationStep = (currentAnimationTimestamp: DOMHighResTimeStamp) => {
      animationFrameId = window.requestAnimationFrame(animationStep); // Set next frame ASAP, otherwise race-conditions might happen when trying to cancel.
      if (
        currentAnimationTimestamp - lastAnimationTimestamp >
        ANIMATION_MINIMUM_STEP_TIME
      ) {
        const elapsedTimeInMilliseconds = BigInt(
          Date.now() - startingBalanceDate.getTime(),
        );
        const flowingBalance_ =
          startingBalance + (flowRate * elapsedTimeInMilliseconds) / 1000n;

        setFlowingBalance(flowingBalance_);

        lastAnimationTimestamp = currentAnimationTimestamp;
      }
    };

    let animationFrameId = window.requestAnimationFrame(animationStep);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [startingBalance, startingBalanceDate.getTime(), flowRate]);

  return flowingBalance;
};

export default useFlowingBalance;
