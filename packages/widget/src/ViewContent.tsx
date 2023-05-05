import ProductCard from "./ProductCard";
import Stepper from "./Stepper";
import CheckoutFormProvider from "./FormProvider";
import { CommandHandlerProvider } from "./CommandHandlerProvider";
import { CheckoutSummary } from "./CheckoutSummary";
import { Transactions } from "./Transactions";
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function ViewContent() {
  return (
    <Container maxWidth="md" disableGutters>
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
                    <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
                      <Toolbar>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={cancelHandling}
                          aria-label="back"
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
    </Container>
  );
}
