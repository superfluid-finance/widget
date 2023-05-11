import { PrepareWriteContractConfig } from "@wagmi/core";
import { useEffect } from "react";
import { Signer } from "ethers";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export type WagmiOverrides = PrepareWriteContractConfig["overrides"];

export type ContractWriteResult = {
  write?: () => void;
  prepareStatus: "error" | "success" | "loading" | "idle";
  writeStatus: "error" | "success" | "loading" | "idle";
  transactionStatus: "error" | "success" | "loading" | "idle";
  isLoading: boolean;
  isFinished: boolean;
};

type ContractWriteHandlerProps = {
  enabled: boolean;
  signer: Signer;
  contractWrite: PrepareWriteContractConfig;
  onChange: (result: ContractWriteResult) => void;
  overrides?: WagmiOverrides;
};

export function ContractWriteHandler({
  enabled,
  signer,
  contractWrite,
  onChange,
  overrides,
}: ContractWriteHandlerProps) {
  const {
    config,
    status: prepareStatus,
    isLoading: isPrepareLoading,
  } = usePrepareContractWrite({ ...contractWrite, signer, overrides });

  const {
    write,
    data,
    status: writeStatus,
    isLoading: isWriteLoading,
  } = useContractWrite(config as any); // TODO(KK): Any way to get rid of the any?

  const { status: transactionStatus, isLoading: isTransactionLoading } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  useEffect(() => {
    onChange({
      write,
      prepareStatus,
      writeStatus,
      transactionStatus,
      isLoading: isPrepareLoading || isWriteLoading || isTransactionLoading,
      isFinished: transactionStatus === "success",
    });
  }, [
    write,
    prepareStatus,
    writeStatus,
    isPrepareLoading,
    isWriteLoading,
    isTransactionLoading,
  ]);

  return null;
}
