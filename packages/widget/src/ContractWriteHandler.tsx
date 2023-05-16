import { useEffect, useMemo } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ContractWrite } from "./extractContractWrite";
import { ChildrenProp } from "./utils";

export type ContractWriteResult = {
  contractWrite: ContractWrite;
  prepareResult: ReturnType<typeof usePrepareContractWrite>;
  writeResult: ReturnType<typeof useContractWrite>;
  transactionResult: ReturnType<typeof useWaitForTransaction>;
}

type ContractWriteHandlerProps = {
  prepare: boolean;
  contractWrite: ContractWrite;
  onChange?: (result: ContractWriteResult) => void;
  children?: (result: ContractWriteResult) => ChildrenProp;
};

export function ContractWriteHandler({
  prepare,
  contractWrite,
  onChange,
  children,
}: ContractWriteHandlerProps) {
  const prepareResult = usePrepareContractWrite(prepare ? { ...contractWrite } : undefined);
  const writeResult = useContractWrite(prepareResult.config);
  const transactionResult = useWaitForTransaction({
    hash: writeResult.data?.hash,
  });

  const result: ContractWriteResult = useMemo(
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
    console.log({
      result
    })
  }, [result]);

  return <>{children?.(result)}</>;
}
