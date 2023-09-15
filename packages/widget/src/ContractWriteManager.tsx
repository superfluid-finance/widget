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
import { ChildrenProp } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

export type ContractWriteResult = {
  contractWrite: ContractWrite;
  signatureResult: ReturnType<typeof useSignTypedData>;
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
      : materialized),
    onError: console.error,
    onSuccess: ({ hash }) =>
      eventListeners.onTransactionSent?.({
        hash,
        functionName: materialized?.functionName as TxFunctionName,
      }),
  });

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
      signatureResult,
      currentError: (transactionResult.error ||
        (transactionResult.isSuccess ? null : writeResult.error) ||
        (writeResult.isSuccess ? null : prepareResult.error) ||
        signatureResult.error) as unknown as BaseError | null,
    }),
    [
      contractWrite.id,
      prepareResult.status,
      writeResult.status,
      transactionResult.status,
      signatureResult.status,
    ],
  );

  useEffect(() => void onChange?.(result), [result]);

  return <>{children?.(result)}</>;
}
