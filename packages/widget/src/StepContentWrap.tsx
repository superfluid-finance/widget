import {
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
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { zeroAddress } from "viem";
import { Address, useBalance } from "wagmi";

import { ChainId } from "./core/SupportedNetwork.js";
import { DraftFormValues } from "./formValues.js";
import { UpgradeIcon } from "./previews/CommandPreview.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { TokenAvatar } from "./TokenAvatar.js";
import {
  mapFlowRateToDefaultWrapAmount,
  mapPersonalDataToObject,
} from "./utils.js";
import { useWidget } from "./WidgetContext.js";

interface WrapCardProps extends PropsWithChildren {
  token?: TokenInfo;
  formattedTokenBalance?: string;
  dataTest?: string;
}
const WrapCard: FC<WrapCardProps> = ({
  children,
  token,
  formattedTokenBalance,
  dataTest,
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
          data-testid={`${dataTest}-wrap-card`}
          component={Paper}
          variant="outlined"
          direction="row"
          alignItems="center"
          spacing={0.5}
          title={token.address}
          sx={{ pl: 1.25, pr: 2, py: 1, borderRadius: 0.5 }}
        >
          <TokenAvatar
            data-testid={`${dataTest}-icon`}
            tokenInfo={token}
            sx={{ width: 24, height: 24 }}
          />
          <Typography data-testid={`${dataTest}-symbol`} variant="body1">
            {token.symbol}
          </Typography>
        </Stack>
      )}

      <Typography
        data-testid={`${dataTest}-balance`}
        variant="caption"
        align="right"
        color="text.secondary"
        sx={{
          visibility: formattedTokenBalance ? "visible" : "hidden",
          gridColumn: "1/3",
        }}
      >
        {`Balance: ${formattedTokenBalance}`}
      </Typography>
    </Paper>
  );
};

export default function StepContentWrap({ stepIndex }: StepProps) {
  const theme = useTheme();
  const [focusedOnce, setFocusedOnce] = useState(false);

  const {
    control: c,
    setValue,
    watch,
    formState: { isValid, isValidating },
  } = useFormContext<DraftFormValues>();

  const { paymentDetails } = useWidget();

  const [accountAddress, paymentOptionWithTokenInfo, flowRate, personalData] =
    watch([
      "accountAddress",
      "paymentOptionWithTokenInfo",
      "flowRate",
      "personalData",
    ]);

  const superToken = paymentOptionWithTokenInfo?.superToken;
  const { getUnderlyingToken, getNativeAsset, eventHandlers } = useWidget();

  // Find the underlying token of the Super Token.
  const underlyingToken = useMemo(() => {
    if (!superToken) {
      return undefined;
    }

    const superTokenInfo = superToken.extensions.superTokenInfo;
    if (superTokenInfo.type === "Wrapper") {
      return getUnderlyingToken(
        superToken.chainId,
        superTokenInfo.underlyingTokenAddress,
      );
    }

    if (superTokenInfo.type === "Native Asset") {
      return getNativeAsset(superToken.chainId as ChainId);
    }

    return undefined;
  }, [superToken, getUnderlyingToken, getNativeAsset]);

  // TODO(KK): Probably don't need to do so much null-checking.

  const { data: underlyingTokenBalance } = useBalance(
    paymentOptionWithTokenInfo && underlyingToken && accountAddress
      ? {
          token:
            underlyingToken.address === zeroAddress
              ? undefined
              : (underlyingToken.address as Address),
          address: accountAddress,
          chainId: paymentOptionWithTokenInfo.paymentOption.chainId,
          formatUnits: underlyingToken.decimals,
        }
      : undefined,
  );

  const { data: superTokenBalance } = useBalance(
    paymentOptionWithTokenInfo && superToken && accountAddress
      ? {
          token: superToken.address as Address,
          address: accountAddress,
          chainId: paymentOptionWithTokenInfo.paymentOption.chainId,
          formatUnits: "ether", // Super Tokens are always 18 decimals.
        }
      : undefined,
  );

  const showSkip = useMemo(() => {
    if (!paymentOptionWithTokenInfo || !superTokenBalance) return false;

    if (!flowRate?.amountEther) return false;

    const minWrapAmount = mapFlowRateToDefaultWrapAmount(
      paymentDetails.defaultWrapAmount,
      flowRate,
    );

    return BigInt(superTokenBalance.value) >= minWrapAmount;
  }, [superTokenBalance, paymentOptionWithTokenInfo, flowRate]);

  const { handleNext } = useStepper();

  useEffect(() => {
    eventHandlers.onRouteChange({
      route: "step_wrap",
      ...mapPersonalDataToObject(personalData),
    });
  }, [eventHandlers.onRouteChange]);

  const onContinue = useCallback(() => {
    eventHandlers.onButtonClick({ type: "next_step" });
    handleNext(stepIndex);
  }, [handleNext, eventHandlers.onButtonClick, stepIndex]);

  const onSkipWrapping = useCallback(() => {
    eventHandlers.onButtonClick({ type: "skip_step" });
    setValue("wrapAmountInUnits", "" as `${number}`);
    handleNext(stepIndex);
  }, [handleNext, setValue, eventHandlers.onButtonClick, stepIndex]);

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
        name="wrapAmountInUnits"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { isTouched },
        }) => (
          <Stack direction="column" justifyContent="center" alignItems="center">
            <WrapCard
              dataTest="underlying"
              token={underlyingToken}
              formattedTokenBalance={underlyingTokenBalance?.formatted}
            >
              <Input
                data-testid="wrap-amount-input"
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
              dataTest="super"
              token={superToken}
              formattedTokenBalance={superTokenBalance?.formatted}
            >
              <Input
                data-testid="wrap-amount-mirror-amount"
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
                  data-testid="we-recommend-message"
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.75, alignSelf: "start" }}
                >
                  We recommend wrapping at least{" "}
                  {paymentDetails.defaultWrapAmount.multiplier}{" "}
                  {paymentDetails.defaultWrapAmount.period ?? flowRate.period}
                  {paymentDetails.defaultWrapAmount.multiplier > 1
                    ? "s"
                    : ""}{" "}
                  of the subscription amount.
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

      <Stack direction="column" spacing={2.5} textAlign="center">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
          <StepperCTAButton
            disabled={!isValid || isValidating}
            onClick={onContinue}
          >
            Continue
          </StepperCTAButton>
          {showSkip && (
            <StepperCTAButton
              variant="outlined"
              color="primary"
              onClick={onSkipWrapping}
            >
              Skip this step
            </StepperCTAButton>
          )}
        </Stack>
        <Link
          data-testid="why-wrap-tokens-button"
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
