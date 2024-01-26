import { Box, Collapse, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";

import FlowRateInput from "./FlowRateInput.js";
import { DraftFormValues } from "./formValues.js";
import NetworkAutocomplete from "./NetworkAutocomplete.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import TokenAutocomplete from "./TokenAutocomplete.js";
import { useWidget } from "./WidgetContext.js";

export default function StepContentPaymentOption({ stepIndex }: StepProps) {
  const {
    watch,
    control,
    formState: { isValid, isValidating },
  } = useFormContext<DraftFormValues>();

  const [paymentOptionWithTokenInfo] = watch(["paymentOptionWithTokenInfo"]);
  const showCustomFlowRateInput = Boolean(
    paymentOptionWithTokenInfo &&
      paymentOptionWithTokenInfo.paymentOption.flowRate === undefined,
  );

  const isStepComplete = isValid && !isValidating; // Might be better to solve with "getFieldState".
  const { isConnected, address } = useAccount();

  const [nextStepOnConnect, setNextOnConnect] = useState(false);

  const { handleNext } = useStepper();
  useEffect(() => {
    if (nextStepOnConnect && isConnected && isStepComplete) {
      setNextOnConnect(false);
      handleNext(stepIndex);
    }
  }, [handleNext, nextStepOnConnect, isConnected, isStepComplete, stepIndex]);

  const {
    walletManager: { open: openWalletManager },
    eventHandlers,
    getNetwork,
  } = useWidget();

  useEffect(() => {
    eventHandlers.onRouteChange({
      route: "step_payment_option",
    });
  }, [eventHandlers.onRouteChange]);

  const onContinue = useCallback(() => {
    eventHandlers.onButtonClick({ type: "next_step" });
    handleNext(stepIndex);
  }, [handleNext, eventHandlers.onButtonClick]);

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
      sx={{ pb: 3, px: 3.5 }}
    >
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ position: "relative" }}
        >
          <Box sx={{ width: "100%" }}>
            <NetworkAutocomplete />
          </Box>
          <Box sx={{ width: "100%" }}>
            <TokenAutocomplete />
          </Box>
        </Stack>
        <Collapse in={showCustomFlowRateInput} appear={false}>
          <Box sx={{ pt: 2 }}>
            <Controller
              control={control}
              name="flowRate"
              render={({ field: { value, onChange, onBlur } }) => (
                <FlowRateInput
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Box>
        </Collapse>
      </Box>
      {!isConnected ? (
        <StepperCTAButton
          onClick={() => {
            openWalletManager({
              chain: paymentOptionWithTokenInfo?.paymentOption?.chainId
                ? getNetwork(paymentOptionWithTokenInfo.paymentOption.chainId)
                : undefined,
            });
            setNextOnConnect(true);
            eventHandlers.onButtonClick({ type: "connect_wallet" });
          }}
        >
          Connect Wallet to Continue
        </StepperCTAButton>
      ) : (
        <StepperCTAButton disabled={!isStepComplete} onClick={onContinue}>
          Continue
        </StepperCTAButton>
      )}
    </Stack>
  );
}
