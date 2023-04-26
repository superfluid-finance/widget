import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import FormStepper from "./FormStepper";

export function CheckoutContent() {
  return (
    <Box>
      <ProductCard />
      <FormStepper />
    </Box>
  );
}
