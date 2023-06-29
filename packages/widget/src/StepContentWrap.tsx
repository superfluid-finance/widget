import {
  Box,
  Collapse,
  Fade,
  Input,
  Link,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { TokenInfo } from "@superfluid-finance/tokenlist";
import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { parseEther } from "viem";
import { Address, useBalance } from "wagmi";
import { StepperContinueButton } from "./StepperContinueButton";
import { TokenAvatar } from "./TokenAvatar";
import { useWidget } from "./WidgetContext";
import { DraftFormValues } from "./formValues";
import { UpgradeIcon } from "./previews/CommandPreview";

interface WrapCardProps extends PropsWithChildren {
  token?: TokenInfo;
  formattedTokenBalance?: string;
}
const WrapCard: FC<WrapCardProps> = ({
  children,
  token,
  formattedTokenBalance,
}) => {
  return (
    <Paper
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        px: 2.5,
        py: 1.5,
        rowGap: 0.75,
      }}
    >
      {children}

      {token && (
        <Stack
          component={Paper}
          variant="outlined"
          direction="row"
          alignItems="center"
          gap={0.5}
          title={token.address}
          sx={{ pl: 1.25, pr: 2, py: 1, borderRadius: 0.5 }}
        >
          <TokenAvatar tokenInfo={token} sx={{ width: 24, height: 24 }} />
          <Typography variant="body1">{token.symbol}</Typography>
        </Stack>
      )}

      <Box />

      <Typography
        variant="caption"
        align="right"
        color="text.secondary"
        sx={{ visibility: formattedTokenBalance ? "visible" : "hidden" }}
      >
        {`Balance: ${
          formattedTokenBalance && approximateIfDecimal(formattedTokenBalance)
        }`}
      </Typography>
    </Paper>
  );
};

export default function StepContentWrap() {
  const theme = useTheme();
  const [focusedOnce, setFocusedOnce] = useState(false);

  const {
    control: c,
    setValue,
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

  const showSkip = useMemo(() => {
    if (!paymentOptionWithTokenInfo || !superTokenBalance) return false;

    const flowRate = paymentOptionWithTokenInfo.paymentOption.flowRate;

    if (!flowRate) return false;

    const minAmount = parseEther(flowRate.amountEther);

    return BigInt(superTokenBalance.value) > minAmount;
  }, [superTokenBalance]);

  const onSkipWrapping = () => setValue("wrapAmountEther", "" as `${number}`);

  const onInputFocus = () => setFocusedOnce(true);

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
      sx={{ pt: 1, pb: 3, px: 3.5 }}
    >
      <Controller
        control={c}
        name="wrapAmountEther"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { isTouched },
        }) => (
          <Stack direction="column" justifyContent="center" alignItems="center">
            <WrapCard
              token={underlyingToken}
              formattedTokenBalance={underlyingTokenBalance?.formatted}
            >
              <Input
                disableUnderline
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onInputFocus}
                placeholder="0"
                inputProps={{
                  sx: {
                    p: 0,
                    ...theme.typography.h4,
                  },
                }}
              />
            </WrapCard>

            <Stack
              component={Paper}
              sx={{ p: 0.75, my: -1.25, transform: "rotate(90deg)" }}
            >
              <UpgradeIcon fontSize="small" />
            </Stack>

            <WrapCard
              token={superToken}
              formattedTokenBalance={superTokenBalance?.formatted}
            >
              <Input
                disableUnderline
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onInputFocus}
                placeholder="0"
                inputProps={{
                  sx: {
                    p: 0,
                    ...theme.typography.h4,
                  },
                }}
              />
            </WrapCard>
            <Collapse in={focusedOnce || isTouched} timeout={400}>
              <Fade in={focusedOnce || isTouched} timeout={400}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.75, alignSelf: "start" }}
                >
                  We recommend wrapping at least 1 month of the subscription
                  amount.
                </Typography>
              </Fade>
            </Collapse>
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

      <Stack direction="column" gap={2.5} textAlign="center">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          gap={1.5}
        >
          <StepperContinueButton disabled={!isValid || isValidating}>
            Continue
          </StepperContinueButton>
          {showSkip && (
            <StepperContinueButton
              variant="outlined"
              color="primary"
              onClick={onSkipWrapping}
            >
              Skip this step
            </StepperContinueButton>
          )}
        </Stack>
        <Link
          underline="hover"
          href="https://help.superfluid.finance/en/articles/7969656-why-do-i-need-to-wrap-tokens"
          target="_blank"
        >
          Why do I need to wrap tokens?
        </Link>
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
