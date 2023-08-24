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
import InputWrapper from "../form/InputWrapper";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const UiEditor: FC = () => {
  const { control, watch } = useFormContext<WidgetProps>();

  const [displaySettings] = watch(["displaySettings"]);
  const fontOptions = useFontOptions();

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2}>
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

      <Controller
        control={control}
        name="displaySettings.containerRadius"
        render={({ field: { value, onChange } }) => (
          <InputWrapper
            title={`Container border-radius: ${displaySettings.containerRadius}`}
          >
            {(id) => (
              <Slider
                id={id}
                data-testid="container-radius-slider"
                step={1}
                min={0}
                max={50}
                value={Number(value)}
                onChange={(_event, x) => onChange(x as number)}
              />
            )}
          </InputWrapper>
        )}
      />

      <Controller
        control={control}
        name="displaySettings.inputRadius"
        render={({ field: { value, onChange } }) => (
          <InputWrapper
            title={`Field border-radius: ${displaySettings.inputRadius}`}
          >
            {(id) => (
              <Slider
                data-testid="field-border-slider"
                step={1}
                min={0}
                max={25}
                value={Number(value)}
                onChange={(_event, x) => onChange(x as number)}
              />
            )}
          </InputWrapper>
        )}
      />

      <Controller
        control={control}
        name="displaySettings.buttonRadius"
        render={({ field: { value, onChange } }) => (
          <InputWrapper
            title={`Button border-radius: ${displaySettings.buttonRadius}`}
          >
            {(id) => (
              <Slider
                id={id}
                data-testid="button-border-radius-slider"
                step={1}
                min={0}
                max={25}
                value={Number(value)}
                onChange={(_event, x) => onChange(x as number)}
              />
            )}
          </InputWrapper>
        )}
      />

      <Stack direction="row" gap={1}>
        <Controller
          control={control}
          name="displaySettings.primaryColor"
          render={({ field: { value, onChange } }) => (
            <InputWrapper title="Primary color">
              {(id) => (
                <MuiColorInput
                  id={id}
                  fallbackValue={"#000"}
                  format="hex"
                  value={value}
                  onChange={(x) => onChange(x as `#{string}`)}
                />
              )}
            </InputWrapper>
          )}
        />

        <Controller
          control={control}
          name="displaySettings.secondaryColor"
          render={({ field: { value, onChange } }) => (
            <InputWrapper title="Secondary color">
              {(id) => (
                <MuiColorInput
                  id={id}
                  data-testid="secondary-color-picker"
                  fallbackValue={"#000"}
                  format="hex"
                  value={value}
                  onChange={(x) => onChange(x as `#{string}`)}
                />
              )}
            </InputWrapper>
          )}
        />
      </Stack>

      <Controller
        control={control}
        name="displaySettings.font"
        render={({ field: { value, onChange } }) => (
          <InputWrapper title="Font Family">
            {(id) => (
              <Autocomplete
                id={id}
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
          </InputWrapper>
        )}
      />

      <Controller
        control={control}
        name="displaySettings.stepperOrientation"
        render={({ field: { value, onChange } }) => (
          <InputWrapper title="Stepper">
            {(id) => (
              <ToggleButtonGroup
                id={id}
                value={value}
                exclusive
                onChange={(_, x: "vertical" | "horizontal") => onChange(x)}
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
          </InputWrapper>
        )}
      />
    </Stack>
  );
};

export default UiEditor;
