import CloseIcon_ from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useCommandHandler } from "./CommandHandlerContext";
import ContractWriteButton from "./ContractWriteButton";
import { ContractWriteCircularProgress } from "./ContractWriteCircularProgress";
import { ContractWriteStatus } from "./ContractWriteStatus";
import { useStepper } from "./StepperContext";
import { normalizeIcon } from "./helpers/normalizeIcon";
import { SendStreamCommand, WrapIntoSuperTokensCommand } from "./commands";
import { z } from "zod";
import { getPublicClient } from "wagmi/actions";
import { erc20ABI, mapTimePeriodToSeconds } from "./core";
import { useQuery, useQueryClient } from "wagmi";

// const {
//   data: underlyingTokenOrNativeAssetBalance,
//   isLoading: isBalanceLoading,
// } = useBalance({
//   chainId: cmd.chainId,
//   address: cmd.accountAddress,
//   token: isNativeAssetSuperToken ? undefined : cmd.underlyingTokenAddress,
// });

// const result = wrapIntoSuperTokensCommandSchema.safeParse({
//   ...cmd,
//   underlyingTokenOrNativeAssetBalance:
//     underlyingTokenOrNativeAssetBalance?.value,
// });

// const wrapIntoSuperTokensCommandSchema = z
//   .custom<
//     WrapIntoSuperTokensCommand & {
//       underlyingTokenOrNativeAssetBalance: bigint;
//     }
//   >()
//   .refine((x) => x.amountWei < x.underlyingTokenOrNativeAssetBalance, {
//     message: "Insufficient balance",
//   });

// const sendStreamCommandSchema = z
//   .custom<SendStreamCommand>()
//   .refine(
//     (x) => x.accountAddress.toLowerCase() !== x.receiverAddress.toLowerCase(),
//     {
//       message: "Can't stream to yourself.",
//     }
//   );

const commandValidationSchema = z
  .object({
    wrapIntoSuperTokensCommand: z
      .custom<WrapIntoSuperTokensCommand>()
      .refine(
        async (cmd) => {
          const publicClient = getPublicClient({ chainId: cmd.chainId });

          const balance = cmd.isNativeAssetSuperToken
            ? await publicClient.getBalance({ address: cmd.accountAddress })
            : await publicClient.readContract({
                abi: erc20ABI,
                address: cmd.underlyingTokenAddress,
                functionName: "balanceOf",
                args: [cmd.accountAddress],
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
          x.accountAddress.toLowerCase() !== x.receiverAddress.toLowerCase(),
        {
          message: "Can't stream to yourself.",
        },
      ),
  })
  .refine(
    async ({ sendStreamCommand: cmd }) => {
      const publicClient = getPublicClient({ chainId: cmd.chainId });

      const balance = await publicClient.readContract({
        abi: erc20ABI,
        address: cmd.superTokenAddress,
        functionName: "balanceOf",
        args: [cmd.accountAddress],
      });

      // Account for initial wrap.

      return (
        balance >
        (cmd.flowRate.amountWei * 86400n) /
          BigInt(mapTimePeriodToSeconds(cmd.flowRate.period))
      );
    },
    {
      message: "Need to leave 24 hour worth of balance in the Super Token.",
    },
  );

const CloseIcon = normalizeIcon(CloseIcon_);

export function StepContentTransactions() {
  const { handleBack, handleNext } = useStepper();

  const {
    sessionId,
    commands,
    contractWrites,
    contractWriteResults,
    writeIndex,
  } = useCommandHandler(); // Cleaner to pass with props.

  useEffect(() => {
    if (writeIndex > 0 && writeIndex === contractWriteResults.length) {
      // TODO(KK): Check for success statuses. Maybe if not everything is a success, provide an explicit continue button.
      handleNext(); // i.e. all transactions handled
    }
  }, [writeIndex, contractWriteResults, handleNext]);

  const total = contractWrites.length;
  const currentResult = contractWriteResults[writeIndex];

  const { data: validationResult } = useQuery(["sessionId"], () =>
    commandValidationSchema.safeParseAsync({
      wrapIntoSuperTokensCommand: commands.find(
        (x) => x.type === "Wrap into Super Tokens",
      ),
      sendStreamCommand: commands.find((x) => x.type === "Send Stream"),
    }),
  );

  console.log({
    validationResult,
  });

  return (
    <Box>
      <Stack alignItems="end">
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleBack}
          aria-label="back"
          sx={{ mr: -1 }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack
        direction="column"
        gap={2.25}
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
        <Box textAlign="center">
          <Typography variant="h5" component="span">
            {`You're almost there!`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Send the transactions from your wallet to finish your purchase.
          </Typography>
        </Box>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <ContractWriteCircularProgress
            thickness={4}
            size={80}
            index={writeIndex}
            total={total}
          />
        </Stack>
        <Stack gap={1}>{contractWriteResults.map(ContractWriteStatus)}</Stack>
        {/* // TODO(KK): We're not currently displaying the error anywhere.
        {currentResult?.relevantError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {currentResult.relevantError.shortMessage}
          </Alert>
        )} */}
        {currentResult && <ContractWriteButton {...currentResult} />}
      </Stack>
    </Box>
  );
}
