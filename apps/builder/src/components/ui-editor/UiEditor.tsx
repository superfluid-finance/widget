import {
  Autocomplete,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ImageSelect from "../image-select/ImageSelect";
import { MuiColorInput } from "mui-color-input";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import useFonts from "../../hooks/useFonts";

const UiEditor: FC = () => {
  const { control, watch, setValue } = useFormContext<WidgetProps>();

  const [displaySettings] = watch(["displaySettings"]);
  const fonts = useFonts();

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2}>
        <Controller
          control={control}
          name="productDetails.imageURI"
          render={({ field: { value, onChange } }) => (
            <ImageSelect
              label="Product image"
              onClick={(file) =>
                onChange({ target: { value: URL.createObjectURL(file) } })
              }
              onRemove={() => onChange({ target: { value: "" } })}
              imageSrc={value}
            />
          )}
        />
        {/* <Controller
          control={control}
          name="displaySettings.logo"
          render={({ field: { value, onChange } }) => (
            <ImageSelect
              label="Logo"
              onClick={(file) => onChange({ target: { value: file } })}
              onRemove={() => onChange({ target: { value: "" } })}
              imageSrc={value ? URL.createObjectURL(value) : ""}
            />
          )}
        /> */}
      </Stack>
      <Stack>
        <Controller
          control={control}
          name="displaySettings.darkMode"
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              control={<Switch checked={value ?? false} onChange={onChange} />}
              label={
                <Typography variant="subtitle2">{`Dark mode: ${
                  value ? "on" : "off"
                }`}</Typography>
              }
            />
          )}
        />
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">
          Container border-radius: {displaySettings.containerRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.containerRadius"
          render={({ field: { value, onChange } }) => (
            <Slider
              step={1}
              min={0}
              max={50}
              value={Number(value)}
              onChange={onChange}
            />
          )}
        />
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">
          Field border-radius: {displaySettings.inputRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.inputRadius"
          render={({ field: { value, onChange } }) => (
            <Slider
              step={1}
              min={0}
              max={25}
              value={Number(value)}
              onChange={onChange}
            />
          )}
        />
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">
          Button border-radius: {displaySettings.buttonRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.buttonRadius"
          render={({ field: { value, onChange } }) => (
            <Slider
              step={1}
              min={0}
              max={25}
              value={Number(value)}
              onChange={onChange}
            />
          )}
        />
      </Stack>

      <Stack direction="row" gap={1}>
        <Stack direction="column" gap={1}>
          <Typography variant="subtitle2">Primary color</Typography>
          <Stack direction="row" gap={1}>
            <Controller
              control={control}
              name="displaySettings.primaryColor"
              render={({ field: { value, onChange } }) => (
                <MuiColorInput
                  fallbackValue={"#000"}
                  format="hex"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
        </Stack>

        <Stack direction="column" gap={1}>
          <Typography variant="subtitle2">Secondary color</Typography>
          <Stack direction="row" gap={1}>
            <Controller
              control={control}
              name="displaySettings.secondaryColor"
              render={({ field: { value, onChange } }) => (
                <MuiColorInput
                  fallbackValue={"#000"}
                  format="hex"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Font Family</Typography>
        <Controller
          control={control}
          name="displaySettings.font.config"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              value={value}
              disablePortal
              id="combo-box-demo"
              options={fonts}
              isOptionEqualToValue={(option, value) =>
                option.family === value.family
              }
              onChange={(_, value) => {
                setValue("displaySettings.font.kind", value?.category ?? "");
                onChange(value);
              }}
              getOptionLabel={(option) =>
                `${option.family}, ${option.category}`
              }
              fullWidth
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};

export default UiEditor;
