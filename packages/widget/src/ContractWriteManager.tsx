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
  useSignTypedData,
  useWaitForTransaction,
} from "wagmi";

import { ContractWrite } from "./ContractWrite.js";
import { TxFunctionName } from "./EventListeners.js";
import { useWidget } from "./WidgetContext.js";

export type ContractWriteResult = {
  contractWrite: ContractWrite;
  signatureResult: ReturnType<typeof useSignTypedData>;
  prepareResult: ReturnType<typeof usePrepareContractWrite>;
  writeResult: ReturnType<typeof useContractWrite>;
  transactionResult: ReturnType<typeof useWaitForTransaction>;
  currentError: BaseError | null;
};

export type ContractWriteManagerProps = {
  prepare: boolean;
  contractWrite: ContractWrite;
  onChange?: (result: ContractWriteResult) => void;
};

export function ContractWriteManager({
  prepare: _prepare,
  contractWrite,
  onChange,
}: ContractWriteManagerProps) {
  const { chain } = useNetwork();

  const signatureResult = useSignTypedData(contractWrite.signatureRequest);

  const materialized = useMemo(
    () =>
      !contractWrite.signatureRequest || signatureResult.data
        ? contractWrite.materialize(signatureResult.data)
        : undefined,
    [contractWrite.id, signatureResult.data],
  );

  const { eventListeners } = useWidget();

  const prepare =
    _prepare && materialized && contractWrite.chainId === chain?.id;

  const prepareResult = usePrepareContractWrite({
    ...(prepare ? materialized : undefined),
    onError: console.error,
  });

  // Always have a write ready.
  const writeResult = useContractWrite({
    ...(prepareResult.config.request
      ? (prepareResult.config as any) // TODO(KK): any
      : {
          mode: "prepared",
          request: materialized,
        }),
    onError: console.error,
    onSuccess: ({ hash }) =>
      eventListeners.onTransactionSent?.({
        hash,
        functionName: materialized?.functionName as TxFunctionName,
      }),
  });

  const transactionResult = useWaitForTransaction({
    hash: writeResult.data?.hash,
    onError: console.error,
  });

  const result: ContractWriteResult = useMemo(() => {
    if (
      writeResult.isError &&
      writeResult.error instanceof TransactionExecutionError
    ) {
      if (
        writeResult.error.cause instanceof UserRejectedRequestError ||
        writeResult.error.walk() instanceof UserRejectedRequestError
      ) {
        writeResult.reset(); // Clear wallet rejection errors.
      }
    }

    return {
      contractWrite,
      prepareResult: prepareResult as ReturnType<
        typeof usePrepareContractWrite
      >,
      writeResult,
      transactionResult,
      signatureResult,
      currentError: (transactionResult.error ||
        (transactionResult.isSuccess ? null : writeResult.error) ||
        (writeResult.isSuccess ? null : prepareResult.error) ||
        signatureResult.error) as unknown as BaseError | null,
    };
  }, [
    contractWrite.id,
    prepareResult.status,
    writeResult.status,
    transactionResult.status,
    signatureResult.status,
  ]);

  // console.log({
  //   currentError: result.currentError,
  //   writeResult
  // })

  // # Retry
  // useEffect(() => {
  //   if (prepare && result.currentError && result.currentError === prepareResult.error) {
  //     const timeoutId = setTimeout(() => prepareResult.refetch(), 5000);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [prepare, result.currentError, prepareResult.error, prepareResult.refetch]);

  useEffect(() => void onChange?.(result), [result]);

  return null;
}
