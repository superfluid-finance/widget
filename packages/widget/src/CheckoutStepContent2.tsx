import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  StepContent,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { CheckoutFormDraft } from "./CheckoutForm";
import { useEffect } from "react";
import { useStepper } from "./StepperContext";

export default function CheckoutStepContent2() {
  const { handleNext } = useStepper();
  const { control: c, watch, setValue } = useFormContext<CheckoutFormDraft>();
  const [paymentOptionWithTokenInfo] = watch(["paymentOptionWithTokenInfo"]);

  useEffect(() => {
    setValue("wrapAmountEther", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: false,
    });
  }, [paymentOptionWithTokenInfo]);

  return (
    <StepContent TransitionProps={{ unmountOnExit: false }}>
      <Stack>
        <Controller
          control={c}
          name="wrapAmountEther"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormGroup>
              <TextField
                label="Underlying Token"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <TextField
                disabled
                label="Super Token"
                InputProps={{
                  endAdornment: (
                    <span>{paymentOptionWithTokenInfo?.tokenInfo?.symbol}</span>
                  ),
                }}
              />
            </FormGroup>
          )}
        />
        <FormControlLabel control={<Checkbox />} label="Enable Auto-Wrap" />
        <Button variant="contained" fullWidth onClick={handleNext}>
          Continue
        </Button>
      </Stack>
    </StepContent>
  );
}
