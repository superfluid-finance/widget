import { createContext, useContext } from "react";

import { State } from "./CommandHandlerState.js";
import { Command } from "./commands.js";
import { ContractWrite } from "./ContractWrite.js";
import { ContractWriteResult } from "./ContractWriteManager.js";

// TODO(KK): nested structure
export type CommandHandlerContextValue = {
  status: State["status"];
  commands: ReadonlyArray<Command>;
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
