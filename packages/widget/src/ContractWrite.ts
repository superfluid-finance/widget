import { Abi, ContractFunctionConfig, GetValue } from "viem";
import { ChainId } from "./core";

export type ContractWrite = ContractFunctionConfig<
  Abi,
  string,
  "payable" | "nonpayable"
> &
  GetValue<Abi, string> & {
    id: string;
    commandId: string;
    displayTitle: string;
    chainId: ChainId | number;
  };
