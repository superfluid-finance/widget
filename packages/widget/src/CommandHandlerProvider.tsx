import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
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
} from "./CommandHandlerContext.js";
import { useCommandHandlerReducer } from "./commandHandlingReducer.js";
import { CommandMapper } from "./CommandMapper.js";
import { Command } from "./commands.js";
import { ContractWrite } from "./ContractWrite.js";
import { ContractWriteManager } from "./ContractWriteManager.js";
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
  const [{ status, commands, contractWrites, sessionId }, dispatch] =
    useCommandHandlerReducer();

  const contractWriteResults = useMemo(() => {
    const contractWritesResults_ = contractWrites
      .map((x) => x.result)
      .filter(isDefined);

    return contractWritesResults_;
  }, [contractWrites]);

  const writeIndex = contractWriteResults.filter(
    (x) => x.transactionResult.isSuccess,
  ).length;

  const submitCommands = useCallback(
    (commands: ReadonlyArray<Command>) =>
      void dispatch({ type: "set commands", payload: commands }),
    [dispatch],
  );

  const [batch, setBatch] = useState(false);
  const reset = useCallback(() => {
    void dispatch({ type: "reset" });
    setBatch(false);
  }, [dispatch]);

  const contextValue = useMemo(
    () => ({
      status,
      commands,
      contractWrites,
      contractWriteResults,
      sessionId,
      submitCommands,
      reset,
      writeIndex,
    }),
    [status, commands, contractWrites, contractWriteResults, sessionId],
  );

  return (
    <>
      {Boolean(contractWrites.length) && (
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={batch}
                onChange={(_e, checked) => {
                  setBatch(true);

                  if (
                    contractWrites.filter((x) => !x.materializeForBatchCall)
                      .length === 0
                  ) {
                    const chainId = contractWrites[0]
                      .chainId as keyof typeof superfluidHostAddress;
                    dispatch({
                      type: "set contract writes",
                      payload: {
                        contractWrites: [
                          createContractWrite({
                            commandId: nanoid(),
                            displayTitle: "Batch Call",
                            chainId: chainId,
                            signatureRequest: contractWrites.find(
                              (x) => x.signatureRequest,
                            )?.signatureRequest,
                            materialize: (signature) => {
                              let value = 0n;
                              const individualCalls = contractWrites.map(
                                (x) => {
                                  const materialized =
                                    x.materializeForBatchCall!(signature)!;
                                  value += materialized.value;
                                  return {
                                    operationType: materialized.operationType,
                                    target: materialized.target,
                                    data: materialized.data,
                                  };
                                },
                              );
                              const args = [individualCalls] as const; // TODO(KK): bangs
                              return {
                                abi: superfluidHostABI,
                                address: superfluidHostAddress[chainId],
                                functionName: "batchCall",
                                value: value,
                                args,
                              };
                            },
                          }),
                        ],
                      },
                    });
                  } else {
                    console.log("Should not be here...");
                  }
                }}
              />
            }
            label="Batch?"
          />
        </FormGroup>
      )}
      <CommandHandlerContext.Provider value={contextValue}>
        {typeof children === "function" ? children(contextValue) : children}
        {commands.map((cmd, commandIndex_) => (
          <CommandMapper
            key={commandIndex_}
            command={cmd}
            onMapped={(x) =>
              void dispatch({
                type: "add contract writes",
                payload: {
                  contractWrites: x,
                },
              })
            }
          />
        ))}
        {contractWrites.map((contractWrite, writeIndex_) => (
          <ContractWriteManager
            key={writeIndex_}
            prepare={writeIndex_ === writeIndex}
            contractWrite={contractWrite}
            onChange={(result) =>
              void dispatch({
                type: "set contract write result",
                payload: {
                  writeId: contractWrite.id,
                  result,
                },
              })
            }
          />
        ))}
      </CommandHandlerContext.Provider>
    </>
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
