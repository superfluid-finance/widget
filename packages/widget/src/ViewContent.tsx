import ProductCard from "./ProductCard";
import Stepper from "./Stepper";
import CheckoutFormProvider from "./FormProvider";
import { CommandHandlerProvider } from "./CommandHandlerProvider";
import { CheckoutSummary } from "./CheckoutSummary";
import { Transactions } from "./Transactions";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function ViewContent() {
  return (
    <CheckoutFormProvider>
      <ProductCard />
      <CommandHandlerProvider>
        {({ status, cancelHandling }) => {
          switch (status) {
            case "idle":
              return <Stepper />;
            case "handling":
              return (
                <Box>
                  <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={cancelHandling}
                        aria-label="close"
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                  <Transactions />
                </Box>
              );
            case "success":
              return <CheckoutSummary />;
          }
        }}
      </CommandHandlerProvider>
    </CheckoutFormProvider>
  );
}
