import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  StepContent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues, ValidFormValues } from "./formValues";
import { useMemo } from "react";
import { useStepper } from "./StepperContext";
import { useCheckout } from "./CheckoutContext";
import { TokenAvatar } from "./TokenAvatar";
import { formValuesToCommands } from "./formValuesToCommands";
import { useCommandHandler } from "./CommandHandlerContext";

export default function StepContentWrap() {
  const { tokenList } = useCheckout();
  const { handleNext, isPenultimateStep } = useStepper();
  const { setCommands } = useCommandHandler();
  const {
    control: c,
    watch,
    formState: { isValid, isValidating },
    handleSubmit,
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
        <Button
          disabled={!isValid || isValidating}
          variant="contained"
          onClick={() => {
            if (isPenultimateStep()) {
              handleSubmit((values) => {
                const commands = formValuesToCommands(
                  values as ValidFormValues // TODO(KK): This is better in next version of react-hook-form.
                );
                setCommands(commands);
                handleNext();
              })();
            } else {
              handleNext();
            }
          }}
        >
          Continue
        </Button>
      </Stack>
    </StepContent>
  );
}
