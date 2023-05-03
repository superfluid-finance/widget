import { useState, useCallback } from "react";
import {
  CommandHandlerContext,
  CommandHandlerState,
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
  const [status, setStatus] = useState<CommandHandlerState["status"]>("idle");

  const handleCommands = useCallback((newCommands: ReadonlyArray<Command>) => {
    setStatus("handling");
    setCommands(newCommands);
    // Perform any additional operations with the commands here.
    // setStatus("success");
  }, []);

  const cancelHandling = useCallback(() => {
    if (status === "handling") {
      setStatus("idle");
      setCommands([]);
    } else {
      throw new Error("Cannot cancel handling when not handling.");
    }
  }, [status]);

  const contextValue: CommandHandlerState = {
    commands,
    status,
    handleCommands,
    cancelHandling
  };

  return (
    <CommandHandlerContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </CommandHandlerContext.Provider>
  );
}
