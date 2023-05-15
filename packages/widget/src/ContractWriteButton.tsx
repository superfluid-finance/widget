import { LoadingButton } from "@mui/lab"
import { ContractWriteResult } from "./ContractWriteHandler";
import { ContractWrite } from "./extractContractWrite";

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