import { Box } from "@mui/material";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import { FormProvider, useForm } from "react-hook-form";
import { DraftForm, ValidForm } from "./formSchema";

// type Step = {
//   title: string;
//   content: ReactNode;
// };

// const steps: Step[] = [
//   {
//     title: "Choose network and token",
//     content: <FormStepOne />,
//   },
//   {
//     title: "Wrap",
//     content: <div>Wrap</div>,
//   },
//   {
//     title: "Review the transaction",
//     content: <div>Review the transaction</div>,
//   },
// ];

export default function FormStepper() {
  const defaultValues: DraftForm = {
    senderAddress: null,
    network: null,
    paymentOptionWithTokenInfo: null,
    wrapAmountEther: "",
    enableAutoWrap: null,
    receiverAddress: null,
  };
  const formMethods = useForm<DraftForm, any, ValidForm>({
    defaultValues,
  });

  return (
    <Box>
      <FormProvider {...formMethods}>
        <FormStepOne />
        <FormStepTwo />
        <FormStepThree />
      </FormProvider>
    </Box>
  );
}
