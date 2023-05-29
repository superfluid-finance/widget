import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { DraftFormValues, FormReturn as FormMethods } from "./formValues";
import { DevTool } from "@hookform/devtools";
import { ChildrenProp } from "./utils";
import { FormEffects } from "./FormEffects";
import { useNetwork } from "wagmi";
import { useWidget } from "./WidgetContext";
import { useMemo } from "react";

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
      (x) => x.paymentOption.chainId === defaultNetwork.id
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
    wrapAmountEther: "" as `${number}`,
    enableAutoWrap: false,
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
