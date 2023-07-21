import { useCallback, useMemo } from "react";
import {
  CommandHandlerContext,
  CommandHandlerContextValue,
} from "./CommandHandlerContext.js";
import { ChildrenProp, isDefined } from "./utils.js";
import { ContractWriteManager } from "./ContractWriteManager.js";
import { CommandMapper } from "./CommandMapper.js";
import { Command } from "./commands.js";
import { useCommandHandlerReducer } from "./commandHandlingReducer.js";

type Props = {
  children:
    | ((contextValue: CommandHandlerContextValue) => ChildrenProp)
    | ChildrenProp;
};

export function CommandHandlerProvider({ children }: Props) {
  const [{ status, commands, sessionId }, dispatch] =
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

  const writeIndex = contractWriteResults.filter(
    (x) => x.transactionResult.isSuccess,
  ).length;

  const submitCommands = useCallback(
    (commands: ReadonlyArray<Command>) =>
      void dispatch({ type: "set commands", payload: commands }),
    [dispatch],
  );
  const reset = useCallback(() => void dispatch({ type: "reset" }), [dispatch]);

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
    <CommandHandlerContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
      {commands.map((cmd, commandIndex_) => (
        <CommandMapper
          key={commandIndex_}
          command={cmd}
          onMapped={(x) =>
            void dispatch({
              type: "set contract writes",
              payload: {
                commandId: cmd.id,
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
                commandId: contractWrite.commandId,
                writeId: contractWrite.id,
                result,
              },
            })
          }
        />
      ))}
    </CommandHandlerContext.Provider>
  );
}
