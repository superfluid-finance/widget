import ProductCard from "./ProductCard";
import CheckoutStepper from "./Stepper";
import CheckoutFormProvider from "./FormProvider";

export function ModalContent() {
  return (
    <CheckoutFormProvider>
      <ProductCard />
      <CheckoutStepper />
    </CheckoutFormProvider>
  );
}
