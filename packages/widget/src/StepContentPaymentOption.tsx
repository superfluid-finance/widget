import { Box, Button, Stack, StepContent } from "@mui/material";
import AutocompleteToken from "./AutocompleteToken";
import AutocompleteNetwork from "./AutocompleteNetwork";
import { useFormContext } from "react-hook-form";
import { DraftFormValues, ValidFormValues } from "./formValues";
import { useStepper } from "./StepperContext";
import { formValuesToCommands } from "./formValuesToCommands";
import { useCommandHandler } from "./CommandHandlerContext";

export default function StepContentPaymentOption() {
  const { handleNext, isPenultimateStep } = useStepper();
  const { setCommands } = useCommandHandler();
  const { watch, handleSubmit } = useFormContext<DraftFormValues>();
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
        <Button
          disabled={!isStepComplete}
          variant="contained"
          onClick={() => {
            if (isPenultimateStep()) {
              handleSubmit((values) => {
                const commands = formValuesToCommands(
                  values as ValidFormValues // TODO(KK): This is better in next version of react-hook-form.
                );
                setCommands(commands);
                handleNext();
              })();
            } else {
              handleNext();
            }
          }}
        >
          Continue
        </Button>
      </Stack>
    </StepContent>  
  );
}
