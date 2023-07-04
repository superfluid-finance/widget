import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export function FormEffects() {
  const { watch, resetField, setValue } = useFormContext<DraftFormValues>();

  const [network, paymentOptionWithTokenInfo, customPaymentAmount] = watch([
    "network",
    "paymentOptionWithTokenInfo",
    "customPaymentAmount",
  ]);

  // Reset payment option (i.e. the token) when network changes.
  useEffect(
    () =>
      void resetField("paymentOptionWithTokenInfo", {
        keepDirty: true,
        keepTouched: true,
        keepError: false,
      }),
    [network]
  );

  // Reset wrap things when payment option (i.e. the token) changes.
  useEffect(() => {
    resetField("wrapAmountEther", {
      keepDirty: true,
      keepTouched: true,
      keepError: false,
    });
    resetField("enableAutoWrap", {
      keepDirty: true,
      keepTouched: true,
      keepError: false,
    });

    if (!paymentOptionWithTokenInfo) return;

    const { superToken, paymentOption } = paymentOptionWithTokenInfo;
    const finalFlowRate = paymentOption.flowRate || customPaymentAmount;

    if (superToken.extensions.superTokenInfo.type !== "Pure" && finalFlowRate) {
      setValue("wrapAmountEther", finalFlowRate.amountEther, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: false,
      });
    }
  }, [paymentOptionWithTokenInfo, customPaymentAmount]);

  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setValue("accountAddress", address, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      resetField("accountAddress", {
        keepDirty: true,
        keepTouched: true,
        keepError: false,
      });
    }
  }, [address]);

  return null;
}
