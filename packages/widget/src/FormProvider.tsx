import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { DraftFormValues, FormReturn as FormMethods } from "./formValues";
import { DevTool } from "@hookform/devtools";
import { ChildrenProp } from "./utils";
import { FormEffects } from "./FormEffects";
import { useCheckout } from "./CheckoutContext";

type Props = {
  children: ((formMethods: FormMethods) => ChildrenProp) | ChildrenProp;
};

export default function CheckoutFormProvider({ children }: Props) {
  const { paymentDetails } = useCheckout();

  const defaultValues: DraftFormValues = {
    accountAddress: null,
    network: null,
    paymentOptionWithTokenInfo: null,
    wrapAmountEther: "" as `${number}`,
    enableAutoWrap: false,
    receiverAddress: paymentDetails.receiverAddress,
  };

  const formMethods: FormMethods = useForm({
    defaultValues,
  });

  return (
    <RHFFormProvider {...formMethods}>
      {typeof children === "function" ? children(formMethods) : children}
      <FormEffects />
      <DevTool control={formMethods.control} placement="bottom-left" />
    </RHFFormProvider>
  );
}
