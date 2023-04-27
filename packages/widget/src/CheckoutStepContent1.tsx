import { Box, Button, Stack, StepContent } from "@mui/material";
import AutocompleteToken from "./AutocompleteToken";
import AutocompleteNetwork from "./AutocompleteNetwork";
import { useFormContext } from "react-hook-form";
import { CheckoutFormDraft } from "./CheckoutForm";
import { useStepper } from "./StepperContext";

export default function CheckoutStepContent1() {
  const { handleNext } = useStepper();
  const { watch } = useFormContext<CheckoutFormDraft>();

  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);
  const isStepComplete = !!network && !!paymentOptionWithTokenInfo;

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
        <Button disabled={!isStepComplete} variant="contained" onClick={handleNext}>
          Continue
        </Button>
      </Stack>
    </StepContent>
  );
}
