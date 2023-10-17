import { PropsWithChildren, useEffect, useState } from "react";
import { parseEther } from "viem";

import {
  FlowRate,
  flowRateSchema,
  mapTimePeriodToSeconds,
  PersonalData,
  TimePeriod,
} from "./core/index.js";

export type ChildrenProp = PropsWithChildren["children"];

// https://github.com/ethers-io/ethers.js/blob/13593809bd61ef24c01d79de82563540d77098db/src.ts/constants/numbers.ts#L21
export const MaxUint256 = BigInt(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
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

export function shortenHex(address: string, length = 4) {
  return `${address.substring(0, 2 + length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
}

export function serializeRegExp(regex: RegExp): string {
  return regex.toString();
}

export function deserializeRegExp(serialized: string): RegExp {
  const match = serialized.match(/^\/(.*?)\/([gimsuy]*)$/);
  if (!match) {
    throw new Error("Invalid serialized RegExp");
  }
  const [_, pattern, flags] = match;

  return new RegExp(pattern, flags);
}

export async function copyToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

export const absoluteValue = (n: bigint) => {
  return n >= 0 ? n : -n;
};

export function toFixedUsingString(numStr: string, decimalPlaces: number) {
  const [wholePart, decimalPart] = numStr.split(".");

  if (!decimalPart || decimalPart.length <= decimalPlaces) {
    return numStr.padEnd(wholePart.length + 1 + decimalPlaces, "0");
  }

  const decimalPartBigInt = BigInt(decimalPart.slice(0, decimalPlaces + 1));

  const round = decimalPartBigInt % 10n >= 5n;
  const roundedDecimal = decimalPartBigInt / 10n + (round ? 1n : 0n);

  return (
    wholePart + "." + roundedDecimal.toString().padStart(decimalPlaces, "0")
  );
}

export function mapPersonalDataToObject(personalData: PersonalData) {
  return personalData?.length > 0
    ? {
        data: personalData.reduce(
          (acc, { label, value }) => ({ ...acc, [label.toLowerCase()]: value }),
          {},
        ),
      }
    : ({} as Record<string, string>);
}

export function mapFlowRateToDefaultWrapAmount(
  defaultWrapAmount: {
    multiplier: number;
    period?: TimePeriod;
  },
  flowRate?: FlowRate,
): bigint {
  if (!flowRate) {
    return 0n;
  }

  // TODO(KK): not the cleanest solution to validate here...
  const validation = flowRateSchema
    .refine((x) => parseEther(x.amountEther) > 0n)
    .safeParse(flowRate);
  if (!validation.success) {
    return 0n;
  }

  const flowRatePerSecond =
    parseEther(flowRate.amountEther) /
    BigInt(mapTimePeriodToSeconds(flowRate.period));

  const trueWrapAmount =
    flowRatePerSecond *
    BigInt(defaultWrapAmount.multiplier) *
    BigInt(mapTimePeriodToSeconds(defaultWrapAmount.period ?? flowRate.period));
  const wrapAmountRounded = roundWeiToPrettyAmount(trueWrapAmount);
  return wrapAmountRounded;
}

// "23023402845098425" will become "0000000000000000"
/**
 * Round wei amount to a pretty amount so that when it's converted to ethers amount it would not have many decimals.
 * @example
 * "23023402845098425" will become "20000000000000000"
 * "26834587324572943" will become "30000000000000000"
 */
function roundWeiToPrettyAmount(value: bigint) {
  let valueAsString = value.toString();

  let firstDigit = parseInt(valueAsString[0]);
  let secondDigit = parseInt(valueAsString[1] || "0"); // '0' as a fallback for one-digit numbers

  // Keep the order if the second number is less than 5.
  if (secondDigit >= 5) {
    firstDigit++;
  }

  // After this create a string of zeroes having length of str.length - 1
  let zeroes = "0".repeat(valueAsString.length - 1);

  // Concatenate firstDigit and zeroes to get the final number
  let result = firstDigit.toString().concat(zeroes);

  return BigInt(result);
}

/**
 * Combines members of an intersection into a readable type.
 *
 * @link https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
 * @example
 * type Result = Prettify<{ a: string } | { b: string } | { c: number, d: bigint }>
 * //   ^? type Result = { a: string; b: string; c: number; d: bigint }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
