import ProductCard from "./ProductCard";
import CheckoutStepper from "./CheckoutStepper";
import CheckoutFormProvider from "./CheckoutFormProvider";

export function CheckoutContent() {
  return (
    <CheckoutFormProvider>
      <ProductCard />
      <CheckoutStepper />
    </CheckoutFormProvider>
  );
}
