import {
  Autocomplete,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useFontOptions from "../../hooks/useFontOptions";
import ImageSelect from "../image-select/ImageSelect";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const UiEditor: FC = () => {
  const { control, watch } = useFormContext<WidgetProps>();

  const [displaySettings] = watch(["displaySettings"]);
  const fontOptions = useFontOptions();

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
              data-testid="dark-mode-switch"
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
        <Typography
          data-testid="container-radius-slider-amount"
          variant="subtitle2"
        >
          Container border-radius: {displaySettings.containerRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.containerRadius"
          render={({ field: { value, onChange } }) => (
            <Slider
              data-testid="container-radius-slider"
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
        <Typography
          data-testid="field-border-slider-amount"
          variant="subtitle2"
        >
          Field border-radius: {displaySettings.inputRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.inputRadius"
          render={({ field: { value, onChange } }) => (
            <Slider
              data-testid="field-border-slider"
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
        <Typography
          data-testid="button-border-radius-amount"
          variant="subtitle2"
        >
          Button border-radius: {displaySettings.buttonRadius}
        </Typography>
        <Controller
          control={control}
          name="displaySettings.buttonRadius"
          render={({ field: { value, onChange } }) => (
            <Slider
              data-testid="button-border-radius-slider"
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
                  data-testid="primary-color-picker"
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
                  data-testid="secondary-color-picker"
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
          name="displaySettings.font"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              data-testid="font-picker"
              value={value}
              loading={fontOptions.length === 0}
              disablePortal
              options={fontOptions}
              isOptionEqualToValue={(option, value) =>
                option.family === value.family
              }
              onChange={(_, value) => onChange(value)}
              getOptionLabel={(option) =>
                `${option.family}, ${option.category}`
              }
              fullWidth
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Stepper</Typography>
        <Controller
          control={control}
          name="displaySettings.stepperOrientation"
          render={({ field: { value, onChange } }) => (
            <ToggleButtonGroup
              value={value}
              exclusive
              onChange={onChange}
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <ToggleButton
                value="vertical"
                aria-label="vertical stepper"
                title="Choose vertical stepper"
              >
                Vertical
              </ToggleButton>
              <ToggleButton
                value="horizontal"
                aria-label="horizontal stepper"
                title="Choose horizontal stepper"
              >
                Horizontal
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default UiEditor;
