import { ChainId } from "./core";
import { ContractFunctionConfig } from "viem";
import { nanoid } from "nanoid";

export type ContractWrite = ContractFunctionConfig & {
  id: string;
  commandId: string;
  displayTitle: string;
  chainId: ChainId | number;
};

export const createContractWrite = ({
  commandId,
  displayTitle,
  chainId,
  abi,
  functionName,
  address,
  args,
}: Omit<ContractWrite, "id">): ContractWrite => ({
  id: nanoid(),
  commandId,
  displayTitle,
  chainId,
  abi,
  functionName,
  address,
  args,
});
