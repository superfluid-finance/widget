import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useMemo } from "react";
import { useWidget } from "./WidgetContext";
import { TokenAvatar } from "./TokenAvatar";
import { StepperContinueButton } from "./StepperContinueButton";

export default function StepContentWrap() {
  const {
    control: c,
    watch,
    formState: { isValid, isValidating },
  } = useFormContext<DraftFormValues>();
  const [paymentOptionWithTokenInfo] = watch(["paymentOptionWithTokenInfo"]);

  const superToken = paymentOptionWithTokenInfo?.superToken;
  const { getUnderlyingToken } = useWidget();

  // Find the underlying token of the Super Token.
  const underlyingToken = useMemo(() => {
    if (!superToken) {
      return undefined;
    }

    const superTokenInfo = superToken.extensions.superTokenInfo;
    if (superTokenInfo.type !== "Wrapper") {
      return undefined;
    }

    return getUnderlyingToken(superTokenInfo.underlyingTokenAddress);
  }, [superToken, getUnderlyingToken]);

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
      sx={{ pt: 3 }}
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
            <Stack gap={1}>
              <TextField
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                InputProps={{
                  endAdornment: underlyingToken && (
                    <Stack direction="row" alignItems="center" spacing={1} title={underlyingToken.address}>
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
                    <Stack direction="row" alignItems="center" spacing={1} title={superToken.address}>
                      <TokenAvatar tokenInfo={superToken} />
                      <Typography>{superToken.symbol}</Typography>
                    </Stack>
                  ),
                }}
              />
            </Stack>
          )}
        />
        {/* // TODO(KK): Handle Auto-Wrap */}
        {/* <Controller
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
        /> */}
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        <StepperContinueButton disabled={!isValid || isValidating}>
          Continue
        </StepperContinueButton>
        <Button
          variant="text"
          href="https://help.superfluid.finance/en/articles/7969656-why-do-i-need-to-wrap-tokens"
          target="_blank"
        >
          Why do I need to wrap tokens?
        </Button>
      </Stack>
    </Stack>
  );
}
