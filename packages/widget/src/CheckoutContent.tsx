import ProductCard from "./ProductCard";
import Stepper from "./Stepper";
import CheckoutFormProvider from "./FormProvider";
import { CheckoutSummary } from "./CheckoutSummary";
import { Transactions } from "./Transactions";
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
    <CheckoutFormProvider>
      <ProductCard />
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
              default:
                return (
                  <Box>
                    <AppBar
                      sx={{ position: "relative" }}
                      color="transparent"
                      elevation={0}
                    >
                      <Toolbar>
                        <IconButton
                          edge="start"
                          color="inherit"
                          // onClick={reset}
                          aria-label="back"
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <Transactions />
                  </Box>
                );
            }
          }}
        </CommandHandlerProvider>
      </Card>
    </CheckoutFormProvider>
  );
}
