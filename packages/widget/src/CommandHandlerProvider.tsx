import { useCallback, useMemo } from "react";

import {
  CommandHandlerContext,
  CommandHandlerContextValue,
} from "./CommandHandlerContext.js";
import { useCommandHandlerReducer } from "./commandHandlingReducer.js";
import { CommandMapper, CommandMapperProps } from "./CommandMapper.js";
import { Command } from "./commands.js";
import {
  ContractWriteManager,
  ContractWriteManagerProps,
} from "./ContractWriteManager.js";
import { ChildrenProp, isDefined } from "./utils.js";

type Props = {
  children:
    | ((contextValue: CommandHandlerContextValue) => ChildrenProp)
    | ChildrenProp;
};

export function CommandHandlerProvider({ children }: Props) {
  const [{ status, commands, sessionId, writeIndex }, dispatch] =
    useCommandHandlerReducer();

  const [contractWrites, contractWriteResults] = useMemo(() => {
    const contractWrites_ = commands
      .map((x) => x.contractWrites)
      .flat()
      .filter(isDefined);

    const contractWritesResults_ = contractWrites_
      .map((x) => x.result)
      .filter(isDefined);

    return [contractWrites_, contractWritesResults_];
  }, [commands]);

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
  const reset = useCallback(() => void dispatch({ type: "reset" }), [dispatch]);

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
    [dispatch],
  );

  const onContractWriteResult = useCallback<
    Required<ContractWriteManagerProps>["onChange"]
  >(
    (result) => {
      void dispatch({
        type: "set contract write result",
        payload: {
          commandId: result.contractWrite.commandId,
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
    [dispatch, writeIndex, contractWrites, handleNextWrite],
  );

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
    <CommandHandlerContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
      {commands.map((cmd) => (
        <CommandMapper key={cmd.id} command={cmd} onMapped={onContractWrites} />
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
  );
}
