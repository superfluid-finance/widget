import { createContext, useContext } from "react";
import { Command } from "./commands";
import { ContractWrite } from "./extractContractWrite";

export type ContractWriteState = {
  command: Command;
  contractWrite: ContractWrite;
  status: "pending" | "success" | "error" | "waiting";
}

export type CommandHandlerState = {
  status: "idle" | "handling" | "success";
  commands: ReadonlyArray<Command>;
  setCommands: (commands: ReadonlyArray<Command>) => void;
  handle: () => void;
  success: () => void;
  cancelHandling: () => void;
  contractWrites: ReadonlyArray<ContractWriteState>; // Probably move this away from here.
  // addContractWrite: () => void;
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
