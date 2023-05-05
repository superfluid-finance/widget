import { createContext, useContext } from "react";
import { Command } from "./commands";
import { ContractWrite } from "./extractContractWrite";

export type TransactionState = {
  command: Command;
  contractWrite: ContractWrite;
  status: "pending" | "success" | "error" | "waiting";
}

export type CommandHandlerState = {
  commands: ReadonlyArray<Command>;
  transactions: ReadonlyArray<TransactionState>; // Probably move this away from here.
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
