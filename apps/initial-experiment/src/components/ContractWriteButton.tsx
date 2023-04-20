import { LoadingButton } from "@mui/lab";
import { ContractWrite } from "../extractContractWrite";
import { ContractWriteResult } from "./ContractWriteHandler";

export type ContractWriteButtonProps = {
  data: ContractWrite;
  result: ContractWriteResult;
};

export default function ContractWriteButton({
  data: { functionName },
  result: { write, isLoading },
}: ContractWriteButtonProps) {
  return (
    <LoadingButton
      variant="contained"
      fullWidth
      disabled={!write}
      onClick={() => write?.()}
      loading={isLoading}
    >
      {functionName}
    </LoadingButton>
  );
}
