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
import InputWrapper from "../form/InputWrapper";

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
      <Controller
        control={control}
        name="displaySettings.darkMode"
        render={({ field: { value, onChange } }) => (
          <FormControlLabel
            data-testid="dark-mode-switch"
            control={<Switch checked={value ?? false} onChange={onChange} />}
            label={
              <Typography>{`Dark mode: ${value ? "on" : "off"}`}</Typography>
            }
          />
        )}
      />

      <InputWrapper
        title={`Container border-radius: ${displaySettings.containerRadius}`}
      >
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
      </InputWrapper>
      <InputWrapper
        title={`Field border-radius: ${displaySettings.inputRadius}`}
      >
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
      </InputWrapper>

      <InputWrapper
        title={`Button border-radius: ${displaySettings.buttonRadius}`}
      >
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
      </InputWrapper>

      <Stack direction="row" gap={1}>
        <InputWrapper title="Primary color">
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
        </InputWrapper>

        <InputWrapper title="Secondary color">
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
        </InputWrapper>
      </Stack>

      <InputWrapper title="Font Family">
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
      </InputWrapper>

      <InputWrapper title="Stepper">
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
      </InputWrapper>
    </Stack>
  );
};

export default UiEditor;
