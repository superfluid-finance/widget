import {
  Abi,
  ContractFunctionName,
  ContractFunctionParameters,
  GetValue,
} from "viem";

import { ChainId } from "./core/index.js";

type ExpectedMutability = "payable" | "nonpayable";

export type ContractWrite = ContractFunctionParameters<
  Abi,
  ExpectedMutability,
  ContractFunctionName<Abi, ExpectedMutability>
> &
  GetValue<Abi, string> & {
    id: string;
    commandId: string;
    displayTitle: string;
    chainId: ChainId | number;
  };
