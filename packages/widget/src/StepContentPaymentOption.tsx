import { Box, Collapse, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import FlowRateInput from "./FlowRateInput";
import NetworkAutocomplete from "./NetworkAutocomplete";
import { StepperCTAButton } from "./StepperCTAButton";
import TokenAutocomplete from "./TokenAutocomplete";
import { useWidget } from "./WidgetContext";
import { DraftFormValues } from "./formValues";
import { useStepper } from "./StepperContext";
import { useEffect, useState } from "react";

export default function StepContentPaymentOption() {
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
  const { isConnected } = useAccount();

  const [nextStepOnConnect, setNextOnConnect] = useState(false);

  useEffect(() => {
    if (nextStepOnConnect && isConnected) {
      setNextOnConnect(false);
      handleNext();
    }
  }, [nextStepOnConnect, isConnected]);

  const {
    walletManager: { open: openWalletManager },
  } = useWidget();

  const { handleNext } = useStepper();

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="space-around"
      gap={3}
      sx={{ pb: 3, px: 3.5 }}
    >
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
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
            openWalletManager();
            setNextOnConnect(true);
          }}
        >
          Connect Wallet to Continue
        </StepperCTAButton>
      ) : (
        <StepperCTAButton disabled={!isStepComplete} onClick={handleNext}>
          Continue
        </StepperCTAButton>
      )}
    </Stack>
  );
}
