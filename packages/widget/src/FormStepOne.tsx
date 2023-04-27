import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import TokenAutoComplete from "./TokenAutocomplete";
import NetworkAutocomplete from "./NetworkAutocomplete";
import FormStep from "./FormStep";
import { useFormContext } from "react-hook-form";
import { DraftForm } from "./formSchema";

export default function FormStepOne() {
  const { watch } = useFormContext<DraftForm>();

  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);
  const isStepComplete = !!network && !!paymentOptionWithTokenInfo;

  return (
    <FormStep title="Select network and token">
      <Stack direction="column" alignItems="stretch" justifyContent="space-around" spacing={3}>
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
            <TokenAutoComplete />
          </Box>
        </Stack>
        <Button disabled={!isStepComplete} variant="contained">
          Continue
        </Button>
      </Stack>
    </FormStep>
  );
}
