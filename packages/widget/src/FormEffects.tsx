import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useEffect } from "react";

export function FormEffects() {
  const { watch, resetField } = useFormContext<DraftFormValues>();

  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);

  // Reset payment option (i.e. the token) when network changes.
  useEffect(() => {
    resetField("paymentOptionWithTokenInfo", {
      keepDirty: true,
      keepTouched: true,
      keepError: false,
    });
  }, [network]);

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
  }, [paymentOptionWithTokenInfo]);

  return null;
}
