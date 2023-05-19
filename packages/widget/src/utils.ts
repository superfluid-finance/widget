import { PropsWithChildren, useEffect, useState } from "react";

export type ChildrenProp = PropsWithChildren["children"];

// https://github.com/ethers-io/ethers.js/blob/13593809bd61ef24c01d79de82563540d77098db/src.ts/constants/numbers.ts#L21
export const MaxUint256 = BigInt(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

// Inspired by: https://stackoverflow.com/a/67893529/6099842
export function useStateWithDep<T>(defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return [value, setValue] as const;
}