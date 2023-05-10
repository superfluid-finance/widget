import { useState, useCallback } from "react";
import {
  CommandHandlerContext,
  CommandHandlerState,
  ContractWriteState,
} from "./CommandHandlerContext";
import { Command } from "./commands";
import { Children } from "./utils";

type Props = {
  children:
    | ((contextValue: CommandHandlerState) => Children)
    | Children;
};

export function CommandHandlerProvider({ children }: Props) {
  const [commands, setCommands] = useState<ReadonlyArray<Command>>([]);
  const [transactions] = useState<ReadonlyArray<ContractWriteState>>([]);
  const [status, setStatus] = useState<CommandHandlerState["status"]>("idle");

  const handle = useCallback(() => {
    if (status === "idle") {
      setStatus("handling");
    } else {
      throw new Error("Cannot handle when not idle.");
    }
  }, []);

  const cancelHandling = useCallback(() => {
    if (status === "handling") {
      setStatus("idle");
    } else {
      throw new Error("Cannot cancel handling when not handling.");
    }
  }, [status]);

  const contextValue: CommandHandlerState = {
    commands,
    contractWrites: transactions,
    status,
    setCommands,
    handle,
    cancelHandling
  };

  return (
    <CommandHandlerContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </CommandHandlerContext.Provider>
  );
}
