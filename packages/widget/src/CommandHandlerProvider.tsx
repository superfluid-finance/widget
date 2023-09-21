import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Abi,
  Address,
  ContractFunctionConfig,
  encodeFunctionData,
  GetValue,
} from "viem";
import { useSignTypedData } from "wagmi";

import {
  CommandHandlerContext,
  CommandHandlerContextValue,
  useCommandHandler,
} from "./CommandHandlerContext.js";
import { useCommandHandlerReducer } from "./commandHandlingReducer.js";
import { CommandMapper, CommandMapperProps } from "./CommandMapper.js";
import { Command } from "./commands.js";
import { ContractWrite } from "./ContractWrite.js";
import {
  ContractWriteManager,
  ContractWriteManagerProps,
} from "./ContractWriteManager.js";
import {
  superfluidHostABI,
  superfluidHostAddress,
} from "./core/wagmi-generated.js";
import { ChildrenProp, isDefined } from "./utils.js";

type Props = {
  children:
    | ((contextValue: CommandHandlerContextValue) => ChildrenProp)
    | ChildrenProp;
};

export function CommandHandlerProvider({ children }: Props) {
  const [
    { status, commands, contractWrites, sessionId, writeIndex },
    dispatch,
  ] = useCommandHandlerReducer();

  const contractWriteResults = useMemo(() => {
    const contractWritesResults_ = contractWrites
      .map((x) => x.result)
      .filter(isDefined);

    return contractWritesResults_;
  }, [contractWrites]);

  const handleNextWrite = useCallback(
    (writeIndex: number) =>
      void dispatch({ type: "set write index", payload: writeIndex + 1 }),
    [dispatch],
  );

  const submitCommands = useCallback(
    (commands: ReadonlyArray<Command>) =>
      void dispatch({ type: "set commands", payload: commands }),
    [dispatch],
  );

  const setContractWrites = useCallback(
    (contractWrites: ReadonlyArray<ContractWrite>) =>
      void dispatch({
        type: "set contract writes",
        payload: {
          contractWrites: contractWrites,
        },
      }),
    [dispatch],
  );

  const reset = useCallback(() => {
    void dispatch({ type: "reset" });
  }, [dispatch]);

  const onContractWrites = useCallback<
    Required<CommandMapperProps>["onMapped"]
  >(
    ({ commandId, contractWrites }) =>
      void dispatch({
        type: "set contract writes",
        payload: {
          commandId,
          contractWrites,
        },
      }),
    [],
  );

  const onContractWriteResult = useCallback<
    Required<ContractWriteManagerProps>["onChange"]
  >(
    (result) => {
      void dispatch({
        type: "set contract write result",
        payload: {
          writeId: result.contractWrite.id,
          result,
        },
      });

      if (
        result.transactionResult.isSuccess &&
        result.contractWrite.id === contractWrites[writeIndex]?.id
      ) {
        handleNextWrite(writeIndex);
      }
    },
    [writeIndex, contractWrites, handleNextWrite],
  );

  const contextValue = useMemo(
    () => ({
      status,
      commands,
      contractWrites,
      contractWriteResults,
      sessionId,
      submitCommands,
      setContractWrites,
      reset,
      writeIndex,
      handleNextWrite,
    }),
    [
      status,
      commands,
      contractWrites,
      contractWriteResults,
      sessionId,
      submitCommands,
      reset,
      writeIndex,
      handleNextWrite,
    ],
  );

  return (
    <>
      <CommandHandlerContext.Provider value={contextValue}>
        {typeof children === "function" ? children(contextValue) : children}
        {commands.map((cmd) => (
          <CommandMapper
            key={cmd.id}
            command={cmd}
            onMapped={onContractWrites}
          />
        ))}
        {contractWrites.map((contractWrite, writeIndex_) => (
          <ContractWriteManager
            key={contractWrite.id}
            prepare={writeIndex_ === writeIndex}
            contractWrite={contractWrite}
            onChange={onContractWriteResult}
          />
        ))}
      </CommandHandlerContext.Provider>
    </>
  );
}

export function BatchHandler() {
  const { contractWrites, sessionId, setContractWrites } = useCommandHandler();

  const [batch, setBatch] = useState(false);

  useEffect(() => {
    setBatch(false);
  }, [sessionId]);

  const [beforeBatchWrites, setBeforeBatchWrites] =
    useState<ReadonlyArray<ContractWrite> | null>(null);

  const onSwitchChange = useCallback<Required<SwitchProps>["onChange"]>(
    (_e, checked) => {
      if (checked) {
        setBatch(true);
        setBeforeBatchWrites(contractWrites);

        const batchableCalls = contractWrites.filter(
          (x) => x.materializeForBatchCall,
        );
        const nonBatchableCalls = contractWrites.filter(
          (x) => !x.materializeForBatchCall,
        );

        const chainId = contractWrites[0]
          .chainId as keyof typeof superfluidHostAddress;

        const newContractWrites = [
          ...nonBatchableCalls,
          createContractWrite({
            commandId: nanoid(),
            displayTitle: "Batch Call",
            chainId: chainId,
            signatureRequest: batchableCalls.find((x) => x.signatureRequest)
              ?.signatureRequest,
            materialize: (signature) => {
              let value = 0n;
              const individualCalls = batchableCalls.map((x) => {
                const materialized = x.materializeForBatchCall!(signature)!;
                value += materialized.value;
                return {
                  operationType: materialized.operationType,
                  target: materialized.target,
                  data: materialized.data,
                };
              });
              const args = [individualCalls] as const;
              return {
                abi: superfluidHostABI,
                address: superfluidHostAddress[chainId],
                functionName: "batchCall",
                value: value,
                args,
              };
            },
          }),
        ];
        setContractWrites(newContractWrites);
      } else {
        setBatch(false);
        setContractWrites(beforeBatchWrites!);
        setBeforeBatchWrites(null);
      }
    },
    [contractWrites, beforeBatchWrites, setContractWrites],
  );

  return (
    <FormControlLabel
      sx={{
        color: "text.primary",
        fontWeight: 400,
      }}
      control={
        <Switch
          disabled={contractWrites.length === 0}
          checked={batch}
          onChange={onSwitchChange}
        />
      }
      label="Batch"
    />
  );
}

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
    materializeForBatchCall: (signature) => {
      if (!arg.materializeForBatchCall) {
        return undefined;
      }
      const [operationType, target, call] =
        arg.materializeForBatchCall(signature);

      return {
        operationType,
        target,
        data: encodeFunctionData(call),
        value: call.value,
      };
    },
  }) as ContractWrite;
