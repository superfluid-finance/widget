import { castDraft } from "immer";
import { useImmerReducer } from "use-immer";
import { State } from "./CommandHandlerStateTree";
import { nanoid } from "nanoid";
import { Command } from "./commands";
import { ContractWrite } from "./extractContractWrite";
import { ContractWriteResult } from "./ContractWriteHandler";

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
    }
  | { type: "succeed" }
  | { type: "initiate" };

export const useCommandHandlerReducer = () => useImmerReducer<
    State,
    Action
  >(
    (draft, action) => {
      switch (action.type) {
        case "reset": {
          draft.status = "idle";
          draft.commands = [];
          draft.sessionId = null;
          break;
        }
        case "set commands": {
          draft.status = "pending";
          draft.commands = castDraft(action.payload);
          draft.sessionId = null;
          break;
        }
        case "set contract writes": {
          const command = draft.commands.find(
            (x) => x.id === action.payload.commandId
          );

          if (!command) throw new Error(`Command not found with ID: ${action.payload.commandId}`);

          command.contractWrites = castDraft(action.payload.contractWrites);
          break;
        }
        case "set contract write result": {
          const contractWrite = draft.commands
            .find((x) => x.id === action.payload.commandId)
            ?.contractWrites?.find((x) => x.id === action.payload.writeId);

          if (!contractWrite) throw new Error(`ContractWrite not found with ID: ${action.payload.commandId}.${action.payload.writeId}`);

          // Initialize session when first transaction invoked.
          if (
            !draft.sessionId &&
            !!action.payload.result.writeResult.data?.hash
          ) {
            draft.sessionId = nanoid();
          }

          contractWrite.result = castDraft(action.payload.result);
          break;
        }
        case "succeed": {
          draft.status = "success";
          break;
        }
        case "initiate": {
          draft.status = "initiated";
          break;
        }
      }
    },
    { status: "idle", commands: [], sessionId: null }
  );