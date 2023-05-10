import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { DraftFormValues, FormReturn as FormMethods } from "./formValues";
import { DevTool } from "@hookform/devtools";
import { Children } from "./utils";
import { FormEffects } from "./FormEffects";

type Props = {
  children: ((formMethods: FormMethods) => Children) | Children;
};

export default function CheckoutFormProvider({ children }: Props) {
  const defaultValues: DraftFormValues = {
    accountAddress: null,
    network: null,
    paymentOptionWithTokenInfo: null,
    wrapAmountEther: "" as `${number}`,
    enableAutoWrap: false,
    receiverAddress: null,
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
