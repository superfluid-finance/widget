import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Input,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { FC, PropsWithChildren, useMemo } from "react";
import { useWidget } from "./WidgetContext";
import { TokenAvatar } from "./TokenAvatar";
import { StepperContinueButton } from "./StepperContinueButton";
import { Address, useBalance } from "wagmi";
import { UpgradeIcon } from "./previews/CommandPreview";
import { TokenInfo } from "@superfluid-finance/tokenlist";

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

      {formattedTokenBalance && (
        <Typography variant="caption" align="right" color="text.secondary">
          {`Balance: ${approximateIfDecimal(formattedTokenBalance)}`}
        </Typography>
      )}
    </Paper>
  );
};

export default function StepContentWrap() {
  const theme = useTheme();

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
      sx={{ py: 2 }}
    >
      <Controller
        control={c}
        name="wrapAmountEther"
        render={({ field: { value, onChange, onBlur } }) => (
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
                placeholder="0"
                inputProps={{
                  sx: {
                    p: 0,
                    ...theme.typography.h4,
                  },
                }}
              />
            </WrapCard>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.75, alignSelf: "start" }}
            >
              We recommend wrapping at least 1 month of the subscription amount.
            </Typography>
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
