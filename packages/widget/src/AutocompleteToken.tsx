import { Autocomplete, Box, TextField } from "@mui/material";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues, PaymentOptionWithTokenInfo } from "./formValues";
import { useCheckout } from "./CheckoutContext";

export default function AutocompleteToken() {
  const { paymentOptionWithTokenInfoList } = useCheckout();
  const { control: c, watch } = useFormContext<DraftFormValues>();
  const [network] = watch(["network"]);

  const autocompleteOptions = useMemo<
    ReadonlyArray<PaymentOptionWithTokenInfo>
  >(
    () =>
      network
        ? paymentOptionWithTokenInfoList.filter(
            ({ paymentOption }) => paymentOption.chainId === network.id
          )
        : [],
    [network, paymentOptionWithTokenInfoList]
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
