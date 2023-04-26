import { Autocomplete, Box, TextField } from "@mui/material";
import useCheckout from "./useCheckout";
import { useMemo } from "react";
import { SupportedNetwork, supportedNetworks } from "superfluid-checkout-core";
import { Controller, useFormContext } from "react-hook-form";
import { DraftForm } from "./formSchema";

export default function NetworkAutocomplete() {
  const { control: c, setValue } = useFormContext<DraftForm>();
  const { tokenList } = useCheckout();

  const autocompleteOptions = useMemo<SupportedNetwork[]>(() => {
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

  return (
    <Controller
      control={c}
      name="network"
      render={({ field: { value, onChange, onBlur } }) => (
        <Autocomplete
          value={value}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={autocompleteOptions}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Network" />}
          onChange={(_event, newValue) => {
            onChange(newValue);
            setValue("paymentOptionWithTokenInfo", null); // TODO(KK): What `options` to use?
          }}
          onBlur={onBlur}
        />
      )}
    />
  );
}
