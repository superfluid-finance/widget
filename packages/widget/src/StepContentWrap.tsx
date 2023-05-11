import {
  FormControlLabel,
  FormGroup,
  Stack,
  StepContent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useMemo } from "react";
import { useCheckout } from "./CheckoutContext";
import { TokenAvatar } from "./TokenAvatar";
import { StepperContinueButton } from "./StepperContinueButton";

export default function StepContentWrap() {
  const { tokenList } = useCheckout();
  const {
    control: c,
    watch,
    formState: { isValid, isValidating },
  } = useFormContext<DraftFormValues>();
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
                    endAdornment: underlyingToken && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <TokenAvatar tokenInfo={underlyingToken} />
                        <Typography>{underlyingToken.symbol}</Typography>
                      </Stack>
                    ),
                  }}
                />
                <TextField
                  disabled
                  value={value}
                  InputProps={{
                    endAdornment: superToken && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <TokenAvatar tokenInfo={superToken} />
                        <Typography>{superToken.symbol}</Typography>
                      </Stack>
                    ),
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
                  <Switch
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

        <StepperContinueButton disabled={!isValid || isValidating}>
          Continue
        </StepperContinueButton>
      </Stack>
    </StepContent>
  );
}
