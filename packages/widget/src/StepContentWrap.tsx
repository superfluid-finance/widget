import {
  Button,
  FormControlLabel,
  FormGroup,
  Paper,
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
import { Address, useBalance } from "wagmi";
import { UpgradeIcon } from "./previews/CommandPreview";

export default function StepContentWrap() {
  const {
    control: c,
    watch,
    formState: { isValid, isValidating },
  } = useFormContext<DraftFormValues>();
  const [paymentOptionWithTokenInfo, accountAddress] = watch([
    "paymentOptionWithTokenInfo",
    "accountAddress",
  ]);

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

  // TODO(KK): Probably don't need to do so much null-checking.

  const { data: underlyingTokenBalance } = useBalance(
    paymentOptionWithTokenInfo && underlyingToken && accountAddress
      ? {
          token: underlyingToken.address as Address,
          address: accountAddress,
          chainId: paymentOptionWithTokenInfo.paymentOption.chainId,
          formatUnits: "ether",
        }
      : undefined
  );

  const { data: superTokenBalance } = useBalance(
    paymentOptionWithTokenInfo && superToken && accountAddress
      ? {
          token: superToken.address as Address,
          address: accountAddress,
          chainId: paymentOptionWithTokenInfo.paymentOption.chainId,
          formatUnits: "ether",
        }
      : undefined
  );

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
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={3}
            >
              <TextField
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="0"
                helperText={
                  underlyingTokenBalance ? (
                    <Typography fontSize="inherit" align="right">
                      Balance:{" "}
                      {approximateIfDecimal(underlyingTokenBalance.formatted)}
                    </Typography>
                  ) : null
                }
                InputProps={{
                  endAdornment: underlyingToken && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      title={underlyingToken.address}
                    >
                      <TokenAvatar tokenInfo={underlyingToken} />
                      <Typography>{underlyingToken.symbol}</Typography>
                    </Stack>
                  ),
                }}
              />
              <Stack component={Paper} sx={{ p: 1, mb: 3 }}>
                <UpgradeIcon fontSize="small" />
              </Stack>

              <TextField
                disabled
                value={value}
                placeholder="0"
                helperText={
                  superTokenBalance ? (
                    <Typography
                      fontSize="inherit"
                      color="text.secondary"
                      align="right"
                    >
                      Balance:{" "}
                      {approximateIfDecimal(superTokenBalance.formatted)}
                    </Typography>
                  ) : null
                }
                InputProps={{
                  endAdornment: superToken && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      title={superToken.address}
                    >
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

function approximateIfDecimal(numStr: string): string {
  const hasDecimal = numStr.includes(".");
  if (hasDecimal) {
    const integerPart = numStr.split(".")[0];
    return `≈${integerPart}`;
  }
  return numStr;
}
