import ProductCard from "./ProductCard";
import CheckoutStepper from "./Stepper";
import CheckoutFormProvider from "./FormProvider";

export function ViewContent() {
  return (
    <CheckoutFormProvider>
      <ProductCard />
      <CheckoutStepper />
    </CheckoutFormProvider>
  );
}
