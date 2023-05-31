import CheckoutProduct from "./CheckoutProduct";
import Stepper from "./Stepper";
import FormProvider from "./FormProvider";
import { Card } from "@mui/material";
import { CommandHandlerProvider } from "./CommandHandlerProvider";

export function CheckoutContent() {
  return (
    <FormProvider>
      <CheckoutProduct />
      <Card variant="outlined" sx={{ m: 3 }}>
        <CommandHandlerProvider>
          <Stepper />
        </CommandHandlerProvider>
      </Card>
    </FormProvider>
  );
}
