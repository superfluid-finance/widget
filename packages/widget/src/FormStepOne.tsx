import { Button } from "@mui/material";
import TokenAutoComplete from "./TokenAutocomplete";
import NetworkAutocomplete from "./NetworkAutocomplete";
import FormStep from "./FormStep";

export default function FormStepOne() {
  return (
    <FormStep title="Choose network and token">
      <NetworkAutocomplete />
      <TokenAutoComplete />
      <Button fullWidth variant="contained">
        Continue
      </Button>
    </FormStep>
  );
}
