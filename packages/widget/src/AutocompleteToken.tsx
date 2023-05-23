import {
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues, PaymentOptionWithTokenInfo } from "./formValues";
import { useWidget } from "./WidgetContext";
import { TokenAvatar } from "./TokenAvatar";

export default function AutocompleteToken() {
  const { paymentOptionWithTokenInfoList } = useWidget();
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
          getOptionLabel={(option) =>
            `${option.paymentOption.flowRate.amountEther} ${option.superToken.symbol}/${option.paymentOption.flowRate.period}`
          }
          renderOption={(props, option) => (
            <Stack
              {...props}
              component="li"
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <TokenAvatar tokenInfo={option.superToken} />
              <Typography>
                {`${option.paymentOption.flowRate.amountEther} ${option.superToken.symbol}/${option.paymentOption.flowRate.period}`}
              </Typography>
            </Stack>
          )}
          renderInput={(params) => <TextField {...params} label="Token" />}
          onChange={(_event, newValue) => onChange(newValue)}
          onBlur={onBlur}
        />
      )}
    />
  );
}
