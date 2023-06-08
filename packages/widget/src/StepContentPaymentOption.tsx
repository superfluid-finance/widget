import { Box, Stack } from "@mui/material";
import TokenAutocomplete from "./TokenAutocomplete";
import NetworkAutocomplete from "./NetworkAutocomplete";
import { useFormContext } from "react-hook-form";
import { DraftFormValues, ValidFormValues } from "./formValues";
import { StepperContinueButton } from "./StepperContinueButton";
import { useAccount } from "wagmi";
import { useWidget } from "./WidgetContext";

export default function StepContentPaymentOption() {
  const { watch } = useFormContext<DraftFormValues, ValidFormValues>();
  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);
  const isStepComplete = !!network && !!paymentOptionWithTokenInfo;

  const { isConnected } = useAccount();

  const {
    walletManager: { open: openWalletManager },
  } = useWidget();

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
      sx={{ py: 2 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Box sx={{ width: "100%" }}>
          <NetworkAutocomplete />
        </Box>
        <Box sx={{ width: "100%" }}>
          <TokenAutocomplete />
        </Box>
      </Stack>
      <StepperContinueButton
        disabled={!isStepComplete}
        {...(!isConnected && { onClick: () => openWalletManager() })}
      >
        {isConnected ? "Continue" : "Connect Wallet to Continue"}
      </StepperContinueButton>
    </Stack>
  );
}
