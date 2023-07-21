import { useEffect, useMemo } from "react";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ContractWrite } from "./ContractWrite.js";
import { ChildrenProp } from "./utils.js";
import { BaseError } from "viem";

export type ContractWriteResult = {
  contractWrite: ContractWrite;
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
  const prepare = _prepare && contractWrite.chainId === chain?.id;

  const prepareResult = usePrepareContractWrite(
    prepare ? contractWrite : undefined,
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
      latestError: (transactionResult.error ||
        writeResult.error ||
        prepareResult.error) as unknown as BaseError,
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
