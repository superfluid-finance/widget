import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useEffect } from "react";

export function FormEffects() {
  const { watch, setValue } = useFormContext<DraftFormValues>();

  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);

  // Reset payment option (i.e. the token) when network changes.
  useEffect(() => {
    setValue("paymentOptionWithTokenInfo", null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: false,
    });
  }, [network]);

  // Reset wrap amount when payment option (i.e. the token) changes.
  useEffect(() => {
    setValue("wrapAmountEther", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: false,
    });
  }, [paymentOptionWithTokenInfo]);

  return null;
}
