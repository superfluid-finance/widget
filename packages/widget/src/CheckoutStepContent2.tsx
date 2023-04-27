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
import { useEffect, useMemo } from "react";
import { useStepper } from "./StepperContext";
import { useCheckout } from "./CheckoutContext";

export default function CheckoutStepContent2() {
  const { tokenList } = useCheckout();
  const { handleNext } = useStepper();
  const { control: c, watch, setValue } = useFormContext<CheckoutFormDraft>();
  const [paymentOptionWithTokenInfo] = watch(["paymentOptionWithTokenInfo"]);

  // Reset wrap amount when payment option (i.e. the token) changes.
  useEffect(() => {
    setValue("wrapAmountEther", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: false,
    });
  }, [paymentOptionWithTokenInfo]);

  const superToken = paymentOptionWithTokenInfo?.superToken;
  const underlyingTokenInfo = useMemo(() => {
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
                    endAdornment: <span>{underlyingTokenInfo?.symbol}</span>,
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
          <FormControlLabel control={<Checkbox />} label="Enable Auto-Wrap" />
        </Stack>
        <Button variant="contained" fullWidth onClick={handleNext}>
          Continue
        </Button>
      </Stack>
    </StepContent>
  );
}
