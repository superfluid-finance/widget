import { createContext, useContext } from "react";
import { Command } from "./commands";
import { ContractWrite } from "./ContractWrite";
import { ContractWriteResult } from "./ContractWriteManager";
import { CommandHandlingAggregate, State } from "./CommandHandlerState";

// TODO(KK): nested structure
export type CommandHandlerContextValue = {
  status: State["status"];
  commands: ReadonlyArray<CommandHandlingAggregate>;
  contractWrites: ReadonlyArray<ContractWrite>;
  contractWriteResults: ReadonlyArray<ContractWriteResult>;
  sessionId: string | null;
  submitCommands: (commands: ReadonlyArray<Command>) => void;
  writeIndex: number;
};

export const CommandHandlerContext = createContext<
  CommandHandlerContextValue | undefined
>(undefined);

export function useCommandHandler(): CommandHandlerContextValue {
  const context = useContext(CommandHandlerContext);

  if (!context) {
    throw new Error(
      "useCommandHandler must be used within a CommandHandlerProvider",
    );
  }

  return context;
}
