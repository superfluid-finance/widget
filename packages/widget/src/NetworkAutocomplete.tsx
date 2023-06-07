import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useWidget } from "./WidgetContext";
import NetworkAvatar from "./NetworkAvatar";

export default function NetworkAutocomplete() {
  const { control: c } = useFormContext<DraftFormValues>();
  const { networks } = useWidget();

  const autocompleteOptions = networks;

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
            <Stack
              {...props}
              component="li"
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <NetworkAvatar
                network={option}
                AvatarProps={{
                  sx: { width: 32, height: 32 },
                }}
              />
              <Typography>{option.name}</Typography>
            </Stack>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                sx: { cursor: "pointer" },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: value ? (
                  <NetworkAvatar
                    network={value}
                    AvatarProps={{
                      sx: { width: 32, height: 32 }, // TODO(KK): this is duplicated above
                    }}
                  />
                ) : null,
              }}
              label="Network"
            />
          )}
          onChange={(_event, newValue) => onChange(newValue)}
          onBlur={onBlur}
        />
      )}
    />
  );
}
