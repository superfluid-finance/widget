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
import { DraftFormValues } from "./formValues";
import { useMemo } from "react";
import { useStepper } from "./StepperContext";
import { useCheckout } from "./CheckoutContext";

export default function StepContentWrap() {
  const { tokenList } = useCheckout();
  const { handleNext } = useStepper();
  const { control: c, watch } = useFormContext<DraftFormValues>();
  const [paymentOptionWithTokenInfo] = watch(["paymentOptionWithTokenInfo"]);

  const superToken = paymentOptionWithTokenInfo?.superToken;

  // Find the underlying token of the Super Token.
  const underlyingToken = useMemo(() => {
    if (!superToken) {
      return undefined;
    }

    const superTokenInfo = superToken.extensions.superTokenInfo;
    if (superTokenInfo.type !== "Wrapper") {
      return undefined;
    }

    const underlyingTokenAddressLowerCased =
      superTokenInfo.underlyingTokenAddress.toLowerCase();
    return tokenList.tokens.find(
      (x) => x.address.toLowerCase() === underlyingTokenAddressLowerCased
    );
  }, [superToken]);

  return (
    <StepContent TransitionProps={{ unmountOnExit: false }}>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="space-around"
        spacing={3}
      >
        <Stack
          direction="column"
          alignItems="stretch"
          justifyContent="space-around"
          spacing={1}
        >
          <Controller
            control={c}
            name="wrapAmountEther"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormGroup>
                <TextField
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  InputProps={{
                    endAdornment: <span>{underlyingToken?.symbol}</span>,
                  }}
                />
                <TextField
                  disabled
                  value={value}
                  InputProps={{
                    endAdornment: <span>{superToken?.symbol}</span>,
                  }}
                />
              </FormGroup>
            )}
          />
          <Controller
            control={c}
            name="enableAutoWrap"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value ?? false}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                }
                label="Enable Auto-Wrap"
              />
            )}
          />
        </Stack>
        <Button variant="contained" fullWidth onClick={handleNext}>
          Continue
        </Button>
      </Stack>
    </StepContent>
  );
}
