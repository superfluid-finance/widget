import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { DraftFormValues, ValidFormValues } from "./formValues";
import { DevTool } from "@hookform/devtools";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function CheckoutFormProvider({ children }: Props) {
  const defaultValues: DraftFormValues = {
    senderAddress: null,
    network: null,
    paymentOptionWithTokenInfo: null,
    wrapAmountEther: "",
    enableAutoWrap: null,
    receiverAddress: null,
  };

  const formMethods = useForm<DraftFormValues, any, ValidFormValues>({
    defaultValues,
  });

  return (
    <RHFFormProvider {...formMethods}>
      {children}
      <DevTool control={formMethods.control} placement="bottom-left" />
    </RHFFormProvider>
  );
}
