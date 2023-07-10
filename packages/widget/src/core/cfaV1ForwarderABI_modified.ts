import { Abi } from "viem";

export const cfAv1ForwarderABI_modified: Abi = [
  // # Start of ABI modification
  // Include the CFA errors in the ABI. Allows for better error parsing.
  // Solves the issue that the forwarder's ABI doesn't include all the Superfluid Protocol errors by default.
  {
    inputs: [],
    name: "AGREEMENT_BASE_ONLY_HOST",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_code",
        type: "uint256",
      },
    ],
    name: "APP_RULE",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_FLOW_RATE_ALLOWANCE_EXCEEDED",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_NO_NEGATIVE_ALLOWANCE",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_NO_SENDER_CREATE",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_NO_SENDER_FLOW_OPERATOR",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_NO_SENDER_UPDATE",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_OPERATOR_NO_CREATE_PERMISSIONS",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_OPERATOR_NO_DELETE_PERMISSIONS",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_OPERATOR_NO_UPDATE_PERMISSIONS",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ACL_UNCLEAN_PERMISSIONS",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_DEPOSIT_TOO_BIG",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_FLOW_ALREADY_EXISTS",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_FLOW_DOES_NOT_EXIST",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_FLOW_RATE_TOO_BIG",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_HOOK_OUT_OF_GAS",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_INSUFFICIENT_BALANCE",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_INVALID_FLOW_RATE",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_NON_CRITICAL_SENDER",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_NO_SELF_FLOW",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ZERO_ADDRESS_RECEIVER",
    type: "error",
  },
  {
    inputs: [],
    name: "CFA_ZERO_ADDRESS_SENDER",
    type: "error",
  },
  // # End of ABI modifications
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
    ],
  },
  { type: "error", inputs: [], name: "CFA_FWD_INVALID_FLOW_RATE" },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowrate", internalType: "int96", type: "int96" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "createFlow",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "deleteFlow",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "getAccountFlowInfo",
    outputs: [
      { name: "lastUpdated", internalType: "uint256", type: "uint256" },
      { name: "flowrate", internalType: "int96", type: "int96" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "getAccountFlowrate",
    outputs: [{ name: "flowrate", internalType: "int96", type: "int96" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "flowrate", internalType: "int96", type: "int96" },
    ],
    name: "getBufferAmountByFlowrate",
    outputs: [
      { name: "bufferAmount", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
    ],
    name: "getFlowInfo",
    outputs: [
      { name: "lastUpdated", internalType: "uint256", type: "uint256" },
      { name: "flowrate", internalType: "int96", type: "int96" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "flowOperator", internalType: "address", type: "address" },
    ],
    name: "getFlowOperatorPermissions",
    outputs: [
      { name: "permissions", internalType: "uint8", type: "uint8" },
      { name: "flowrateAllowance", internalType: "int96", type: "int96" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
    ],
    name: "getFlowrate",
    outputs: [{ name: "flowrate", internalType: "int96", type: "int96" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "flowOperator", internalType: "address", type: "address" },
    ],
    name: "grantPermissions",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "flowOperator", internalType: "address", type: "address" },
    ],
    name: "revokePermissions",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowrate", internalType: "int96", type: "int96" },
    ],
    name: "setFlowrate",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowrate", internalType: "int96", type: "int96" },
    ],
    name: "setFlowrateFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowrate", internalType: "int96", type: "int96" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "updateFlow",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "flowOperator", internalType: "address", type: "address" },
      { name: "permissions", internalType: "uint8", type: "uint8" },
      { name: "flowrateAllowance", internalType: "int96", type: "int96" },
    ],
    name: "updateFlowOperatorPermissions",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
];

export default cfAv1ForwarderABI_modified;
