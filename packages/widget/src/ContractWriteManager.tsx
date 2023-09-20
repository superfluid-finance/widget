import { useEffect, useMemo } from "react";
import {
  BaseError,
  TransactionExecutionError,
  UserRejectedRequestError,
} from "viem";
import {
  useAccount,
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
  const { isConnected, address: accountAddress } = useAccount();

  const signatureResult = useSignTypedData(contractWrite.signatureRequest);

  // Add all known errors to the ABI so viem/wagmi could decode them.
  const materialized = useMemo(
    () =>
      !contractWrite.signatureRequest || signatureResult.data
        ? contractWrite.materialize(signatureResult.data)
        : undefined,
    [contractWrite.id, signatureResult.data],
  );

  const { eventListeners } = useWidget();

  const prepare =
    accountAddress &&
    _prepare &&
    materialized &&
    contractWrite.chainId === chain?.id;

  const prepareResult = usePrepareContractWrite({
    ...(prepare ? materialized : undefined),
    onError: console.error,
  });

  // Always have a write ready.
  const writeResult = useContractWrite({
    ...(prepare
      ? prepareResult.isError
        ? {
            mode: "prepared",
            request: {
              account: accountAddress,
              chain: chain,
              abi: materialized.abi,
              address: materialized.address,
              functionName: materialized.functionName,
              args: materialized.args,
              value: materialized.value,
              gas: 2_500_000n, // Set _some_ kind of a limit more reasonable than the default 28_500_000.
            },
          }
        : prepareResult.isSuccess
        ? prepareResult.config
        : {}
      : {}),
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
    prepareResult.fetchStatus,
    writeResult.status,
    transactionResult.status,
    signatureResult.status,
    transactionResult.fetchStatus,
  ]);

  useEffect(() => void onChange?.(result), [result]);

  return null;
}
