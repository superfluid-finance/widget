import { Box, Stack, StepContent } from "@mui/material";
import AutocompleteToken from "./AutocompleteToken";
import AutocompleteNetwork from "./AutocompleteNetwork";
import { useFormContext } from "react-hook-form";
import { DraftFormValues, ValidFormValues } from "./formValues";
import { StepperContinueButton } from "./StepperContinueButton";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

export default function StepContentPaymentOption() {
  const { watch } = useFormContext<DraftFormValues, ValidFormValues>();
  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);
  const isStepComplete = !!network && !!paymentOptionWithTokenInfo;
  
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  
  return (
    <StepContent TransitionProps={{ unmountOnExit: false }}>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="space-around"
        spacing={3}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Box sx={{ width: "100%" }}>
            <AutocompleteNetwork />
          </Box>
          <Box sx={{ width: "100%" }}>
            <AutocompleteToken />
          </Box>
        </Stack>
        <StepperContinueButton
          disabled={!isStepComplete}
          {...(!isConnected && { onClick: () => open() })}
        >
          {isConnected ? "Continue" : "Connect Wallet to Continue"}
        </StepperContinueButton>
      </Stack>
    </StepContent>  
  );
}
