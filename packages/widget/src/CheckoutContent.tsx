import CheckoutProduct from "./CheckoutProduct";
import Stepper from "./Stepper";
import FormProvider from "./FormProvider";
import { CheckoutSummary } from "./CheckoutSummary";
import {
  AppBar,
  Box,
  Card,
  IconButton,
  Toolbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CommandHandlerProvider } from "./CommandHandlerProvider";

export function CheckoutContent() {
  return (
    <FormProvider>
      <CheckoutProduct />
      <Card variant="outlined" sx={{ m: 3 }}>
        <CommandHandlerProvider>
          {({ status }) => {
            switch (status) {
              case "idle":
              case "initiated":
              case "pending":
                return <Stepper />;
              case "success":
                return <CheckoutSummary />;
            }
          }}
        </CommandHandlerProvider>
      </Card>
    </FormProvider>
  );
}
