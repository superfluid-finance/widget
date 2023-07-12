import { Box, Collapse, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import FlowRateInput from "./FlowRateInput";
import NetworkAutocomplete from "./NetworkAutocomplete";
import { StepperContinueButton } from "./StepperContinueButton";
import TokenAutocomplete from "./TokenAutocomplete";
import { useWidget } from "./WidgetContext";
import { DraftFormValues, ValidFormValues } from "./formValues";

export default function StepContentPaymentOption() {
  const { watch, control } = useFormContext<DraftFormValues, ValidFormValues>();
  const [network, paymentOptionWithTokenInfo, flowRate] = watch([
    "network",
    "paymentOptionWithTokenInfo",
    "flowRate",
  ]);

  const showCustomFlowRateInput = Boolean(
    paymentOptionWithTokenInfo &&
      paymentOptionWithTokenInfo.paymentOption.flowRate === undefined,
  );

  const isStepComplete = Boolean(
    network && flowRate?.amountEther && Number(flowRate?.amountEther) > 0, // TODO(KK): Refactor this to come from form validation
  );

  const { isConnected } = useAccount();

  const {
    walletManager: { open: openWalletManager },
  } = useWidget();

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

      <StepperContinueButton
        disabled={!isStepComplete}
        {...(!isConnected && { onClick: () => openWalletManager() })}
      >
        {isConnected ? "Continue" : "Connect Wallet to Continue"}
      </StepperContinueButton>
    </Stack>
  );
}
