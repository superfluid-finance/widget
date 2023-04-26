import { Autocomplete, Box, TextField } from "@mui/material";
import useCheckout from "./useCheckout";
import { useMemo, useState } from "react";
import { PaymentOption } from "superfluid-checkout-core";
import { TokenInfo } from "@uniswap/token-lists";

// TODO: Probably better to move it higher.
export type TokenAutocompleteOption = {
  paymentOption: PaymentOption;
  tokenInfo: TokenInfo;
};

export default function TokenAutoComplete() {
  const { paymentOptions, tokenList } = useCheckout();

  const autocompleteOptions = useMemo<TokenAutocompleteOption[]>(
    () =>
      paymentOptions
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
        .filter((x): x is TokenAutocompleteOption => x !== null),
    [paymentOptions, tokenList]
  );

  const [value, setValue] = useState<TokenAutocompleteOption | null>(
    autocompleteOptions[0] ?? null
  );

  return (
    <Autocomplete
      value={value}
      options={autocompleteOptions}
      autoHighlight
      getOptionLabel={(option) => option.tokenInfo.symbol}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.paymentOption.flowRate.amountEther} {option.tokenInfo.symbol}/
          {option.paymentOption.flowRate.period}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Token" />}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
