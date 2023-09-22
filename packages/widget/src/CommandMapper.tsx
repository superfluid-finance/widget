import { nanoid } from "nanoid";
import { useEffect, useMemo } from "react";
import {
  Abi,
  Address,
  ContractFunctionConfig,
  encodeAbiParameters,
  encodeFunctionData,
  GetValue,
  hexToSignature,
  parseAbiParameters,
} from "viem";
import { useContractRead, useContractReads, useSignTypedData } from "wagmi";

import {
  Command,
  EnableAutoWrapCommand,
  SubscribeCommand,
  WrapIntoSuperTokensCommand,
} from "./commands.js";
import { ContractWrite } from "./ContractWrite.js";
import {
  autoWrapManagerABI,
  autoWrapManagerAddress,
  autoWrapStrategyAddress,
  cfAv1ForwarderABI,
  cfAv1ForwarderAddress,
  constantFlowAgreementV1ABI,
  constantFlowAgreementV1Address,
  erc20ABI,
  mapTimePeriodToSeconds,
  nativeAssetSuperTokenABI,
  permitUnderlyingABI,
  superTokenABI,
  superUpgraderABI,
  superUpgraderAddress,
} from "./core/index.js";
import { MaxUint256 } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

export type CommandMapperProps<TCommand extends Command = Command> = {
  command: TCommand;
  onMapped?: (result: {
    commandId: string;
    contractWrites: ReadonlyArray<ContractWrite>;
  }) => void;
};

export function CommandMapper({ command: cmd, ...props }: CommandMapperProps) {
  const { getUnderlyingToken } = useWidget();

  switch (cmd.type) {
    case "Enable Auto-Wrap":
      return <EnableAutoWrapCommandMapper command={cmd} {...props} />;
    case "Wrap into Super Tokens":
      const underlyingToken = cmd.underlyingToken.address
        ? getUnderlyingToken(cmd.underlyingToken.address)
        : undefined;
      if (underlyingToken && underlyingToken.tags?.includes("permit")) {
        return (
          <PermitWrapIntoSuperTokensCommandMapper command={cmd} {...props} />
        );
      } else {
        return <WrapIntoSuperTokensCommandMapper command={cmd} {...props} />;
      }
    case "Subscribe":
      return <SubscribeCommandMapper command={cmd} {...props} />;
  }
}

export function PermitWrapIntoSuperTokensCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<WrapIntoSuperTokensCommand>) {
  const { getSuperToken, getUnderlyingToken } = useWidget();

  const isNativeAssetUnderlyingToken = cmd.underlyingToken.isNativeAsset;

  const { data: allowance, isSuccess } = useContractRead(
    !isNativeAssetUnderlyingToken
      ? {
          chainId: cmd.chainId,
          address: cmd.underlyingToken.address,
          abi: erc20ABI,
          functionName: "allowance",
          args: [cmd.accountAddress, cmd.superTokenAddress],
        }
      : undefined,
  );

  const { data: nonce, isLoading: isNonceLoading } = useContractRead(
    !isNativeAssetUnderlyingToken
      ? {
          chainId: cmd.chainId,
          address: cmd.underlyingToken.address,
          abi: permitUnderlyingABI,
          functionName: "nonces",
          args: [cmd.accountAddress],
        }
      : undefined,
  );

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (isNativeAssetUnderlyingToken) {
      contractWrites_.push(
        createContractWrite({
          commandId: cmd.id,
          displayTitle: `Wrap to ${
            getSuperToken(cmd.superTokenAddress).symbol
          }`,
          chainId: cmd.chainId,
          materialize: () => ({
            abi: nativeAssetSuperTokenABI,
            functionName: "upgradeByETH",
            address: cmd.superTokenAddress,
            value: cmd.amountWeiFromUnderlyingTokenDecimals,
          }),
          materializeForBatchCall: () => [
            101,
            cmd.superTokenAddress,
            {
              abi: nativeAssetSuperTokenABI,
              functionName: "upgradeByETH",
              address: cmd.superTokenAddress,
              value: cmd.amountWeiFromUnderlyingTokenDecimals,
            },
          ],
        }),
      );
    } else {
      if (allowance !== undefined) {
        const underlyingTokenAddress = cmd.underlyingToken.address;
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: `Approve ${
              getUnderlyingToken(underlyingTokenAddress).symbol
            } Allowance & Wrap`,
            chainId: cmd.chainId,
            signatureRequest: {
              types: {
                EIP712Domain: [
                  {
                    name: "name",
                    type: "string",
                  },
                  {
                    name: "version",
                    type: "string",
                  },
                  {
                    name: "chainId",
                    type: "uint256",
                  },
                  {
                    name: "verifyingContract",
                    type: "address",
                  },
                ],
                Permit: [
                  {
                    name: "owner",
                    type: "address",
                  },
                  {
                    name: "spender",
                    type: "address",
                  },
                  {
                    name: "value",
                    type: "uint256",
                  },
                  {
                    name: "nonce",
                    type: "uint256",
                  },
                  {
                    name: "deadline",
                    type: "uint256",
                  },
                ],
              },
              primaryType: "Permit",
              domain: {
                name: "Fake Permit USDC",
                version: "1",
                chainId: cmd.chainId,
                verifyingContract: underlyingTokenAddress,
              },
              message: {
                owner: cmd.accountAddress,
                spender:
                  superUpgraderAddress[
                    cmd.chainId as keyof typeof superUpgraderAddress
                  ],
                value: BigInt(
                  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                ),
                nonce: nonce,
                deadline:
                  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              },
            },
            materialize: (signature) => {
              const sig = hexToSignature(signature!);

              return {
                abi: superUpgraderABI,
                functionName: "upgradeWithPermit",
                address:
                  superUpgraderAddress[
                    cmd.chainId as keyof typeof superUpgraderAddress
                  ],
                value: 100000000000000000n,
                args: [
                  cmd.superTokenAddress,
                  cmd.amountWeiFromSuperTokenDecimals,
                  BigInt(
                    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                  ),
                  BigInt(
                    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                  ),
                  Number(sig.v.toString()),
                  sig.r,
                  sig.s,
                  "0x",
                ] as const,
              };
            },
            materializeForBatchCall: (signature) => {
              const sig = hexToSignature(signature!);

              return [
                202,
                superUpgraderAddress[
                  cmd.chainId as keyof typeof superUpgraderAddress
                ],
                {
                  abi: superUpgraderABI,
                  functionName: "upgradeWithPermit",
                  address:
                    superUpgraderAddress[
                      cmd.chainId as keyof typeof superUpgraderAddress
                    ],
                  value: 100000000000000000n,
                  args: [
                    cmd.superTokenAddress,
                    cmd.amountWeiFromSuperTokenDecimals,
                    BigInt(
                      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    ),
                    BigInt(
                      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    ),
                    Number(sig.v.toString()),
                    sig.r,
                    sig.s,
                    "0x",
                  ] as const,
                },
              ];
            },
          }),
        );
      }
    }

    return contractWrites_;
  }, [cmd.id, isSuccess, nonce]);

  useEffect(
    () =>
      isSuccess ? onMapped?.({ commandId: cmd.id, contractWrites }) : void 0,
    [cmd.id, contractWrites, isSuccess],
  );

  return null;
}

export function EnableAutoWrapCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<EnableAutoWrapCommand>) {
  const { getUnderlyingToken } = useWidget();

  const { data, isSuccess } = useContractReads({
    contracts: [
      {
        chainId: cmd.chainId,
        address: autoWrapManagerAddress[cmd.chainId],
        abi: autoWrapManagerABI,
        functionName: "getWrapSchedule",
        args: [
          cmd.accountAddress,
          cmd.superTokenAddress,
          cmd.underlyingTokenAddress,
        ],
      },
      {
        chainId: cmd.chainId,
        address: cmd.underlyingTokenAddress,
        abi: erc20ABI,
        functionName: "allowance",
        args: [cmd.accountAddress, autoWrapStrategyAddress[cmd.chainId]],
      },
    ],
    cacheOnBlock: true,
  });

  const [wrapScheduleData, allowanceData] = data ?? [];
  const wrapSchedule = wrapScheduleData?.result;
  const allowance = allowanceData?.result;

  const upperLimit = 604800n;

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (typeof wrapSchedule === "object") {
      if (wrapSchedule.strategy !== autoWrapStrategyAddress[cmd.chainId]) {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: "Enable Auto-Wrap",
            chainId: cmd.chainId,
            materialize: () => ({
              abi: autoWrapManagerABI,
              address: autoWrapManagerAddress[cmd.chainId],
              functionName: "createWrapSchedule",
              args: [
                cmd.superTokenAddress,
                autoWrapStrategyAddress[cmd.chainId],
                cmd.underlyingTokenAddress,
                3000000000n,
                172800n,
                604800n,
              ] as const,
            }),
          }),
        );
      }

      if (typeof allowance === "bigint" && allowance < upperLimit) {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: `Approve ${
              getUnderlyingToken(cmd.underlyingTokenAddress).symbol
            } Allowance`,
            chainId: cmd.chainId,
            materialize: () => ({
              abi: erc20ABI,
              functionName: "approve",
              address: cmd.underlyingTokenAddress,
              args: [autoWrapStrategyAddress[cmd.chainId], MaxUint256] as const,
            }),
          }),
        );
      }
    }
    return contractWrites_;
  }, [cmd.id, isSuccess]);

  useEffect(
    () =>
      isSuccess ? onMapped?.({ commandId: cmd.id, contractWrites }) : void 0,
    [cmd.id, contractWrites, isSuccess],
  );

  return null;
}

export function WrapIntoSuperTokensCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<WrapIntoSuperTokensCommand>) {
  const { getSuperToken, getUnderlyingToken } = useWidget();

  const isNativeAssetUnderlyingToken = cmd.underlyingToken.isNativeAsset;

  const { data: allowance_, isSuccess } = useContractRead(
    !isNativeAssetUnderlyingToken
      ? {
          chainId: cmd.chainId,
          address: cmd.underlyingToken.address,
          abi: erc20ABI,
          functionName: "allowance",
          args: [cmd.accountAddress, cmd.superTokenAddress],
          cacheOnBlock: true,
        }
      : undefined,
  );

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (isNativeAssetUnderlyingToken) {
      contractWrites_.push(
        createContractWrite({
          commandId: cmd.id,
          displayTitle: `Wrap to ${
            getSuperToken(cmd.superTokenAddress).symbol
          }`,
          chainId: cmd.chainId,
          materialize: () => ({
            abi: nativeAssetSuperTokenABI,
            functionName: "upgradeByETH",
            address: cmd.superTokenAddress,
            value: cmd.amountWeiFromUnderlyingTokenDecimals,
          }),
          materializeForBatchCall: () => [
            101,
            cmd.superTokenAddress,
            {
              abi: nativeAssetSuperTokenABI,
              functionName: "upgradeByETH",
              address: cmd.superTokenAddress,
              value: cmd.amountWeiFromUnderlyingTokenDecimals,
            },
          ],
        }),
      );
    } else {
      if (allowance_ !== undefined) {
        const allowance = BigInt(allowance_);
        if (allowance < cmd.amountWeiFromUnderlyingTokenDecimals) {
          const underlyingTokenAddress = cmd.underlyingToken.address;
          contractWrites_.push(
            createContractWrite({
              commandId: cmd.id,
              displayTitle: `Approve ${
                getUnderlyingToken(underlyingTokenAddress).symbol
              } Allowance`,
              chainId: cmd.chainId,
              materialize: () => ({
                abi: erc20ABI,
                functionName: "approve",
                address: underlyingTokenAddress,
                args: [
                  cmd.superTokenAddress,
                  cmd.amountWeiFromUnderlyingTokenDecimals,
                ] as const,
              }),
            }),
          );
        }

        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: `Wrap ${
              getUnderlyingToken(cmd.underlyingToken.address).symbol
            } into ${getSuperToken(cmd.superTokenAddress).symbol}`,
            chainId: cmd.chainId,
            materialize: () => ({
              abi: superTokenABI,
              address: cmd.superTokenAddress,
              functionName: "upgrade",
              args: [cmd.amountWeiFromSuperTokenDecimals] as const,
            }),
            materializeForBatchCall: () => [
              101,
              cmd.superTokenAddress,
              {
                abi: superTokenABI,
                address: cmd.superTokenAddress,
                functionName: "upgrade",
                args: [cmd.amountWeiFromSuperTokenDecimals] as const,
              },
            ],
          }),
        );
      }
    }

    return contractWrites_;
  }, [cmd.id, isSuccess]);

  useEffect(
    () =>
      isSuccess ? onMapped?.({ commandId: cmd.id, contractWrites }) : void 0,
    [cmd.id, contractWrites, isSuccess],
  );

  return null;
}

export function SubscribeCommandMapper({
  command: cmd,
  onMapped,
}: CommandMapperProps<SubscribeCommand>) {
  const { isSuccess: isSuccessForGetFlowRate, data: existingFlowRate_ } =
    useContractRead({
      chainId: cmd.chainId,
      address: cfAv1ForwarderAddress[cmd.chainId],
      abi: cfAv1ForwarderABI,
      functionName: "getFlowrate",
      args: [cmd.superTokenAddress, cmd.accountAddress, cmd.receiverAddress],
      cacheOnBlock: true,
    });

  const flowRate =
    cmd.flowRate.amountWei /
    BigInt(mapTimePeriodToSeconds(cmd.flowRate.period));

  const contractWrites = useMemo(() => {
    const contractWrites_: ContractWrite[] = [];

    if (existingFlowRate_ !== undefined) {
      const existingFlowRate = BigInt(existingFlowRate_);

      if (cmd.transferAmountWei > 0n) {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: "Transfer",
            chainId: cmd.chainId,
            materialize: () => ({
              abi: erc20ABI,
              address: cmd.superTokenAddress,
              functionName: "transfer",
              args: [cmd.receiverAddress, cmd.transferAmountWei] as const,
            }),
            // TODO(KK): Is 2 correct?
            materializeForBatchCall: () => [
              2,
              cmd.superTokenAddress,
              {
                abi: erc20ABI,
                address: cmd.superTokenAddress,
                functionName: "transferFrom",
                args: [
                  cmd.accountAddress,
                  cmd.receiverAddress,
                  cmd.transferAmountWei,
                ] as const,
              },
            ],
          }),
        );
      }

      if (existingFlowRate > 0n) {
        const updatedFlowRate = existingFlowRate + flowRate;

        // TODO(KK): Is this the right behaviour, to update the flow rate?
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: "Modify Stream",
            chainId: cmd.chainId,
            materialize: () => ({
              abi: cfAv1ForwarderABI,
              address: cfAv1ForwarderAddress[cmd.chainId],
              functionName: "updateFlow",
              args: [
                cmd.superTokenAddress,
                cmd.accountAddress,
                cmd.receiverAddress,
                updatedFlowRate,
                cmd.userData,
              ] as const,
            }),
            materializeForBatchCall: () => [
              201,
              constantFlowAgreementV1Address[cmd.chainId],
              {
                abi: constantFlowAgreementV1ABI,
                address: constantFlowAgreementV1Address[cmd.chainId],
                functionName: "updateFlow",
                args: [
                  cmd.superTokenAddress,
                  cmd.receiverAddress,
                  updatedFlowRate,
                  cmd.userData,
                ] as const,
              },
            ],
          }),
        );
      } else {
        contractWrites_.push(
          createContractWrite({
            commandId: cmd.id,
            displayTitle: "Send Stream",
            chainId: cmd.chainId,
            materialize: () => ({
              abi: cfAv1ForwarderABI,
              address: cfAv1ForwarderAddress[cmd.chainId],
              functionName: "createFlow",
              args: [
                cmd.superTokenAddress,
                cmd.accountAddress,
                cmd.receiverAddress,
                flowRate,
                cmd.userData,
              ] as const,
            }),
            materializeForBatchCall: () => [
              201,
              constantFlowAgreementV1Address[cmd.chainId],
              {
                abi: constantFlowAgreementV1ABI,
                address: constantFlowAgreementV1Address[cmd.chainId],
                functionName: "createFlow",
                args: [
                  cmd.superTokenAddress,
                  cmd.receiverAddress,
                  flowRate,
                  cmd.userData,
                ] as const,
              },
            ],
          }),
        );
      }
    }

    return contractWrites_;
  }, [cmd.id, isSuccessForGetFlowRate]);

  useEffect(
    () =>
      isSuccessForGetFlowRate
        ? onMapped?.({ commandId: cmd.id, contractWrites })
        : void 0,
    [cmd.id, contractWrites, isSuccessForGetFlowRate],
  );

  return null;
}

// TODO(KK): Get rid of batch call?
// TODO(KK): viem had some function to extract a call...
const createContractWrite = <
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
>(
  arg: Pick<ContractWrite, "commandId" | "displayTitle" | "chainId"> & {
    signatureRequest?: Parameters<typeof useSignTypedData>[0];
    materialize: (
      signature?: ReturnType<typeof useSignTypedData>["data"],
    ) => ContractFunctionConfig<TAbi, TFunctionName, "payable" | "nonpayable"> &
      GetValue<TAbi, TFunctionName>;
    materializeForBatchCall?: (
      signature?: ReturnType<typeof useSignTypedData>["data"],
    ) => [
      number,
      Address,
      ContractFunctionConfig<Abi, string, "payable" | "nonpayable"> &
        GetValue<Abi, string>,
    ];
  },
): ContractWrite =>
  ({
    id: nanoid(),
    ...arg, // TODO(KK): handle gnosis safe bug
    materializeForBatchCall: !arg.materializeForBatchCall
      ? undefined
      : (signature) => {
          const [operationType, target, call] =
            arg.materializeForBatchCall!(signature);

          const callData = encodeFunctionData(call);

          if (operationType === 201) {
            const data = encodeAbiParameters(
              parseAbiParameters("bytes, bytes"),
              [callData, "0x"],
            );

            return { operationType, target, data, value: call.value ?? 0n };
          } else if (operationType === 202) {
            return {
              operationType,
              target,
              data: callData,
              value: call.value ?? 0n,
            };
          } else {
            return {
              operationType,
              target,
              data: removeSigHashFromCallData(callData),
              value: call.value ?? 0n,
            };
          }
        },
  }) as ContractWrite;

const EMPTY = "0x";

/**
 * Removes the 8-character (4 byte) signature hash from `callData`.
 * @param callData
 * @returns function parameters
 */
export const removeSigHashFromCallData = (
  callData: `0x${string}`,
): `0x${string}` => EMPTY.concat(callData.slice(10)) as `0x${string}`;
