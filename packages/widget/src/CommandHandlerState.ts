import { ContractWriteResult } from "./ContractWriteHandler";
import { Command } from "./commands";
import { ContractWrite } from "./extractContractWrite";

export type State = Idle | Pending | Initiated | Success;

type Idle = {
  status: "idle";
  commands: ReadonlyArray<never>;
  sessionId: null;
};

type Pending = {
  status: "pending";
  commands: ReadonlyArray<CommandHandlingAggregate>;
  sessionId: null;
};

type Initiated = {
  status: "initiated";
  commands: ReadonlyArray<
    Command & {
      contractWrites: ReadonlyArray<
        ContractWrite & {
          result: ContractWriteResult;
        }
      >;
    }
  >;
  sessionId: string;
};

type Success = {
  status: "success";
  commands: ReadonlyArray<
    Command & {
      contractWrites: ReadonlyArray<
        ContractWrite & {
          result: ContractWriteResult;
        }
      >;
    }
  >;
  sessionId: string;
};

export type CommandHandlingAggregate = Command & {
  contractWrites?:
    | ReadonlyArray<
        ContractWrite & {
          result?: ContractWriteResult | undefined;
        }
      >
    | undefined;
};
