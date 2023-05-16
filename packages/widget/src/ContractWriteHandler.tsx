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

export type ContractWriteResult2 = {
  contractWrite: ContractWrite;
  prepareResult: ReturnType<typeof usePrepareContractWrite>;
  writeResult: ReturnType<typeof useContractWrite>;
  transactionResult: ReturnType<typeof useWaitForTransaction>;
}

type ContractWriteHandlerProps = {
  contractWrite: ContractWrite;
  onChange?: (result: ContractWriteResult2) => void;
  children?: (result: ContractWriteResult2) => Children;
};

export function ContractWriteHandler({
  contractWrite,
  onChange,
  children,
}: ContractWriteHandlerProps) {
  const prepareResult = usePrepareContractWrite({ ...contractWrite });
  const writeResult = useContractWrite(prepareResult.config);
  const transactionResult = useWaitForTransaction({
    hash: writeResult.data?.hash,
  });

  const result: ContractWriteResult2 = useMemo(
    () => ({
      contractWrite,
      prepareResult,
      writeResult,
      transactionResult
    }),
    [
      contractWrite,
      prepareResult,
      writeResult,
      transactionResult
    ]
  );

  useEffect(() => {
    onChange?.(result);
  }, [result]);

  return <>{children?.(result)}</>;
}
