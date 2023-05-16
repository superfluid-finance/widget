import { createContext, useContext } from "react";
import { Command } from "./commands";

export type CommandHandlerState = {
  status: "idle" | "handling" | "success";
  commands: ReadonlyArray<Command>;
  setCommands: (commands: ReadonlyArray<Command>) => void;
  handle: () => void;
  success: () => void;
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
