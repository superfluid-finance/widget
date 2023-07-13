import { useMemo } from "react";
import { z } from "zod";
import { SendStreamCommand, WrapIntoSuperTokensCommand } from "./commands";
import { mapTimePeriodToSeconds } from "./core";
import { fetchBalance } from "wagmi/actions";

export const useCommandValidation = () =>
  useMemo(
    () =>
      z
        .object({
          wrapIntoSuperTokensCommand: z
            .custom<WrapIntoSuperTokensCommand>()
            .refine(
              async (cmd) => {
                const { value: balance } = await fetchBalance({
                  chainId: cmd.chainId,
                  address: cmd.accountAddress,
                  token: cmd.isNativeAssetSuperToken
                    ? undefined
                    : cmd.underlyingTokenAddress,
                });

                console.log({
                  balance,
                });

                return cmd.amountWei < balance;
              },
              {
                message: "Insufficient balance",
              },
            )
            .optional(),
          sendStreamCommand: z
            .custom<SendStreamCommand>()
            .refine(
              (x) =>
                x.accountAddress.toLowerCase() !==
                x.receiverAddress.toLowerCase(),
              {
                message: "Can't stream to yourself.",
              },
            ),
        })
        .refine(
          async ({ sendStreamCommand: cmd }) => {
            const { value: balance } = await fetchBalance({
              chainId: cmd.chainId,
              address: cmd.accountAddress,
              token: cmd.superTokenAddress,
            });

            // Account for initial wrap.

            return (
              balance >
              (cmd.flowRate.amountWei * 86400n) /
                BigInt(mapTimePeriodToSeconds(cmd.flowRate.period))
            );
          },
          {
            message:
              "Need to leave 24 hour worth of balance in the Super Token.",
          },
        ),
    [],
  );
