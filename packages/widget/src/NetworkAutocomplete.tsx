import { Autocomplete, Box, TextField } from "@mui/material";
import useCheckout from "./useCheckout";
import { useMemo, useState } from "react";
import {
  SupportedNetwork,
  supportedNetworks,
} from "superfluid-checkout-core";

export default function NetworkAutocomplete() {
  const { tokenList } = useCheckout();

  const autocompleteOptions = useMemo(() => {
    const uniqueChainIds = [...new Set(tokenList.tokens.map((x) => x.chainId))];
    return uniqueChainIds
      .map((chainId) => {
        const supportedNetwork = supportedNetworks.find(
          (network_) => network_.id === chainId
        );

        if (supportedNetwork === undefined) {
          // TODO: warn
          return null;
        }

        return supportedNetwork;
      })
      .filter((x): x is SupportedNetwork => x !== null);
  }, []);

  const [value, setValue] = useState<SupportedNetwork | null>(
    autocompleteOptions[0] ?? null
  );

  return (
    <Autocomplete
      value={value}
      options={autocompleteOptions}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Network" />}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
