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

  const handle = useCallback(() => {
    setStatus("handling");
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
