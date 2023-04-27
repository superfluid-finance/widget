import ProductCard from "./ProductCard";
import FormStepper from "./FormStepper";
import { FormProvider, useForm } from "react-hook-form";

export function CheckoutContent() {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      <ProductCard />
      <FormStepper />
    </FormProvider>
  );
}
