import { Box, Button, Stack, StepContent as MUIStepContent } from "@mui/material";
import AutocompleteToken from "./AutocompleteToken";
import AutocompleteNetwork from "./AutocompleteNetwork";
import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import { useStepper } from "./StepperContext";

export default function StepContentPaymentOption() {
  const { handleNext } = useStepper();
  const { watch } = useFormContext<DraftFormValues>();

  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);
  const isStepComplete = !!network && !!paymentOptionWithTokenInfo;

  return (
    <MUIStepContent TransitionProps={{ unmountOnExit: false }}>
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
    </MUIStepContent>
  );
}
