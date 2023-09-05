import { useEffect, useMemo } from "react";
import { BaseError } from "viem";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSignTypedData,
  useWaitForTransaction,
} from "wagmi";

import { ContractWrite } from "./ContractWrite.js";
import { ChildrenProp } from "./utils.js";

export type ContractWriteResult = {
  contractWrite: ContractWrite;
  signatureResult: ReturnType<typeof useSignTypedData>;
  prepareResult: ReturnType<typeof usePrepareContractWrite>;
  writeResult: ReturnType<typeof useContractWrite>;
  transactionResult: ReturnType<typeof useWaitForTransaction>;
  latestError: BaseError | null;
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

  const prepare =
    _prepare && materialized && contractWrite.chainId === chain?.id;
  const prepareResult = usePrepareContractWrite(
    prepare ? materialized : undefined,
  );

  const writeResult = useContractWrite(prepareResult.config);
  const transactionResult = useWaitForTransaction({
    hash: writeResult.data?.hash,
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
      latestError: (transactionResult.error ||
        writeResult.error ||
        prepareResult.error ||
        signatureResult.error) as unknown as BaseError,
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
