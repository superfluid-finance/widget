import { useEffect, useMemo } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ContractWrite } from "./extractContractWrite";
import { Children } from "./utils";

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
  onChange?: (result: ContractWriteResult) => void;
  children?: (result: ContractWriteResult) => Children;
};

export function ContractWriteHandler({
  contractWrite,
  onChange,
  children,
}: ContractWriteHandlerProps) {
  const {
    config,
    isError: isPrepareError,
    error: prepareError,
    status: prepareStatus,
    isLoading: isPrepareLoading,
  } = usePrepareContractWrite({ ...contractWrite, enabled: false });

  if (isPrepareError) {
    console.log({
      isPrepareError,
      prepareError,
    });
  }

  const {
    write,
    data,
    isError: isWriteError,
    error: writeError,
    status: writeStatus,
    isLoading: isWriteLoading,
  } = useContractWrite(config);

  if (isWriteError) {
    console.log({
      isWriteError,
      writeError,
    });
  }

  const { status: transactionStatus, isLoading: isTransactionLoading } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const result = useMemo(
    () => ({
      write,
      prepareStatus,
      writeStatus,
      transactionStatus,
      isLoading: isPrepareLoading || isWriteLoading || isTransactionLoading,
      isFinished: transactionStatus === "success",
    }),
    [
      write,
      prepareStatus,
      writeStatus,
      isPrepareLoading,
      isWriteLoading,
      isTransactionLoading,
    ]
  );

  useEffect(() => {
    onChange?.(result);
  }, [result]);

  return <>{children?.(result)}</>;
}
