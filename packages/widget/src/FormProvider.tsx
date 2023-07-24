import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider as RHFFormProvider, useForm } from "react-hook-form";
import { useNetwork } from "wagmi";

import { FormEffects } from "./FormEffects.js";
import {
  checkoutFormSchema,
  DraftFormValues,
  FormReturn as FormMethods,
  ValidFormValues,
} from "./formValues.js";
import { ChildrenProp } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

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
