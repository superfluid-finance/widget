import { PropsWithChildren } from "react";

export type Children = PropsWithChildren["children"];

// https://github.com/ethers-io/ethers.js/blob/13593809bd61ef24c01d79de82563540d77098db/src.ts/constants/numbers.ts#L21
export const MaxUint256 = BigInt(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);
