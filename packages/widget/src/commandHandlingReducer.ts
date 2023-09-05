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
        contractWrites: ReadonlyArray<ContractWrite>;
      };
    }
  | {
      type: "add contract writes";
      payload: {
        contractWrites: ReadonlyArray<ContractWrite>;
      };
    }
  | {
      type: "set contract write result";
      payload: {
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
          draft.contractWrites = [];
          draft.sessionId = null;
          break;
        }
        case "set commands": {
          draft.status = "initialized";
          draft.commands = castDraft(action.payload);
          draft.contractWrites = [];
          draft.sessionId = nanoid();
          break;
        }
        case "set contract writes": {
          draft.contractWrites = castDraft(action.payload.contractWrites);
          break;
        }
        case "add contract writes": {
          for (const write of action.payload.contractWrites) {
            (draft.contractWrites as ContractWrite[]).push(write);
          }
          break;
        }
        case "set contract write result": {
          const contractWrite = (draft.contractWrites ?? []).find(
            (x) => x.id === action.payload.writeId,
          );

          if (!contractWrite)
            throw new Error(
              `ContractWrite not found with ID: ${action.payload.writeId}`,
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
    { status: "idle", commands: [], contractWrites: [], sessionId: null },
  );
