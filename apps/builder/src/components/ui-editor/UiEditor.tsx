import {
  FormControl,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { EditorProps } from "../widget-preview/WidgetPreview";
import ImageSelect from "../image-select/ImageSelect";
import { MuiColorInput, matchIsValidColor } from "mui-color-input";

const UiEditor: FC<EditorProps> = ({ control, watch }) => {
  const [displaySettings] = watch(["displaySettings"]);

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2}>
        <Controller
          control={control}
          name="displaySettings.productImageURL"
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
        <Controller
          control={control}
          name="displaySettings.logoURL"
          render={({ field: { value, onChange } }) => (
            <ImageSelect
              label="Logo"
              onClick={(file) =>
                onChange({ target: { value: URL.createObjectURL(file) } })
              }
              onRemove={() => onChange({ target: { value: "" } })}
              imageSrc={value}
            />
          )}
        />
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
          name="displaySettings.fontFamily"
          render={({ field: { value, onChange } }) => (
            <TextField value={value} onChange={onChange} />
          )}
        />
      </Stack>
    </Stack>
  );
};

export default UiEditor;
