import { Autocomplete, Box, TextField } from "@mui/material";
import { useMemo, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues, PaymentOptionWithTokenInfo } from "./formValues";
import { useCheckout } from "./CheckoutContext";

export default function AutocompleteToken() {
  const { paymentOptions, superTokens } = useCheckout();
  const { control: c, watch, setValue } = useFormContext<DraftFormValues>();
  const network = watch("network");

  // Reset payment option (i.e. the token) when network changes.
  useEffect(() => {
    setValue("paymentOptionWithTokenInfo", null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: false,
    });
  }, [network]);

  // Derive autocomplete options from the payment options.
  const autocompleteOptions = useMemo<PaymentOptionWithTokenInfo[]>(
    () => [
      ...(network
        ? paymentOptions
            .filter((paymentOptions) => paymentOptions.chainId === network.id)
            .map((paymentOption) => {
              const superToken = superTokens.find(
                (tokenInfo_) =>
                  tokenInfo_.address.toLowerCase() ===
                  paymentOption.superToken.address.toLowerCase()
              );

              if (superToken === undefined) {
                // TODO: warn
                return null;
              }

              return {
                paymentOption,
                superToken,
              };
            })
            .filter((x): x is PaymentOptionWithTokenInfo => x !== null)
        : []),
    ],
    [network, paymentOptions, superTokens]
  );

  return (
    <Controller
      control={c}
      name="paymentOptionWithTokenInfo"
      render={({ field: { value, onChange, onBlur } }) => (
        <Autocomplete
          disabled={network === null}
          value={value}
          isOptionEqualToValue={(option, value) =>
            option.paymentOption.superToken.address ===
            value.paymentOption.superToken.address
          }
          options={autocompleteOptions}
          autoHighlight
          getOptionLabel={(option) => option.superToken.symbol}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.paymentOption.flowRate.amountEther}{" "}
              {option.superToken.symbol}/{option.paymentOption.flowRate.period}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Token" />}
          onChange={(_event, newValue) => onChange(newValue)}
          onBlur={onBlur}
        />
      )}
    />
  );
}
