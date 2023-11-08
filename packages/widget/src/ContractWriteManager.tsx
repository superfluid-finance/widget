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
  useWaitForTransaction,
} from "wagmi";

import { ContractWrite } from "./ContractWrite.js";
import { errorsABI } from "./core/wagmi-generated.js";
import { TxFunctionName } from "./EventListeners.js";
import { useWidget } from "./WidgetContext.js";

export type ContractWriteResult = {
  contractWrite: ContractWrite;
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
  contractWrite: contractWrite_,
  onChange,
}: ContractWriteManagerProps) {
  const { chain } = useNetwork();
  const { isConnected, address: accountAddress } = useAccount();

  // Add all known errors to the ABI so viem/wagmi could decode them.
  const contractWrite = useMemo<ContractWrite>(
    () => ({
      ...contractWrite_,
      abi: contractWrite_.abi.slice().concat(errorsABI),
    }),
    [contractWrite_],
  );

  const prepare =
    accountAddress && _prepare && contractWrite.chainId === chain?.id;

  const { eventHandlers } = useWidget();

  const prepareResult = usePrepareContractWrite({
    ...(prepare
      ? {
          ...contractWrite,
          scopeKey: contractWrite.commandId,
          staleTime: 120_000,
        }
      : undefined),
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
              abi: contractWrite.abi,
              address: contractWrite.address,
              functionName: contractWrite.functionName,
              args: contractWrite.args,
              value: contractWrite.value,
              gas: 2_500_000n, // Set _some_ kind of a limit more reasonable than the default 28_500_000.
            },
          }
        : prepareResult.isSuccess
        ? prepareResult.config
        : {}
      : {}),
    onError: console.error,
    onSuccess: ({ hash }) =>
      eventHandlers.onTransactionSent?.({
        hash,
        functionName: contractWrite.functionName as TxFunctionName,
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
      currentError: (transactionResult.error ||
        (transactionResult.isSuccess ? null : writeResult.error) ||
        (writeResult.isSuccess
          ? null
          : prepareResult.error)) as unknown as BaseError | null,
    };
  }, [
    contractWrite.id,
    prepareResult.status,
    prepareResult.fetchStatus,
    writeResult.status,
    transactionResult.status,
    transactionResult.fetchStatus,
  ]);

  useEffect(() => void onChange?.(result), [result]);

  return null;
}
