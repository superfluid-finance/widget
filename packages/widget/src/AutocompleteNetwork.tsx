import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useCheckout } from "./CheckoutContext";

export default function AutocompleteNetwork() {
  const { control: c } = useFormContext<DraftFormValues>();
  const { networks: supportedNetworks } = useCheckout();

  const autocompleteOptions = supportedNetworks;

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
          onChange={(_event, newValue) => onChange(newValue)}
          onBlur={onBlur}
        />
      )}
    />
  );
}
