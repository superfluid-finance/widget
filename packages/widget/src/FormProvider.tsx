import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import {
  DraftFormValues,
  FormReturn as FormMethods,
  ValidFormValues,
  checkoutFormSchema,
} from "./formValues";
import { ChildrenProp } from "./utils";
import { FormEffects } from "./FormEffects";
import { useNetwork } from "wagmi";
import { useWidget } from "./WidgetContext";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  children: ((formMethods: FormMethods) => ChildrenProp) | ChildrenProp;
};

export default function FormProvider({ children }: Props) {
  const { chain } = useNetwork();
  const { networks, paymentOptionWithTokenInfoList } = useWidget();

  const defaultNetwork = useMemo(() => {
    if (networks.length === 1) {
      return networks[0];
    }
    return networks.find((network) => network.id === chain?.id) ?? null;
  }, [chain, networks]);

  const defaultPaymentOption = useMemo(() => {
    if (!defaultNetwork) {
      return null;
    }

    const networkPaymentOptions = paymentOptionWithTokenInfoList.filter(
      (x) => x.paymentOption.chainId === defaultNetwork.id,
    );

    if (networkPaymentOptions.length === 1) {
      return networkPaymentOptions[0];
    }

    return null;
  }, [defaultNetwork, paymentOptionWithTokenInfoList]);

  const defaultValues: DraftFormValues = {
    accountAddress: null,
    network: defaultNetwork,
    paymentOptionWithTokenInfo: defaultPaymentOption,
    wrapAmountInUnits:
      defaultPaymentOption?.paymentOption?.flowRate?.amountEther ?? "0",
    enableAutoWrap: false,
    flowRate: defaultPaymentOption?.paymentOption?.flowRate ?? {
      amountEther: "0",
      period: "month",
    },
  };

  const formMethods: FormMethods = useForm<
    DraftFormValues,
    undefined,
    ValidFormValues
  >({
    defaultValues,
    resolver: zodResolver(checkoutFormSchema),
  });

  return (
    <RHFFormProvider {...formMethods}>
      {typeof children === "function" ? children(formMethods) : children}
      <FormEffects />
    </RHFFormProvider>
  );
}
