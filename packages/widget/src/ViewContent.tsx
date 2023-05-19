import ProductCard from "./ProductCard";
import Stepper from "./Stepper";
import CheckoutFormProvider from "./FormProvider";
import { CommandHandlerProvider } from "./CommandHandlerProvider";
import { CheckoutSummary } from "./CheckoutSummary";
import { Transactions } from "./Transactions";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function ViewContent() {
  const theme = useTheme();

  return (
    <Container
      fixed
      disableGutters
      sx={{
        width: theme.breakpoints.values.sm, // TODO(KK): Check with Mikk.
        bgcolor: theme.palette.background.default, // TODO: Think if this is best.
      }}
    >
      <CheckoutFormProvider>
        <ProductCard />
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
      </CheckoutFormProvider>
    </Container>
  );
}
