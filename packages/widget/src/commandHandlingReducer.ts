import { castDraft } from "immer";
import { nanoid } from "nanoid";

import { State } from "./CommandHandlerState.js";
import { Command } from "./commands.js";
import { ContractWrite } from "./ContractWrite.js";
import { ContractWriteResult } from "./ContractWriteManager.js";
import { useImmerReducer } from "./useImmer.js";

export type Action =
  | { type: "reset" }
  | { type: "set commands"; payload: ReadonlyArray<Command> }
  | {
      type: "set contract writes";
      payload: {
        commandId: string;
        contractWrites: ReadonlyArray<ContractWrite>;
      };
    }
  | {
      type: "set contract write result";
      payload: {
        commandId: string;
        writeId: string;
        result: ContractWriteResult;
      };
    };

export const useCommandHandlerReducer = () =>
  useImmerReducer<State, Action>(
    (draft, action) => {
      switch (action.type) {
        case "reset": {
          draft.status = "idle";
          draft.commands = [];
          draft.sessionId = null;
          break;
        }
        case "set commands": {
          draft.status = "initialized";
          draft.commands = castDraft(action.payload);
          draft.sessionId = nanoid();
          break;
        }
        case "set contract writes": {
          const command = draft.commands.find(
            (x) => x.id === action.payload.commandId,
          );

          if (!command)
            throw new Error(
              `Command not found with ID: ${action.payload.commandId}`,
            );

          command.contractWrites = castDraft(action.payload.contractWrites);
          break;
        }
        case "set contract write result": {
          const contractWrite = draft.commands
            .find((x) => x.id === action.payload.commandId)
            ?.contractWrites?.find((x) => x.id === action.payload.writeId);

          if (!contractWrite)
            throw new Error(
              `ContractWrite not found with ID: ${action.payload.commandId}.${action.payload.writeId}`,
            );

          // Initialize session when first transaction invoked.
          // EDIT: Moved this to when commands are set.
          // if (
          //   !draft.sessionId &&
          //   !!action.payload.result.writeResult.data?.hash
          // ) {
          //   draft.sessionId = nanoid();
          // }

          contractWrite.result = castDraft(action.payload.result);
          break;
        }
      }
    },
    { status: "idle", commands: [], sessionId: null },
  );
