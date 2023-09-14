import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import {
  Autocomplete,
  Box,
  Fab,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import useDemoMode from "../../hooks/useDemoMode";
import useFontOptions from "../../hooks/useFontOptions";
import InputWrapper from "../form/InputWrapper";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const UiEditor: FC = () => {
  const { control, watch } = useFormContext<WidgetProps>();

  const [displaySettings] = watch(["displaySettings"]);
  const fontOptions = useFontOptions();

  const { setDemoStyling } = useDemoMode();

  return (
    <>
      <Stack direction="column" gap={2}>
        <Box mb={1}>
          <Typography variant="h6" component="h2">
            Checkout Widget Styling
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You are free to customize the look and feel of the checkout widget.
          </Typography>
        </Box>

        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <InputWrapper title="View type">
              {(id) => (
                <ToggleButtonGroup
                  id={id}
                  value={value}
                  exclusive
                  onChange={(_, value) => onChange(value)}
                  sx={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <ToggleButton
                    data-testid="inline-button"
                    value="page"
                    aria-label="page"
                    title="Page"
                  >
                    Inline
                  </ToggleButton>
                  <ToggleButton
                    data-testid="dialog-button"
                    value="dialog"
                    aria-label="dialog"
                    title="Dialog"
                  >
                    Dialog
                  </ToggleButton>
                  <ToggleButton
                    data-testid="drawer-button"
                    value="drawer"
                    aria-label="drawer"
                    title="Drawer"
                  >
                    Drawer
                  </ToggleButton>
                  <ToggleButton
                    data-testid="full-screen-button"
                    value="full-screen"
                    aria-label="full-screen"
                    title="Full Screen"
                  >
                    Full-screen
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            </InputWrapper>
          )}
        />
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
              dataTestid="container-radius-value"
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
              dataTestid="field-border-radius-value"
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
                    data-testid="primary-color-picker"
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
      <Tooltip title="Replace with random styling" placement="right" arrow>
        <Fab
          data-testid="wand-button"
          size="medium"
          color="secondary"
          onClick={setDemoStyling}
          sx={{
            position: "absolute",
            bottom: 72,
            left: 20,
          }}
        >
          <AutoFixHighIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default UiEditor;
