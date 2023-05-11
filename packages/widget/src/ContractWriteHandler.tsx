import { useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ContractWrite } from "./extractContractWrite";

export type ContractWriteResult = {
  write?: () => void;
  prepareStatus: "error" | "success" | "loading" | "idle";
  writeStatus: "error" | "success" | "loading" | "idle";
  transactionStatus: "error" | "success" | "loading" | "idle";
  isLoading: boolean;
  isFinished: boolean;
};

type ContractWriteHandlerProps = {
  contractWrite: ContractWrite;
  onChange: (result: ContractWriteResult) => void;
};

export function ContractWriteHandler({
  contractWrite,
  onChange
}: ContractWriteHandlerProps) {
  const {
    config,
    status: prepareStatus,
    isLoading: isPrepareLoading,
  } = usePrepareContractWrite({ ...contractWrite });

  const {
    write,
    data,
    status: writeStatus,
    isLoading: isWriteLoading,
  } = useContractWrite(config);

  const { status: transactionStatus, isLoading: isTransactionLoading } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  useEffect(() => {
    onChange({
      write,
      prepareStatus,
      writeStatus,
      transactionStatus,
      isLoading: isPrepareLoading || isWriteLoading || isTransactionLoading,
      isFinished: transactionStatus === "success",
    });
  }, [
    write,
    prepareStatus,
    writeStatus,
    isPrepareLoading,
    isWriteLoading,
    isTransactionLoading,
  ]);

  return null;
}
