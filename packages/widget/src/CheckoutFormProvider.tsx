import { useForm, FormProvider } from "react-hook-form";
import { CheckoutFormDraft, CheckoutForm } from "./CheckoutForm";
import { DevTool } from "@hookform/devtools";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function CheckoutFormProvider({ children }: Props) {
  const defaultValues: CheckoutFormDraft = {
    senderAddress: null,
    network: null,
    paymentOptionWithTokenInfo: null,
    wrapAmountEther: "",
    enableAutoWrap: null,
    receiverAddress: null,
  };

  const formMethods = useForm<CheckoutFormDraft, any, CheckoutForm>({
    defaultValues,
  });

  return (
    <FormProvider {...formMethods}>
      {children}
      <DevTool control={formMethods.control} placement="bottom-left" />
    </FormProvider>
  );
}
