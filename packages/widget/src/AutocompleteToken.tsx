import { Autocomplete, Box, TextField } from "@mui/material";
import { useMemo, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CheckoutFormDraft, PaymentOptionWithTokenInfo } from "./CheckoutForm";
import { useCheckout } from "./CheckoutContext";

export default function AutocompleteToken() {
  const { paymentOptions, tokenList } = useCheckout();
  const { control: c, watch, setValue } = useFormContext<CheckoutFormDraft>();
  const network = watch("network");

  useEffect(() => {
    console.log("network changed?")

    setValue("paymentOptionWithTokenInfo", null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: false,
    });
  }, [network]);

  const autocompleteOptions = useMemo<PaymentOptionWithTokenInfo[]>(
    () => [
      ...(network
        ? paymentOptions
            .filter((paymentOptions) => paymentOptions.chainId === network.id)
            .map((paymentOption) => {
              const tokenInfo = tokenList.tokens.find(
                (tokenInfo_) =>
                  tokenInfo_.address.toLowerCase() ===
                  paymentOption.superToken.address.toLowerCase()
              );

              if (tokenInfo === undefined) {
                // TODO: warn
                return null;
              }

              return {
                paymentOption,
                tokenInfo,
              };
            })
            .filter((x): x is PaymentOptionWithTokenInfo => x !== null)
        : []),
    ],
    [network, paymentOptions, tokenList]
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
          getOptionLabel={(option) => option.tokenInfo.symbol}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.paymentOption.flowRate.amountEther}{" "}
              {option.tokenInfo.symbol}/{option.paymentOption.flowRate.period}
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
