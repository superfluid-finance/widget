//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AutoWrapManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0B82D14E9616ca4d260E77454834AdCf5887595F)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x1fA76f2Cd0C3fe6c399A80111408d9C42C0CAC23)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x2AcdD61ac1EFFe1535109449c31889bdE8d7f325)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x8082e58681350876aFe8f52d3Bf8672034A03Db0)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x2581c27E7f6D6AF452E63fCe884EDE3EDd716b32)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xf01825eAFAe5CD1Dab5593EFAF218efC8968D272)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x8082e58681350876aFe8f52d3Bf8672034A03Db0)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x3eAB3c6207F488E475b7955B631B564F0E6317B9)
 */
export const autoWrapManagerABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "_cfa", internalType: "address", type: "address" },
      { name: "_minLower", internalType: "uint64", type: "uint64" },
      { name: "_minUpper", internalType: "uint64", type: "uint64" },
    ],
  },
  {
    type: "error",
    inputs: [
      { name: "limitGiven", internalType: "uint64", type: "uint64" },
      { name: "minLimit", internalType: "uint64", type: "uint64" },
    ],
    name: "InsufficientLimits",
  },
  {
    type: "error",
    inputs: [
      { name: "expirationTimeGiven", internalType: "uint64", type: "uint64" },
      { name: "timeNow", internalType: "uint256", type: "uint256" },
    ],
    name: "InvalidExpirationTime",
  },
  {
    type: "error",
    inputs: [{ name: "strategy", internalType: "address", type: "address" }],
    name: "InvalidStrategy",
  },
  {
    type: "error",
    inputs: [
      { name: "caller", internalType: "address", type: "address" },
      { name: "expectedCaller", internalType: "address", type: "address" },
    ],
    name: "UnauthorizedCaller",
  },
  {
    type: "error",
    inputs: [{ name: "superToken", internalType: "address", type: "address" }],
    name: "UnsupportedSuperToken",
  },
  {
    type: "error",
    inputs: [{ name: "index", internalType: "bytes32", type: "bytes32" }],
    name: "WrapNotRequired",
  },
  {
    type: "error",
    inputs: [
      { name: "lowerLimit", internalType: "uint64", type: "uint64" },
      { name: "upperLimit", internalType: "uint64", type: "uint64" },
    ],
    name: "WrongLimits",
  },
  { type: "error", inputs: [], name: "ZeroAddress" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "strategy",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AddedApprovedStrategy",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "lowerLimit",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
      {
        name: "upperLimit",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "LimitsChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "strategy",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RemovedApprovedStrategy",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "wrapAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "WrapExecuted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: true },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "superToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "strategy",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "liquidityToken",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "expiry",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "lowerLimit",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "upperLimit",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "WrapScheduleCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: true },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "superToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "strategy",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "liquidityToken",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "WrapScheduleDeleted",
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "strategy", internalType: "address", type: "address" }],
    name: "addApprovedStrategy",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "approvedStrategies",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "cfaV1",
    outputs: [
      {
        name: "",
        internalType: "contract IConstantFlowAgreementV1",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "superToken", internalType: "address", type: "address" },
      { name: "liquidityToken", internalType: "address", type: "address" },
    ],
    name: "checkWrap",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "index", internalType: "bytes32", type: "bytes32" }],
    name: "checkWrapByIndex",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "superToken", internalType: "address", type: "address" },
      { name: "strategy", internalType: "address", type: "address" },
      { name: "liquidityToken", internalType: "address", type: "address" },
      { name: "expiry", internalType: "uint64", type: "uint64" },
      { name: "lowerLimit", internalType: "uint64", type: "uint64" },
      { name: "upperLimit", internalType: "uint64", type: "uint64" },
    ],
    name: "createWrapSchedule",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "superToken", internalType: "address", type: "address" },
      { name: "liquidityToken", internalType: "address", type: "address" },
    ],
    name: "deleteWrapSchedule",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "index", internalType: "bytes32", type: "bytes32" }],
    name: "deleteWrapScheduleByIndex",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "superToken", internalType: "address", type: "address" },
      { name: "liquidityToken", internalType: "address", type: "address" },
    ],
    name: "executeWrap",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "index", internalType: "bytes32", type: "bytes32" }],
    name: "executeWrapByIndex",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "superToken", internalType: "address", type: "address" },
      { name: "liquidityToken", internalType: "address", type: "address" },
    ],
    name: "getWrapSchedule",
    outputs: [
      {
        name: "",
        internalType: "struct IManager.WrapSchedule",
        type: "tuple",
        components: [
          { name: "user", internalType: "address", type: "address" },
          {
            name: "superToken",
            internalType: "contract ISuperToken",
            type: "address",
          },
          {
            name: "strategy",
            internalType: "contract IStrategy",
            type: "address",
          },
          { name: "liquidityToken", internalType: "address", type: "address" },
          { name: "expiry", internalType: "uint64", type: "uint64" },
          { name: "lowerLimit", internalType: "uint64", type: "uint64" },
          { name: "upperLimit", internalType: "uint64", type: "uint64" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "index", internalType: "bytes32", type: "bytes32" }],
    name: "getWrapScheduleByIndex",
    outputs: [
      {
        name: "",
        internalType: "struct IManager.WrapSchedule",
        type: "tuple",
        components: [
          { name: "user", internalType: "address", type: "address" },
          {
            name: "superToken",
            internalType: "contract ISuperToken",
            type: "address",
          },
          {
            name: "strategy",
            internalType: "contract IStrategy",
            type: "address",
          },
          { name: "liquidityToken", internalType: "address", type: "address" },
          { name: "expiry", internalType: "uint64", type: "uint64" },
          { name: "lowerLimit", internalType: "uint64", type: "uint64" },
          { name: "upperLimit", internalType: "uint64", type: "uint64" },
        ],
      },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "superToken", internalType: "address", type: "address" },
      { name: "liquidityToken", internalType: "address", type: "address" },
    ],
    name: "getWrapScheduleIndex",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "minLower",
    outputs: [{ name: "", internalType: "uint64", type: "uint64" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "minUpper",
    outputs: [{ name: "", internalType: "uint64", type: "uint64" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "strategy", internalType: "address", type: "address" }],
    name: "removeApprovedStrategy",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "lowerLimit", internalType: "uint64", type: "uint64" },
      { name: "upperLimit", internalType: "uint64", type: "uint64" },
    ],
    name: "setLimits",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0B82D14E9616ca4d260E77454834AdCf5887595F)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x1fA76f2Cd0C3fe6c399A80111408d9C42C0CAC23)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x2AcdD61ac1EFFe1535109449c31889bdE8d7f325)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x8082e58681350876aFe8f52d3Bf8672034A03Db0)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x2581c27E7f6D6AF452E63fCe884EDE3EDd716b32)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xf01825eAFAe5CD1Dab5593EFAF218efC8968D272)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x8082e58681350876aFe8f52d3Bf8672034A03Db0)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x3eAB3c6207F488E475b7955B631B564F0E6317B9)
 */
export const autoWrapManagerAddress = {
  1: "0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1",
  5: "0x0B82D14E9616ca4d260E77454834AdCf5887595F",
  10: "0x1fA76f2Cd0C3fe6c399A80111408d9C42C0CAC23",
  56: "0x2AcdD61ac1EFFe1535109449c31889bdE8d7f325",
  100: "0x8082e58681350876aFe8f52d3Bf8672034A03Db0",
  137: "0x2581c27E7f6D6AF452E63fCe884EDE3EDd716b32",
  42161: "0xf01825eAFAe5CD1Dab5593EFAF218efC8968D272",
  43113: "0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1",
  43114: "0x8082e58681350876aFe8f52d3Bf8672034A03Db0",
  80001: "0x3eAB3c6207F488E475b7955B631B564F0E6317B9",
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0B82D14E9616ca4d260E77454834AdCf5887595F)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x1fA76f2Cd0C3fe6c399A80111408d9C42C0CAC23)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x2AcdD61ac1EFFe1535109449c31889bdE8d7f325)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x8082e58681350876aFe8f52d3Bf8672034A03Db0)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x2581c27E7f6D6AF452E63fCe884EDE3EDd716b32)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xf01825eAFAe5CD1Dab5593EFAF218efC8968D272)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x30aE282CF477E2eF28B14d0125aCEAd57Fe1d7a1)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x8082e58681350876aFe8f52d3Bf8672034A03Db0)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x3eAB3c6207F488E475b7955B631B564F0E6317B9)
 */
export const autoWrapManagerConfig = {
  address: autoWrapManagerAddress,
  abi: autoWrapManagerABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AutoWrapStrategy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xea49af829d3e28d3ec49e0e0a0ba1e7860a56f60)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x0Cf060a501c0040e9CCC708eFE94079F501c6Bb4)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9e308cb079ae130790F604b1030cDf386670f199)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x51FBAbD31A615E14b1bC12E9d887f60997264a4E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xb4afa36BAd8c76976Dc77a21c9Ad711EF720eE4b)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x342076aA957B0ec8bC1d3893af719b288eA31e61)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x51FBAbD31A615E14b1bC12E9d887f60997264a4E)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x544728AFDBeEafBeC9e1329031788edb53017bC4)
 */
export const autoWrapStrategyABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "address", type: "address" }],
  },
  {
    type: "error",
    inputs: [
      { name: "caller", internalType: "address", type: "address" },
      { name: "expectedCaller", internalType: "address", type: "address" },
    ],
    name: "UnauthorizedCaller",
  },
  {
    type: "error",
    inputs: [{ name: "superToken", internalType: "address", type: "address" }],
    name: "UnsupportedSuperToken",
  },
  { type: "error", inputs: [], name: "ZeroAddress" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "receiver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "EmergencyWithdrawInitiated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldManager",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "manager",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ManagerChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "superToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "superTokenAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Wrapped",
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newManager", internalType: "address", type: "address" }],
    name: "changeManager",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "emergencyWithdraw",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "superToken",
        internalType: "contract ISuperToken",
        type: "address",
      },
    ],
    name: "isSupportedSuperToken",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperToken",
        type: "address",
      },
      { name: "superTokenAmount", internalType: "uint256", type: "uint256" },
    ],
    name: "wrap",
    outputs: [],
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xea49af829d3e28d3ec49e0e0a0ba1e7860a56f60)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x0Cf060a501c0040e9CCC708eFE94079F501c6Bb4)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9e308cb079ae130790F604b1030cDf386670f199)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x51FBAbD31A615E14b1bC12E9d887f60997264a4E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xb4afa36BAd8c76976Dc77a21c9Ad711EF720eE4b)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x342076aA957B0ec8bC1d3893af719b288eA31e61)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x51FBAbD31A615E14b1bC12E9d887f60997264a4E)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x544728AFDBeEafBeC9e1329031788edb53017bC4)
 */
export const autoWrapStrategyAddress = {
  1: "0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d",
  5: "0xea49AF829D3E28d3eC49E0e0a0Ba1E7860A56F60",
  10: "0x0Cf060a501c0040e9CCC708eFE94079F501c6Bb4",
  56: "0x9e308cb079ae130790F604b1030cDf386670f199",
  100: "0x51FBAbD31A615E14b1bC12E9d887f60997264a4E",
  137: "0xb4afa36BAd8c76976Dc77a21c9Ad711EF720eE4b",
  42161: "0x342076aA957B0ec8bC1d3893af719b288eA31e61",
  43113: "0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d",
  43114: "0x51FBAbD31A615E14b1bC12E9d887f60997264a4E",
  80001: "0x544728AFDBeEafBeC9e1329031788edb53017bC4",
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xea49af829d3e28d3ec49e0e0a0ba1e7860a56f60)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x0Cf060a501c0040e9CCC708eFE94079F501c6Bb4)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x9e308cb079ae130790F604b1030cDf386670f199)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x51FBAbD31A615E14b1bC12E9d887f60997264a4E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xb4afa36BAd8c76976Dc77a21c9Ad711EF720eE4b)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x342076aA957B0ec8bC1d3893af719b288eA31e61)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x1D65c6d3AD39d454Ea8F682c49aE7744706eA96d)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x51FBAbD31A615E14b1bC12E9d887f60997264a4E)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x544728AFDBeEafBeC9e1329031788edb53017bC4)
 */
export const autoWrapStrategyConfig = {
  address: autoWrapStrategyAddress,
  abi: autoWrapStrategyABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CFAv1Forwarder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x2CDd45c5182602a36d391F7F16DD9f8386C3bD8D)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 */
export const cfAv1ForwarderABI = [
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
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x2CDd45c5182602a36d391F7F16DD9f8386C3bD8D)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 */
export const cfAv1ForwarderAddress = {
  1: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  5: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  10: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  56: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  100: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  137: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  420: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  1442: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  8453: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  42161: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  42220: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  43113: "0x2CDd45c5182602a36d391F7F16DD9f8386C3bD8D",
  43114: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  80001: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  84531: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  421613: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  11155111: "0xcfA132E353cB4E398080B9700609bb008eceB125",
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x2CDd45c5182602a36d391F7F16DD9f8386C3bD8D)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcfA132E353cB4E398080B9700609bb008eceB125)
 */
export const cfAv1ForwarderConfig = {
  address: cfAv1ForwarderAddress,
  abi: cfAv1ForwarderABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ type: "bool" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "operator", type: "address", indexed: true },
      { name: "approved", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "owner", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "id", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", type: "address" },
      { name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "index", type: "uint256" },
    ],
    name: "tokenByIndex",
    outputs: [{ name: "tokenId", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const errorsABI = [
  { type: "error", inputs: [], name: "AGREEMENT_BASE_ONLY_HOST" },
  {
    type: "error",
    inputs: [{ name: "_code", internalType: "uint256", type: "uint256" }],
    name: "APP_RULE",
  },
  { type: "error", inputs: [], name: "CFA_ACL_FLOW_RATE_ALLOWANCE_EXCEEDED" },
  { type: "error", inputs: [], name: "CFA_ACL_NO_NEGATIVE_ALLOWANCE" },
  { type: "error", inputs: [], name: "CFA_ACL_NO_SENDER_CREATE" },
  { type: "error", inputs: [], name: "CFA_ACL_NO_SENDER_FLOW_OPERATOR" },
  { type: "error", inputs: [], name: "CFA_ACL_NO_SENDER_UPDATE" },
  { type: "error", inputs: [], name: "CFA_ACL_OPERATOR_NO_CREATE_PERMISSIONS" },
  { type: "error", inputs: [], name: "CFA_ACL_OPERATOR_NO_DELETE_PERMISSIONS" },
  { type: "error", inputs: [], name: "CFA_ACL_OPERATOR_NO_UPDATE_PERMISSIONS" },
  { type: "error", inputs: [], name: "CFA_ACL_UNCLEAN_PERMISSIONS" },
  { type: "error", inputs: [], name: "CFA_DEPOSIT_TOO_BIG" },
  { type: "error", inputs: [], name: "CFA_FLOW_ALREADY_EXISTS" },
  { type: "error", inputs: [], name: "CFA_FLOW_DOES_NOT_EXIST" },
  { type: "error", inputs: [], name: "CFA_FLOW_RATE_TOO_BIG" },
  { type: "error", inputs: [], name: "CFA_HOOK_OUT_OF_GAS" },
  { type: "error", inputs: [], name: "CFA_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "CFA_INVALID_FLOW_RATE" },
  { type: "error", inputs: [], name: "CFA_NON_CRITICAL_SENDER" },
  { type: "error", inputs: [], name: "CFA_NO_SELF_FLOW" },
  { type: "error", inputs: [], name: "CFA_ZERO_ADDRESS_RECEIVER" },
  { type: "error", inputs: [], name: "CFA_ZERO_ADDRESS_SENDER" },
  { type: "error", inputs: [], name: "OUT_OF_GAS" },
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_ALREADY_EXISTS" },
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_DOES_NOT_EXIST" },
  { type: "error", inputs: [], name: "SF_TOKEN_BURN_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_MOVE_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_LISTED_AGREEMENT" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_BURN_FROM_ZERO_ADDRESS" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_CALLER_IS_NOT_OPERATOR_FOR_HOLDER",
  },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_MINT_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NFT_PROXY_ADDRESS_CHANGED" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_NOT_ERC777_TOKENS_RECIPIENT",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NO_UNDERLYING_TOKEN" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_GOV_OWNER" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_SELF" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_TO_ZERO_ADDRESS" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Host
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4E583d9390082B65Bef884b629DFA426114CED6d)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x567c4B141ED61923967cA25Ef4906C8781069a10)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd1e2cFb6441680002Eb7A44223160aB9B67d7E6E)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x2dFe937cD98Ab92e59cF3139138f18c823a4efE7)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3E14dC1b13c488a8d5D310918780c983bD5982E7)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xE40983C2476032A0915600b9472B3141aA5B5Ba9)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xe64f81d5dDdA1c7172e5C6d964E8ef1BD82D8704)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4C073B3baB6d8826b8C5b229f3cfdC1eC6E47E74)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCf8Acb4eF033efF16E8080aed4c7D5B9285D2192)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0xA4Ff07cF81C02CFD356184879D953970cA957585)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x85Fe79b998509B77BF10A8BD4001D58475D29386)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x60377C7016E4cdB03C87EF474896C11cB560752C)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xEB796bdb90fFA0f28255275e16936D25d3418603)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x507c3a7C6Ccc253884A2e3a3ee2A211cC7E796a6)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xE40983C2476032A0915600b9472B3141aA5B5Ba9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x109412E3C84f0539b43d39dB691B08c90f58dC7c)
 */
export const hostABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "nonUpgradable", internalType: "bool", type: "bool" },
      { name: "appWhiteListingEnabled", internalType: "bool", type: "bool" },
    ],
  },
  {
    type: "error",
    inputs: [{ name: "_code", internalType: "uint256", type: "uint256" }],
    name: "APP_RULE",
  },
  { type: "error", inputs: [], name: "HOST_AGREEMENT_ALREADY_REGISTERED" },
  { type: "error", inputs: [], name: "HOST_AGREEMENT_CALLBACK_IS_NOT_ACTION" },
  { type: "error", inputs: [], name: "HOST_AGREEMENT_IS_NOT_REGISTERED" },
  {
    type: "error",
    inputs: [],
    name: "HOST_CALL_AGREEMENT_WITH_CTX_FROM_WRONG_ADDRESS",
  },
  {
    type: "error",
    inputs: [],
    name: "HOST_CALL_APP_ACTION_WITH_CTX_FROM_WRONG_ADDRESS",
  },
  {
    type: "error",
    inputs: [],
    name: "HOST_CANNOT_DOWNGRADE_TO_NON_UPGRADEABLE",
  },
  { type: "error", inputs: [], name: "HOST_INVALID_CONFIG_WORD" },
  {
    type: "error",
    inputs: [],
    name: "HOST_INVALID_OR_EXPIRED_SUPER_APP_REGISTRATION_KEY",
  },
  { type: "error", inputs: [], name: "HOST_MAX_256_AGREEMENTS" },
  { type: "error", inputs: [], name: "HOST_MUST_BE_CONTRACT" },
  { type: "error", inputs: [], name: "HOST_NEED_MORE_GAS" },
  { type: "error", inputs: [], name: "HOST_NON_UPGRADEABLE" },
  { type: "error", inputs: [], name: "HOST_NON_ZERO_LENGTH_PLACEHOLDER_CTX" },
  { type: "error", inputs: [], name: "HOST_NOT_A_SUPER_APP" },
  { type: "error", inputs: [], name: "HOST_NO_APP_REGISTRATION_PERMISSIONS" },
  { type: "error", inputs: [], name: "HOST_ONLY_GOVERNANCE" },
  { type: "error", inputs: [], name: "HOST_ONLY_LISTED_AGREEMENT" },
  { type: "error", inputs: [], name: "HOST_RECEIVER_IS_NOT_SUPER_APP" },
  { type: "error", inputs: [], name: "HOST_SENDER_IS_NOT_SUPER_APP" },
  { type: "error", inputs: [], name: "HOST_SOURCE_APP_NEEDS_HIGHER_APP_LEVEL" },
  { type: "error", inputs: [], name: "HOST_SUPER_APP_ALREADY_REGISTERED" },
  { type: "error", inputs: [], name: "HOST_SUPER_APP_IS_JAILED" },
  { type: "error", inputs: [], name: "HOST_UNAUTHORIZED_SUPER_APP_FACTORY" },
  { type: "error", inputs: [], name: "HOST_UNKNOWN_BATCH_CALL_OPERATION_TYPE" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementType",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "code",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "AgreementClassRegistered",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementType",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "code",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "AgreementClassUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "app",
        internalType: "contract ISuperApp",
        type: "address",
        indexed: true,
      },
    ],
    name: "AppRegistered",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "uuid",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "codeAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "CodeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldGov",
        internalType: "contract ISuperfluidGovernance",
        type: "address",
        indexed: false,
      },
      {
        name: "newGov",
        internalType: "contract ISuperfluidGovernance",
        type: "address",
        indexed: false,
      },
    ],
    name: "GovernanceReplaced",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "version", internalType: "uint8", type: "uint8", indexed: false },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "app",
        internalType: "contract ISuperApp",
        type: "address",
        indexed: true,
      },
      {
        name: "reason",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Jail",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "newFactory",
        internalType: "contract ISuperTokenFactory",
        type: "address",
        indexed: false,
      },
    ],
    name: "SuperTokenFactoryUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperToken",
        type: "address",
        indexed: true,
      },
      {
        name: "code",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "SuperTokenLogicUpdated",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "APP_WHITE_LISTING_ENABLED",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CALLBACK_GAS_LIMIT",
    outputs: [{ name: "", internalType: "uint64", type: "uint64" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_APP_CALLBACK_LEVEL",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_NUM_AGREEMENTS",
    outputs: [{ name: "", internalType: "uint32", type: "uint32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "NON_UPGRADABLE_DEPLOYMENT",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "castrate",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getCodeAddress",
    outputs: [
      { name: "codeAddress", internalType: "address", type: "address" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "gov",
        internalType: "contract ISuperfluidGovernance",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newAddress", internalType: "address", type: "address" }],
    name: "updateCode",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getNow",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getGovernance",
    outputs: [
      {
        name: "",
        internalType: "contract ISuperfluidGovernance",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "newGov",
        internalType: "contract ISuperfluidGovernance",
        type: "address",
      },
    ],
    name: "replaceGovernance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "agreementClassLogic",
        internalType: "contract ISuperAgreement",
        type: "address",
      },
    ],
    name: "registerAgreementClass",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "agreementClassLogic",
        internalType: "contract ISuperAgreement",
        type: "address",
      },
    ],
    name: "updateAgreementClass",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementType", internalType: "bytes32", type: "bytes32" },
    ],
    name: "isAgreementTypeListed",
    outputs: [{ name: "yes", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "agreementClass",
        internalType: "contract ISuperAgreement",
        type: "address",
      },
    ],
    name: "isAgreementClassListed",
    outputs: [{ name: "yes", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementType", internalType: "bytes32", type: "bytes32" },
    ],
    name: "getAgreementClass",
    outputs: [
      {
        name: "agreementClass",
        internalType: "contract ISuperAgreement",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "bitmap", internalType: "uint256", type: "uint256" }],
    name: "mapAgreementClasses",
    outputs: [
      {
        name: "agreementClasses",
        internalType: "contract ISuperAgreement[]",
        type: "address[]",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "bitmap", internalType: "uint256", type: "uint256" },
      { name: "agreementType", internalType: "bytes32", type: "bytes32" },
    ],
    name: "addToAgreementClassesBitmap",
    outputs: [{ name: "newBitmap", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "bitmap", internalType: "uint256", type: "uint256" },
      { name: "agreementType", internalType: "bytes32", type: "bytes32" },
    ],
    name: "removeFromAgreementClassesBitmap",
    outputs: [{ name: "newBitmap", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getSuperTokenFactory",
    outputs: [
      {
        name: "factory",
        internalType: "contract ISuperTokenFactory",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getSuperTokenFactoryLogic",
    outputs: [{ name: "logic", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "newFactory",
        internalType: "contract ISuperTokenFactory",
        type: "address",
      },
    ],
    name: "updateSuperTokenFactory",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "contract ISuperToken", type: "address" },
      { name: "newLogicOverride", internalType: "address", type: "address" },
    ],
    name: "updateSuperTokenLogic",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "configWord", internalType: "uint256", type: "uint256" }],
    name: "registerApp",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "configWord", internalType: "uint256", type: "uint256" },
      { name: "registrationKey", internalType: "string", type: "string" },
    ],
    name: "registerAppWithKey",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      { name: "configWord", internalType: "uint256", type: "uint256" },
    ],
    name: "registerAppByFactory",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
    ],
    name: "isApp",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "appAddr", internalType: "contract ISuperApp", type: "address" },
    ],
    name: "getAppCallbackLevel",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
    ],
    name: "getAppManifest",
    outputs: [
      { name: "isSuperApp", internalType: "bool", type: "bool" },
      { name: "isJailed", internalType: "bool", type: "bool" },
      { name: "noopMask", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
    ],
    name: "isAppJailed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "targetApp",
        internalType: "contract ISuperApp",
        type: "address",
      },
    ],
    name: "allowCompositeApp",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      {
        name: "targetApp",
        internalType: "contract ISuperApp",
        type: "address",
      },
    ],
    name: "isCompositeAppAllowed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      { name: "callData", internalType: "bytes", type: "bytes" },
      { name: "isTermination", internalType: "bool", type: "bool" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "callAppBeforeCallback",
    outputs: [{ name: "cbdata", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      { name: "callData", internalType: "bytes", type: "bytes" },
      { name: "isTermination", internalType: "bool", type: "bool" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "callAppAfterCallback",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ctx", internalType: "bytes", type: "bytes" },
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      { name: "appCreditGranted", internalType: "uint256", type: "uint256" },
      { name: "appCreditUsed", internalType: "int256", type: "int256" },
      {
        name: "appCreditToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
    ],
    name: "appCallbackPush",
    outputs: [{ name: "appCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ctx", internalType: "bytes", type: "bytes" },
      { name: "appCreditUsedDelta", internalType: "int256", type: "int256" },
    ],
    name: "appCallbackPop",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ctx", internalType: "bytes", type: "bytes" },
      { name: "appCreditUsedMore", internalType: "int256", type: "int256" },
    ],
    name: "ctxUseCredit",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ctx", internalType: "bytes", type: "bytes" },
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      { name: "reason", internalType: "uint256", type: "uint256" },
    ],
    name: "jailApp",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "agreementClass",
        internalType: "contract ISuperAgreement",
        type: "address",
      },
      { name: "callData", internalType: "bytes", type: "bytes" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "callAgreement",
    outputs: [{ name: "returnedData", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      { name: "callData", internalType: "bytes", type: "bytes" },
    ],
    name: "callAppAction",
    outputs: [{ name: "returnedData", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "agreementClass",
        internalType: "contract ISuperAgreement",
        type: "address",
      },
      { name: "callData", internalType: "bytes", type: "bytes" },
      { name: "userData", internalType: "bytes", type: "bytes" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "callAgreementWithContext",
    outputs: [
      { name: "newCtx", internalType: "bytes", type: "bytes" },
      { name: "returnedData", internalType: "bytes", type: "bytes" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "app", internalType: "contract ISuperApp", type: "address" },
      { name: "callData", internalType: "bytes", type: "bytes" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "callAppActionWithContext",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [{ name: "ctx", internalType: "bytes", type: "bytes" }],
    name: "decodeCtx",
    outputs: [
      {
        name: "context",
        internalType: "struct ISuperfluid.Context",
        type: "tuple",
        components: [
          { name: "appCallbackLevel", internalType: "uint8", type: "uint8" },
          { name: "callType", internalType: "uint8", type: "uint8" },
          { name: "timestamp", internalType: "uint256", type: "uint256" },
          { name: "msgSender", internalType: "address", type: "address" },
          { name: "agreementSelector", internalType: "bytes4", type: "bytes4" },
          { name: "userData", internalType: "bytes", type: "bytes" },
          {
            name: "appCreditGranted",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "appCreditWantedDeprecated",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "appCreditUsed", internalType: "int256", type: "int256" },
          { name: "appAddress", internalType: "address", type: "address" },
          {
            name: "appCreditToken",
            internalType: "contract ISuperfluidToken",
            type: "address",
          },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "ctx", internalType: "bytes", type: "bytes" }],
    name: "isCtxValid",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "operations",
        internalType: "struct ISuperfluid.Operation[]",
        type: "tuple[]",
        components: [
          { name: "operationType", internalType: "uint32", type: "uint32" },
          { name: "target", internalType: "address", type: "address" },
          { name: "data", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "batchCall",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "operations",
        internalType: "struct ISuperfluid.Operation[]",
        type: "tuple[]",
        components: [
          { name: "operationType", internalType: "uint32", type: "uint32" },
          { name: "target", internalType: "address", type: "address" },
          { name: "data", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "forwardBatchCall",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "forwarder", internalType: "address", type: "address" }],
    name: "isTrustedForwarder",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "versionRecipient",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4E583d9390082B65Bef884b629DFA426114CED6d)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x567c4B141ED61923967cA25Ef4906C8781069a10)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd1e2cFb6441680002Eb7A44223160aB9B67d7E6E)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x2dFe937cD98Ab92e59cF3139138f18c823a4efE7)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3E14dC1b13c488a8d5D310918780c983bD5982E7)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xE40983C2476032A0915600b9472B3141aA5B5Ba9)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xe64f81d5dDdA1c7172e5C6d964E8ef1BD82D8704)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4C073B3baB6d8826b8C5b229f3cfdC1eC6E47E74)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCf8Acb4eF033efF16E8080aed4c7D5B9285D2192)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0xA4Ff07cF81C02CFD356184879D953970cA957585)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x85Fe79b998509B77BF10A8BD4001D58475D29386)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x60377C7016E4cdB03C87EF474896C11cB560752C)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xEB796bdb90fFA0f28255275e16936D25d3418603)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x507c3a7C6Ccc253884A2e3a3ee2A211cC7E796a6)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xE40983C2476032A0915600b9472B3141aA5B5Ba9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x109412E3C84f0539b43d39dB691B08c90f58dC7c)
 */
export const hostAddress = {
  1: "0x4E583d9390082B65Bef884b629DFA426114CED6d",
  5: "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9",
  10: "0x567c4B141ED61923967cA25Ef4906C8781069a10",
  56: "0xd1e2cFb6441680002Eb7A44223160aB9B67d7E6E",
  100: "0x2dFe937cD98Ab92e59cF3139138f18c823a4efE7",
  137: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
  420: "0xE40983C2476032A0915600b9472B3141aA5B5Ba9",
  1442: "0xe64f81d5dDdA1c7172e5C6d964E8ef1BD82D8704",
  8453: "0x4C073B3baB6d8826b8C5b229f3cfdC1eC6E47E74",
  42161: "0xCf8Acb4eF033efF16E8080aed4c7D5B9285D2192",
  42220: "0xA4Ff07cF81C02CFD356184879D953970cA957585",
  43113: "0x85Fe79b998509B77BF10A8BD4001D58475D29386",
  43114: "0x60377C7016E4cdB03C87EF474896C11cB560752C",
  80001: "0xEB796bdb90fFA0f28255275e16936D25d3418603",
  84531: "0x507c3a7C6Ccc253884A2e3a3ee2A211cC7E796a6",
  421613: "0xE40983C2476032A0915600b9472B3141aA5B5Ba9",
  11155111: "0x109412E3C84f0539b43d39dB691B08c90f58dC7c",
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4E583d9390082B65Bef884b629DFA426114CED6d)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x567c4B141ED61923967cA25Ef4906C8781069a10)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd1e2cFb6441680002Eb7A44223160aB9B67d7E6E)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0x2dFe937cD98Ab92e59cF3139138f18c823a4efE7)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3E14dC1b13c488a8d5D310918780c983bD5982E7)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xE40983C2476032A0915600b9472B3141aA5B5Ba9)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xe64f81d5dDdA1c7172e5C6d964E8ef1BD82D8704)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4C073B3baB6d8826b8C5b229f3cfdC1eC6E47E74)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCf8Acb4eF033efF16E8080aed4c7D5B9285D2192)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0xA4Ff07cF81C02CFD356184879D953970cA957585)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x85Fe79b998509B77BF10A8BD4001D58475D29386)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x60377C7016E4cdB03C87EF474896C11cB560752C)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xEB796bdb90fFA0f28255275e16936D25d3418603)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x507c3a7C6Ccc253884A2e3a3ee2A211cC7E796a6)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xE40983C2476032A0915600b9472B3141aA5B5Ba9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x109412E3C84f0539b43d39dB691B08c90f58dC7c)
 */
export const hostConfig = { address: hostAddress, abi: hostABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Native Asset Super Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nativeAssetSuperTokenABI = [
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_ALREADY_EXISTS" },
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_DOES_NOT_EXIST" },
  { type: "error", inputs: [], name: "SF_TOKEN_BURN_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_MOVE_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_LISTED_AGREEMENT" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_BURN_FROM_ZERO_ADDRESS" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_CALLER_IS_NOT_OPERATOR_FOR_HOLDER",
  },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_MINT_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NFT_PROXY_ADDRESS_CHANGED" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_NOT_ERC777_TOKENS_RECIPIENT",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NO_UNDERLYING_TOKEN" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_GOV_OWNER" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_SELF" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_TO_ZERO_ADDRESS" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "data",
        internalType: "bytes32[]",
        type: "bytes32[]",
        indexed: false,
      },
    ],
    name: "AgreementCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "penaltyAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementLiquidated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "liquidatorAccount",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "penaltyAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "bondAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "bailoutAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementLiquidatedBy",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "liquidatorAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "targetAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmountReceiver",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "targetAccountBalanceDelta",
        internalType: "int256",
        type: "int256",
        indexed: false,
      },
      {
        name: "liquidationTypeData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "AgreementLiquidatedV2",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "slotId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementStateUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "AgreementTerminated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "data",
        internalType: "bytes32[]",
        type: "bytes32[]",
        indexed: false,
      },
    ],
    name: "AgreementUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenHolder",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AuthorizedOperator",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "bailoutAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "bailoutAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Bailout",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Burned",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "constantInflowNFT",
        internalType: "contract IConstantInflowNFT",
        type: "address",
        indexed: true,
      },
    ],
    name: "ConstantInflowNFTCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "constantOutflowNFT",
        internalType: "contract IConstantOutflowNFT",
        type: "address",
        indexed: true,
      },
    ],
    name: "ConstantOutflowNFTCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Minted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenHolder",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RevokedOperator",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Sent",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokenDowngraded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokenUpgraded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CONSTANT_INFLOW_NFT",
    outputs: [
      {
        name: "",
        internalType: "contract IConstantInflowNFT",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CONSTANT_OUTFLOW_NFT",
    outputs: [
      {
        name: "",
        internalType: "contract IConstantOutflowNFT",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "authorizeOperator",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "burn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "data", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "createAgreement",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "subtractedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "defaultOperators",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "downgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "downgradeTo",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "wad", internalType: "uint256", type: "uint256" }],
    name: "downgradeToETH",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "getAccountActiveAgreements",
    outputs: [
      {
        name: "activeAgreements",
        internalType: "contract ISuperAgreement[]",
        type: "address[]",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementClass", internalType: "address", type: "address" },
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "getAgreementData",
    outputs: [{ name: "data", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementClass", internalType: "address", type: "address" },
      { name: "account", internalType: "address", type: "address" },
      { name: "slotId", internalType: "uint256", type: "uint256" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "getAgreementStateSlot",
    outputs: [
      { name: "slotData", internalType: "bytes32[]", type: "bytes32[]" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getHost",
    outputs: [{ name: "host", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getUnderlyingToken",
    outputs: [{ name: "tokenAddr", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "granularity",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "addedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "underlyingToken",
        internalType: "contract IERC20",
        type: "address",
      },
      { name: "underlyingDecimals", internalType: "uint8", type: "uint8" },
      { name: "n", internalType: "string", type: "string" },
      { name: "s", internalType: "string", type: "string" },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "isAccountCritical",
    outputs: [{ name: "isCritical", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "isAccountCriticalNow",
    outputs: [{ name: "isCritical", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "isAccountSolvent",
    outputs: [{ name: "isSolvent", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "isAccountSolventNow",
    outputs: [{ name: "isSolvent", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "tokenHolder", internalType: "address", type: "address" },
    ],
    name: "isOperatorFor",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "liquidationTypeData", internalType: "bytes", type: "bytes" },
      { name: "liquidatorAccount", internalType: "address", type: "address" },
      { name: "useDefaultRewardAccount", internalType: "bool", type: "bool" },
      { name: "targetAccount", internalType: "address", type: "address" },
      { name: "rewardAmount", internalType: "uint256", type: "uint256" },
      {
        name: "targetAccountBalanceDelta",
        internalType: "int256",
        type: "int256",
      },
    ],
    name: "makeLiquidationPayoutsV2",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationApprove",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "subtractedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "operationDecreaseAllowance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationDowngrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "addedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "operationIncreaseAllowance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "operationSend",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationUpgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
      { name: "operatorData", internalType: "bytes", type: "bytes" },
    ],
    name: "operatorBurn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
      { name: "operatorData", internalType: "bytes", type: "bytes" },
    ],
    name: "operatorSend",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "realtimeBalanceOf",
    outputs: [
      { name: "availableBalance", internalType: "int256", type: "int256" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "realtimeBalanceOfNow",
    outputs: [
      { name: "availableBalance", internalType: "int256", type: "int256" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "revokeOperator",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "selfApproveFor",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "selfBurn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "selfMint",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "selfTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "send",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "delta", internalType: "int256", type: "int256" },
    ],
    name: "settleBalance",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "terminateAgreement",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "recipient", internalType: "address", type: "address" }],
    name: "transferAll",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "data", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "updateAgreementData",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "slotId", internalType: "uint256", type: "uint256" },
      { name: "slotData", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "updateAgreementStateSlot",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "upgrade",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [],
    name: "upgradeByETH",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "upgradeByETHTo",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "upgradeTo",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pure Super Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pureSuperTokenABI = [
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_ALREADY_EXISTS" },
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_DOES_NOT_EXIST" },
  { type: "error", inputs: [], name: "SF_TOKEN_BURN_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_MOVE_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_LISTED_AGREEMENT" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_BURN_FROM_ZERO_ADDRESS" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_CALLER_IS_NOT_OPERATOR_FOR_HOLDER",
  },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_MINT_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NFT_PROXY_ADDRESS_CHANGED" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_NOT_ERC777_TOKENS_RECIPIENT",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NO_UNDERLYING_TOKEN" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_GOV_OWNER" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_SELF" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_TO_ZERO_ADDRESS" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "data",
        internalType: "bytes32[]",
        type: "bytes32[]",
        indexed: false,
      },
    ],
    name: "AgreementCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "penaltyAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementLiquidated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "liquidatorAccount",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "penaltyAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "bondAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "bailoutAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementLiquidatedBy",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "liquidatorAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "targetAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmountReceiver",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "targetAccountBalanceDelta",
        internalType: "int256",
        type: "int256",
        indexed: false,
      },
      {
        name: "liquidationTypeData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "AgreementLiquidatedV2",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "slotId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementStateUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "AgreementTerminated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "data",
        internalType: "bytes32[]",
        type: "bytes32[]",
        indexed: false,
      },
    ],
    name: "AgreementUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenHolder",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AuthorizedOperator",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "bailoutAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "bailoutAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Bailout",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Burned",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "constantInflowNFT",
        internalType: "contract IConstantInflowNFT",
        type: "address",
        indexed: true,
      },
    ],
    name: "ConstantInflowNFTCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "constantOutflowNFT",
        internalType: "contract IConstantOutflowNFT",
        type: "address",
        indexed: true,
      },
    ],
    name: "ConstantOutflowNFTCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Minted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenHolder",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RevokedOperator",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Sent",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokenDowngraded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokenUpgraded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CONSTANT_INFLOW_NFT",
    outputs: [
      {
        name: "",
        internalType: "contract IConstantInflowNFT",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CONSTANT_OUTFLOW_NFT",
    outputs: [
      {
        name: "",
        internalType: "contract IConstantOutflowNFT",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "authorizeOperator",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "burn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "data", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "createAgreement",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "subtractedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "defaultOperators",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "downgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "downgradeTo",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "getAccountActiveAgreements",
    outputs: [
      {
        name: "activeAgreements",
        internalType: "contract ISuperAgreement[]",
        type: "address[]",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementClass", internalType: "address", type: "address" },
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "getAgreementData",
    outputs: [{ name: "data", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementClass", internalType: "address", type: "address" },
      { name: "account", internalType: "address", type: "address" },
      { name: "slotId", internalType: "uint256", type: "uint256" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "getAgreementStateSlot",
    outputs: [
      { name: "slotData", internalType: "bytes32[]", type: "bytes32[]" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getHost",
    outputs: [{ name: "host", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getUnderlyingToken",
    outputs: [{ name: "tokenAddr", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "granularity",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "addedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "underlyingToken",
        internalType: "contract IERC20",
        type: "address",
      },
      { name: "underlyingDecimals", internalType: "uint8", type: "uint8" },
      { name: "n", internalType: "string", type: "string" },
      { name: "s", internalType: "string", type: "string" },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "name", internalType: "string", type: "string" },
      { name: "symbol", internalType: "string", type: "string" },
      { name: "initialSupply", internalType: "uint256", type: "uint256" },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "isAccountCritical",
    outputs: [{ name: "isCritical", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "isAccountCriticalNow",
    outputs: [{ name: "isCritical", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "isAccountSolvent",
    outputs: [{ name: "isSolvent", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "isAccountSolventNow",
    outputs: [{ name: "isSolvent", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "tokenHolder", internalType: "address", type: "address" },
    ],
    name: "isOperatorFor",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "liquidationTypeData", internalType: "bytes", type: "bytes" },
      { name: "liquidatorAccount", internalType: "address", type: "address" },
      { name: "useDefaultRewardAccount", internalType: "bool", type: "bool" },
      { name: "targetAccount", internalType: "address", type: "address" },
      { name: "rewardAmount", internalType: "uint256", type: "uint256" },
      {
        name: "targetAccountBalanceDelta",
        internalType: "int256",
        type: "int256",
      },
    ],
    name: "makeLiquidationPayoutsV2",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationApprove",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "subtractedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "operationDecreaseAllowance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationDowngrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "addedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "operationIncreaseAllowance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "operationSend",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationUpgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
      { name: "operatorData", internalType: "bytes", type: "bytes" },
    ],
    name: "operatorBurn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
      { name: "operatorData", internalType: "bytes", type: "bytes" },
    ],
    name: "operatorSend",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "realtimeBalanceOf",
    outputs: [
      { name: "availableBalance", internalType: "int256", type: "int256" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "realtimeBalanceOfNow",
    outputs: [
      { name: "availableBalance", internalType: "int256", type: "int256" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "revokeOperator",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "selfApproveFor",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "selfBurn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "selfMint",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "selfTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "send",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "delta", internalType: "int256", type: "int256" },
    ],
    name: "settleBalance",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "terminateAgreement",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "recipient", internalType: "address", type: "address" }],
    name: "transferAll",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "data", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "updateAgreementData",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "slotId", internalType: "uint256", type: "uint256" },
      { name: "slotData", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "updateAgreementStateSlot",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "upgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "upgradeTo",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Super Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const superTokenABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "constantOutflowNFT",
        internalType: "contract IConstantOutflowNFT",
        type: "address",
      },
      {
        name: "constantInflowNFT",
        internalType: "contract IConstantInflowNFT",
        type: "address",
      },
    ],
  },
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_ALREADY_EXISTS" },
  { type: "error", inputs: [], name: "SF_TOKEN_AGREEMENT_DOES_NOT_EXIST" },
  { type: "error", inputs: [], name: "SF_TOKEN_BURN_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_MOVE_INSUFFICIENT_BALANCE" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SF_TOKEN_ONLY_LISTED_AGREEMENT" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_APPROVE_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_BURN_FROM_ZERO_ADDRESS" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_CALLER_IS_NOT_OPERATOR_FOR_HOLDER",
  },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_MINT_TO_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NFT_PROXY_ADDRESS_CHANGED" },
  {
    type: "error",
    inputs: [],
    name: "SUPER_TOKEN_NOT_ERC777_TOKENS_RECIPIENT",
  },
  { type: "error", inputs: [], name: "SUPER_TOKEN_NO_UNDERLYING_TOKEN" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_GOV_OWNER" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_HOST" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_ONLY_SELF" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_FROM_ZERO_ADDRESS" },
  { type: "error", inputs: [], name: "SUPER_TOKEN_TRANSFER_TO_ZERO_ADDRESS" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "data",
        internalType: "bytes32[]",
        type: "bytes32[]",
        indexed: false,
      },
    ],
    name: "AgreementCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "penaltyAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementLiquidated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "liquidatorAccount",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "penaltyAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "bondAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "bailoutAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementLiquidatedBy",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "liquidatorAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "targetAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardAmountReceiver",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "rewardAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "targetAccountBalanceDelta",
        internalType: "int256",
        type: "int256",
        indexed: false,
      },
      {
        name: "liquidationTypeData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "AgreementLiquidatedV2",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "slotId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AgreementStateUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "AgreementTerminated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "agreementClass",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "bytes32", type: "bytes32", indexed: false },
      {
        name: "data",
        internalType: "bytes32[]",
        type: "bytes32[]",
        indexed: false,
      },
    ],
    name: "AgreementUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenHolder",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AuthorizedOperator",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "bailoutAccount",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "bailoutAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Bailout",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Burned",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "uuid",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "codeAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "CodeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "constantInflowNFT",
        internalType: "contract IConstantInflowNFT",
        type: "address",
        indexed: true,
      },
    ],
    name: "ConstantInflowNFTCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "constantOutflowNFT",
        internalType: "contract IConstantOutflowNFT",
        type: "address",
        indexed: true,
      },
    ],
    name: "ConstantOutflowNFTCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "version", internalType: "uint8", type: "uint8", indexed: false },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Minted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenHolder",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RevokedOperator",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      {
        name: "operatorData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "Sent",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokenDowngraded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokenUpgraded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CONSTANT_INFLOW_NFT",
    outputs: [
      {
        name: "",
        internalType: "contract IConstantInflowNFT",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CONSTANT_OUTFLOW_NFT",
    outputs: [
      {
        name: "",
        internalType: "contract IConstantOutflowNFT",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "castrate",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "data", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "createAgreement",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "getAccountActiveAgreements",
    outputs: [
      {
        name: "",
        internalType: "contract ISuperAgreement[]",
        type: "address[]",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementClass", internalType: "address", type: "address" },
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "getAgreementData",
    outputs: [{ name: "data", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "agreementClass", internalType: "address", type: "address" },
      { name: "account", internalType: "address", type: "address" },
      { name: "slotId", internalType: "uint256", type: "uint256" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "getAgreementStateSlot",
    outputs: [
      { name: "slotData", internalType: "bytes32[]", type: "bytes32[]" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getCodeAddress",
    outputs: [
      { name: "codeAddress", internalType: "address", type: "address" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getHost",
    outputs: [{ name: "host", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "isAccountCritical",
    outputs: [{ name: "isCritical", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "isAccountCriticalNow",
    outputs: [{ name: "isCritical", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "isAccountSolvent",
    outputs: [{ name: "isSolvent", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "isAccountSolventNow",
    outputs: [{ name: "isSolvent", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "liquidationTypeData", internalType: "bytes", type: "bytes" },
      { name: "liquidatorAccount", internalType: "address", type: "address" },
      { name: "useDefaultRewardAccount", internalType: "bool", type: "bool" },
      { name: "targetAccount", internalType: "address", type: "address" },
      { name: "rewardAmount", internalType: "uint256", type: "uint256" },
      {
        name: "targetAccountBalanceDelta",
        internalType: "int256",
        type: "int256",
      },
    ],
    name: "makeLiquidationPayoutsV2",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "realtimeBalanceOf",
    outputs: [
      { name: "availableBalance", internalType: "int256", type: "int256" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "realtimeBalanceOfNow",
    outputs: [
      { name: "availableBalance", internalType: "int256", type: "int256" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "delta", internalType: "int256", type: "int256" },
    ],
    name: "settleBalance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "dataLength", internalType: "uint256", type: "uint256" },
    ],
    name: "terminateAgreement",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "bytes32", type: "bytes32" },
      { name: "data", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "updateAgreementData",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "slotId", internalType: "uint256", type: "uint256" },
      { name: "slotData", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "updateAgreementStateSlot",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "underlyingToken",
        internalType: "contract IERC20",
        type: "address",
      },
      { name: "underlyingDecimals", internalType: "uint8", type: "uint8" },
      { name: "n", internalType: "string", type: "string" },
      { name: "s", internalType: "string", type: "string" },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newAddress", internalType: "address", type: "address" }],
    name: "updateCode",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "holder", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "addedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "subtractedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "granularity",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "send",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "burn",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "tokenHolder", internalType: "address", type: "address" },
    ],
    name: "isOperatorFor",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "authorizeOperator",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "revokeOperator",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "defaultOperators",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
      { name: "operatorData", internalType: "bytes", type: "bytes" },
    ],
    name: "operatorSend",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
      { name: "operatorData", internalType: "bytes", type: "bytes" },
    ],
    name: "operatorBurn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "selfMint",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "selfBurn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "selfApproveFor",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "holder", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "selfTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "recipient", internalType: "address", type: "address" }],
    name: "transferAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getUnderlyingToken",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "upgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "upgradeTo",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "downgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "downgradeTo",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationApprove",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "addedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "operationIncreaseAllowance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "subtractedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "operationDecreaseAllowance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "userData", internalType: "bytes", type: "bytes" },
    ],
    name: "operationSend",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationUpgrade",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "operationDowngrade",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SuperfluidGovernance
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const superfluidGovernanceABI = [
  { type: "error", inputs: [], name: "SF_GOV_II_ONLY_OWNER" },
  {
    type: "error",
    inputs: [],
    name: "SF_GOV_INVALID_LIQUIDATION_OR_PATRICIAN_PERIOD",
  },
  { type: "error", inputs: [], name: "SF_GOV_MUST_BE_CONTRACT" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "factory",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "authorized",
        internalType: "bool",
        type: "bool",
        indexed: false,
      },
    ],
    name: "AppFactoryAuthorizationChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "deployer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "appRegistrationKey",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "expirationTs",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "AppRegistrationKeyChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      { name: "isKeySet", internalType: "bool", type: "bool", indexed: false },
      {
        name: "liquidationPeriod",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "CFAv1LiquidationPeriodChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "uuid",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "codeAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "CodeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      { name: "key", internalType: "bytes32", type: "bytes32", indexed: false },
      { name: "isKeySet", internalType: "bool", type: "bool", indexed: false },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ConfigChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "version", internalType: "uint8", type: "uint8", indexed: false },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      { name: "isKeySet", internalType: "bool", type: "bool", indexed: false },
      {
        name: "liquidationPeriod",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "patricianPeriod",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "PPPConfigurationChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      { name: "isKeySet", internalType: "bool", type: "bool", indexed: false },
      {
        name: "rewardAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "RewardAddressChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      { name: "isKeySet", internalType: "bool", type: "bool", indexed: false },
      {
        name: "minimumDeposit",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "SuperTokenMinimumDepositChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "host",
        internalType: "contract ISuperfluid",
        type: "address",
        indexed: true,
      },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      { name: "isKeySet", internalType: "bool", type: "bool", indexed: false },
      {
        name: "forwarder",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      { name: "enabled", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "TrustedForwarderChanged",
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "factory", internalType: "address", type: "address" },
    ],
    name: "authorizeAppFactory",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "tokens",
        internalType: "contract ISuperToken[]",
        type: "address[]",
      },
    ],
    name: "batchUpdateSuperTokenLogic",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "tokens",
        internalType: "contract ISuperToken[]",
        type: "address[]",
      },
      { name: "tokenLogics", internalType: "address[]", type: "address[]" },
    ],
    name: "batchUpdateSuperTokenLogic",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "tokens",
        internalType: "contract ISuperToken[]",
        type: "address[]",
      },
      { name: "minimumDeposits", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchUpdateSuperTokenMinimumDeposit",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "castrate",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "deployer", internalType: "address", type: "address" },
      { name: "registrationKey", internalType: "string", type: "string" },
    ],
    name: "clearAppRegistrationKey",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "key", internalType: "bytes32", type: "bytes32" },
    ],
    name: "clearConfig",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
    ],
    name: "clearPPPConfig",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
    ],
    name: "clearRewardAddress",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperToken",
        type: "address",
      },
    ],
    name: "clearSuperTokenMinimumDeposit",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "forwarder", internalType: "address", type: "address" },
    ],
    name: "disableTrustedForwarder",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "forwarder", internalType: "address", type: "address" },
    ],
    name: "enableTrustedForwarder",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getCodeAddress",
    outputs: [
      { name: "codeAddress", internalType: "address", type: "address" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "key", internalType: "bytes32", type: "bytes32" },
    ],
    name: "getConfigAsAddress",
    outputs: [{ name: "value", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "key", internalType: "bytes32", type: "bytes32" },
    ],
    name: "getConfigAsUint256",
    outputs: [{ name: "period", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
    ],
    name: "getPPPConfig",
    outputs: [
      { name: "liquidationPeriod", internalType: "uint256", type: "uint256" },
      { name: "patricianPeriod", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
    ],
    name: "getRewardAddress",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
    ],
    name: "getSuperTokenMinimumDeposit",
    outputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "factory", internalType: "address", type: "address" },
    ],
    name: "isAuthorizedAppFactory",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "forwarder", internalType: "address", type: "address" },
    ],
    name: "isTrustedForwarder",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "agreementClass", internalType: "address", type: "address" },
    ],
    name: "registerAgreementClass",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "newGov", internalType: "address", type: "address" },
    ],
    name: "replaceGovernance",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "deployer", internalType: "address", type: "address" },
      { name: "registrationKey", internalType: "string", type: "string" },
      { name: "expirationTs", internalType: "uint256", type: "uint256" },
    ],
    name: "setAppRegistrationKey",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "key", internalType: "bytes32", type: "bytes32" },
      { name: "value", internalType: "address", type: "address" },
    ],
    name: "setConfig",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "key", internalType: "bytes32", type: "bytes32" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "setConfig",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "liquidationPeriod", internalType: "uint256", type: "uint256" },
      { name: "patricianPeriod", internalType: "uint256", type: "uint256" },
    ],
    name: "setPPPConfig",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "rewardAddress", internalType: "address", type: "address" },
    ],
    name: "setRewardAddress",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      {
        name: "superToken",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "setSuperTokenMinimumDeposit",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "factory", internalType: "address", type: "address" },
    ],
    name: "unauthorizeAppFactory",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "hostNewLogic", internalType: "address", type: "address" },
      {
        name: "agreementClassNewLogics",
        internalType: "address[]",
        type: "address[]",
      },
      {
        name: "superTokenFactoryNewLogic",
        internalType: "address",
        type: "address",
      },
    ],
    name: "updateContracts",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
      { name: "deployer", internalType: "address", type: "address" },
      { name: "registrationKey", internalType: "string", type: "string" },
    ],
    name: "verifyAppRegistrationKey",
    outputs: [
      { name: "validNow", internalType: "bool", type: "bool" },
      { name: "expirationTs", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newAddress", internalType: "address", type: "address" }],
    name: "updateCode",
    outputs: [],
  },
] as const;
