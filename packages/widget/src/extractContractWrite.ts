import { ChainId } from "superfluid-checkout-core";
import { ContractFunctionConfig } from "viem";
import { nanoid } from "nanoid";

export type ContractWrite = ContractFunctionConfig & {
  id: string;
  chainId: ChainId | number;
  commandId: string;
};

export const extractContractWrite = ({
  commandId,
  abi,
  functionName,
  chainId,
  address,
  args,
}: Omit<ContractWrite, "id">): ContractWrite => {
  return {
    commandId,
    id: nanoid(),
    abi,
    functionName,
    chainId,
    address,
    args,
  };
};
