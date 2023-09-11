import { useEffect, useMemo } from "react";
import {
  BaseError,
  TransactionExecutionError,
  UserRejectedRequestError,
} from "viem";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { ContractWrite } from "./ContractWrite.js";
import { ChildrenProp } from "./utils.js";

export type ContractWriteResult = {
  contractWrite: ContractWrite;
  prepareResult: ReturnType<typeof usePrepareContractWrite>;
  writeResult: ReturnType<typeof useContractWrite>;
  transactionResult: ReturnType<typeof useWaitForTransaction>;
  currentError: BaseError | null;
};

type ContractWriteManagerProps = {
  prepare: boolean;
  contractWrite: ContractWrite;
  onChange?: (result: ContractWriteResult) => void;
  children?: (result: ContractWriteResult) => ChildrenProp;
};

export function ContractWriteManager({
  prepare: _prepare,
  contractWrite,
  onChange,
  children,
}: ContractWriteManagerProps) {
  const { chain } = useNetwork();
  const prepare = _prepare && contractWrite.chainId === chain?.id;

  const prepareResult = usePrepareContractWrite({
    ...(prepare ? contractWrite : undefined),
    onError: console.error,
  });

  // Always have a write ready.
  const writeResult = useContractWrite({
    ...(prepareResult.config.request
      ? (prepareResult.config as unknown as ContractWrite)
      : contractWrite),
    onError: console.error,
  }); // TODO(KK): Get rid of any.

  useEffect(() => {
    if (writeResult.error instanceof TransactionExecutionError) {
      if (writeResult.error.walk() instanceof UserRejectedRequestError) {
        writeResult.reset(); // Clear wallet rejection errors.
      }
    }
  }, [writeResult.error]);

  const transactionResult = useWaitForTransaction({
    hash: writeResult.data?.hash,
    onError: console.error,
  });

  const result: ContractWriteResult = useMemo(
    () => ({
      contractWrite,
      prepareResult: prepareResult as ReturnType<
        typeof usePrepareContractWrite
      >, // TODO(KK): weird type mismatch
      writeResult,
      transactionResult,
      currentError: (transactionResult.error ||
        (transactionResult.isSuccess ? null : writeResult.error) ||
        (writeResult.isSuccess
          ? null
          : prepareResult.error)) as unknown as BaseError | null,
    }),
    [
      contractWrite.id,
      prepareResult.status,
      writeResult.status,
      transactionResult.status,
    ],
  );

  useEffect(() => void onChange?.(result), [result]);

  return <>{children?.(result)}</>;
}
