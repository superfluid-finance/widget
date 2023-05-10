import { PrepareWriteContractConfig } from "@wagmi/core";
import {
  Abi,
  ExtractAbiFunction,
} from "abitype";

export type ContractWrite = PrepareWriteContractConfig;

export const extractContractWrite = <
  TAbi extends Abi = Abi,
  TFunctionName extends string = string,
  TChainId extends number = number
>(
  getConfig: Omit<PrepareWriteContractConfig<TAbi, TFunctionName, TChainId>, "walletClient">
): PrepareWriteContractConfig<
  [ExtractAbiFunction<TAbi, TFunctionName>],
  TFunctionName,
  TChainId
> => {
  return getConfig as unknown as PrepareWriteContractConfig<
    [ExtractAbiFunction<TAbi, TFunctionName>],
    TFunctionName,
    TChainId
  >;
};
