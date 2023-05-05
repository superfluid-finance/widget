import { createContext, useContext } from "react";
import { Command } from "./commands";

export type CommandHandlerState = {
  commands: ReadonlyArray<Command>;
  status: "idle" | "handling" | "success";
  setCommands: (commands: ReadonlyArray<Command>) => void;
  handle: () => void;
  cancelHandling: () => void;
};

export const CommandHandlerContext = createContext<CommandHandlerState | undefined>(
  undefined
);

export function useCommandHandler(): CommandHandlerState {
  const context = useContext(CommandHandlerContext);

  if (!context) {
    throw new Error("useCommandHandler must be used within a CommandHandlerProvider");
  }

  return context;
}
