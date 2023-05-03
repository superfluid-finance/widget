import { PrepareWriteContractConfig } from "@wagmi/core";
import {
  Abi,
  ExtractAbiFunction,
} from "abitype";
import { Signer } from "ethers";

export type ContractWrite = PrepareWriteContractConfig;

export const extractContractWrite = <
  TAbi extends Abi = Abi,
  TFunctionName extends string = string,
  TChainId extends number = number,
  TSigner extends Signer = Signer
>(
  getConfig: PrepareWriteContractConfig<TAbi, TFunctionName, TChainId, TSigner>
): PrepareWriteContractConfig<
  [ExtractAbiFunction<TAbi, TFunctionName>],
  TFunctionName,
  TChainId,
  TSigner
> => {
  return getConfig as unknown as PrepareWriteContractConfig<
    [ExtractAbiFunction<TAbi, TFunctionName>],
    TFunctionName,
    TChainId,
    TSigner
  >;
};
