import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import isEqual from "lodash.isequal";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { DraftFormValues, PaymentOptionWithTokenInfo } from "./formValues.js";
import { TokenAvatar } from "./TokenAvatar.js";
import { useWidget } from "./WidgetContext.js";

export default function TokenAutocomplete() {
  const { paymentOptionWithTokenInfoList } = useWidget();
  const { control: c, watch } = useFormContext<DraftFormValues>();
  const [network] = watch(["network"]);

  const autocompleteOptions = useMemo<
    ReadonlyArray<PaymentOptionWithTokenInfo>
  >(
    () =>
      network
        ? paymentOptionWithTokenInfoList.filter(
            ({ paymentOption }) => paymentOption.chainId === network.id,
          )
        : [],
    [network, paymentOptionWithTokenInfoList],
  );

  return (
    <Controller
      control={c}
      name="paymentOptionWithTokenInfo"
      render={({ field: { value, onChange, onBlur } }) => (
        <Autocomplete
          disabled={network === null}
          value={value}
          disableClearable={!!value}
          isOptionEqualToValue={(option, value) => isEqual(option, value)}
          options={autocompleteOptions}
          autoHighlight
          getOptionLabel={(option) => option.superToken.symbol}
          renderOption={(props, option) => {
            const key = option.paymentOption.flowRate
              ? `${
                  option.paymentOption.transferAmountEther
                    ? `${option.paymentOption.transferAmountEther} + `
                    : ""
                }${option.paymentOption.flowRate.amountEther} ${
                  option.superToken.symbol
                }/${option.paymentOption.flowRate.period}`
              : `${option.superToken.symbol} - Custom amount`;
            return (
              <Stack
                {...props}
                key={key}
                component="li"
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <TokenAvatar tokenInfo={option.superToken} />
                <Typography data-testid="token-option">{key}</Typography>
              </Stack>
            );
          }}
          renderInput={(params) => (
            <TextField
              data-testid="token-selection-button"
              {...params}
              inputProps={{
                ...params.inputProps,
                sx: { cursor: "pointer" },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: value ? (
                  <TokenAvatar tokenInfo={value.superToken} sx={{ ml: 1 }} />
                ) : null,
              }}
              size="small"
              placeholder="Token"
            />
          )}
          componentsProps={{
            popper: {
              placement: "bottom-end",
              sx: {
                minWidth: "min(100%, 300px)",
                mt: "2px !important",
              },
              disablePortal: true,
            },
          }}
          // Using structuredClone to lose reference to the original option.
          // If user selects custom amount option and modifies the values then we won't mutate the original option
          onChange={(_event, newValue) => onChange(structuredClone(newValue))}
          onBlur={onBlur}
        />
      )}
    />
  );
}
