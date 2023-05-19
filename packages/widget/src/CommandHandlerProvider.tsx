import { useCallback, useMemo } from "react";
import {
  CommandHandlerContext,
  CommandHandlerContextValue,
} from "./CommandHandlerContext";
import { ChildrenProp, isDefined } from "./utils";
import { ContractWriteHandler } from "./ContractWriteHandler";
import { CommandMapper } from "./CommandMapper";
import { useNetwork } from "wagmi";
import { Command } from "./commands";
import { useCommandHandlerReducer } from "./commandHandlingReducer";

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
    (x) => x.transactionResult.isSuccess
  ).length;

  const submitCommands = useCallback(
    (commands: ReadonlyArray<Command>) =>
      void dispatch({ type: "set commands", payload: commands }),
    [dispatch]
  );
  const reset = useCallback(() => void dispatch({ type: "reset" }), [dispatch]);
  const handle = useCallback(
    () => void dispatch({ type: "initiate" }),
    [dispatch]
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
      handle,
    }),
    [status, commands, contractWrites, contractWriteResults, sessionId]
  );

  // TODO(KK): do this properly
  const chainId = commands[0]?.chainId;
  const { chain } = useNetwork();
  const isRightChain = chainId === chain?.id;

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
        <ContractWriteHandler
          key={writeIndex_}
          prepare={isRightChain && writeIndex_ === writeIndex}
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
