import {
  Abi,
  Address,
  ContractFunctionConfig,
  encodeFunctionData,
  GetValue,
} from "viem";
import { useSignTypedData } from "wagmi";

import { ChainId } from "./core/index.js";

export type ContractWrite = {
  id: string;
  displayTitle: string;
  commandId: string;
  chainId: ChainId | number;
  signatureRequest?: Parameters<typeof useSignTypedData>[0];
  materialize: (
    signature?: ReturnType<typeof useSignTypedData>["data"],
  ) => ContractFunctionConfig<Abi, string, "payable" | "nonpayable"> &
    GetValue<Abi, string>;
  materializeForBatchCall?: (
    signature?: ReturnType<typeof useSignTypedData>["data"],
  ) => Readonly<{
    operationType: number;
    target: Address;
    data: ReturnType<typeof encodeFunctionData>;
    value: bigint;
  }>;
};
