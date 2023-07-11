import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export function FormEffects() {
  const {
    watch,
    resetField,
    setValue,
    getFieldState,
    formState: { isValid, errors }, // Creates form state subscription.
    trigger,
  } = useFormContext<DraftFormValues>();

  const [network, paymentOptionWithTokenInfo, flowRate] = watch([
    "network",
    "paymentOptionWithTokenInfo",
    "flowRate",
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

  // Set flow rate when payment option changes.
  useEffect(() => {
    if (!paymentOptionWithTokenInfo?.paymentOption?.flowRate) {
      resetField("flowRate", {
        keepDirty: false,
        keepTouched: true,
        keepError: false,
      });
    } else {
      setValue("flowRate", paymentOptionWithTokenInfo.paymentOption.flowRate, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [paymentOptionWithTokenInfo]);

  // Reset wrap things when payment option (i.e. the token) changes.
  useEffect(() => {
    resetField("wrapAmountEther", {
      keepDirty: false,
      keepTouched: true,
      keepError: false,
    });
    resetField("enableAutoWrap", {
      keepDirty: false,
      keepTouched: true,
      keepError: false,
    });
  }, [paymentOptionWithTokenInfo]);

  // # Change initial wrap amount when flow rate changes.
  useEffect(() => {
    if (paymentOptionWithTokenInfo) {
      const { superToken } = paymentOptionWithTokenInfo;
      const isWrapDirty = getFieldState("wrapAmountEther").isDirty;
      const isPureSuperToken =
        superToken.extensions.superTokenInfo.type === "Pure";

      if (!isWrapDirty && !isPureSuperToken) {
        resetField("wrapAmountEther", {
          keepDirty: false,
          keepTouched: true,
          defaultValue: flowRate.amountEther,
        });
      }
    }
  }, [paymentOptionWithTokenInfo, flowRate]);

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

  // Trigger "higher order validation", i.e. react-hook-form works field-level by default but we want to validate the whole form state.
  // const errorsLength = Object.keys(errors).length;
  // useEffect(() => {
  //   if (!isValid && errorsLength === 0) {
  //     trigger();
  //   }
  // }, [isValid, errorsLength]);

  return null;
}
