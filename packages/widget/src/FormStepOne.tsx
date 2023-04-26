import { Button } from "@mui/material";
import TokenAutoComplete from "./TokenAutocomplete";
import NetworkAutocomplete from "./NetworkAutocomplete";

export default function FormStepOne() {
  return (
    <>
      <NetworkAutocomplete />
      <TokenAutoComplete />
      <Button fullWidth variant="contained">
        Continue
      </Button>
    </>
  );
}

// TODO: Move to utils somewhere.
export function findOrThrow<T>(arr: T[], predicate: (value: T) => boolean): T {
  const result = arr.find(predicate);
  if (result === undefined) {
    throw new Error("Element not found in array");
  }
  return result;
}
