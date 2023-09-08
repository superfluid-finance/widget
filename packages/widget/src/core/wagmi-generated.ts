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
// Constant Flow Agreement V1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2844c1BBdA121E9E43105630b9C8310e5c72744b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x204C6f131bb7F258b2Ea1593f5309911d8E458eD)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x49c38108870e74Cb9420C0991a85D3edd6363F75)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xEbdA4ceF883A7B12c4E669Ebc58927FBa8447C7D)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x6EeE6060f715257b970700bc2656De21dEdF074C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xff48668fa670A85e55A7a822b352d5ccF3E7b18C)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x1EAa5ceA064aab2692AF257FB31f5291fdA3Cdee)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x19ba78B9cDB05A877718841c574325fdB53601bb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x731FdBB12944973B500518aea61942381d7e240D)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0x9d369e78e1a682cE0F8d9aD849BeA4FE1c3bD3Ad)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x16843ac25Ccc58Aa7960ba05f61cBB17b36b130A)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x6946c5B38Ffea373b0a2340b4AEf0De8F6782e58)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x4C476F2Fb27272680F2f6f2592E94d9e704691bC)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xff48668fa670A85e55A7a822b352d5ccF3E7b18C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6836F23d6171D74Ef62FcF776655aBcD2bcd62Ef)
 */
export const constantFlowAgreementV1ABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "host", internalType: "contract ISuperfluid", type: "address" },
    ],
  },
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
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "flowOperator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "permissions",
        internalType: "uint8",
        type: "uint8",
        indexed: false,
      },
      {
        name: "flowRateAllowance",
        internalType: "int96",
        type: "int96",
        indexed: false,
      },
    ],
    name: "FlowOperatorUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "receiver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "flowRate",
        internalType: "int96",
        type: "int96",
        indexed: false,
      },
      {
        name: "totalSenderFlowRate",
        internalType: "int256",
        type: "int256",
        indexed: false,
      },
      {
        name: "totalReceiverFlowRate",
        internalType: "int256",
        type: "int256",
        indexed: false,
      },
      {
        name: "userData",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
    ],
    name: "FlowUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "flowOperator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "deposit",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FlowUpdatedExtension",
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
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CFA_HOOK_GAS_LIMIT",
    outputs: [{ name: "", internalType: "uint64", type: "uint64" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DEFAULT_MINIMUM_DEPOSIT",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAXIMUM_DEPOSIT",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAXIMUM_FLOW_RATE",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      { name: "existingPermissions", internalType: "uint8", type: "uint8" },
      { name: "permissionDelta", internalType: "uint8", type: "uint8" },
    ],
    name: "addPermissions",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "agreementType",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperator", internalType: "address", type: "address" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "authorizeFlowOperatorWithFullControl",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
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
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowRate", internalType: "int96", type: "int96" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "createFlow",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowRate", internalType: "int96", type: "int96" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "createFlowByOperator",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperator", internalType: "address", type: "address" },
      {
        name: "subtractedFlowRateAllowance",
        internalType: "int96",
        type: "int96",
      },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "decreaseFlowRateAllowance",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperator", internalType: "address", type: "address" },
      { name: "permissionsToRemove", internalType: "uint8", type: "uint8" },
      {
        name: "subtractedFlowRateAllowance",
        internalType: "int96",
        type: "int96",
      },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "decreaseFlowRateAllowanceWithPermissions",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "deleteFlow",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "deleteFlowByOperator",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "getAccountFlowInfo",
    outputs: [
      { name: "timestamp", internalType: "uint256", type: "uint256" },
      { name: "flowRate", internalType: "int96", type: "int96" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
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
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowRate", internalType: "int96", type: "int96" },
    ],
    name: "getDepositRequiredForFlowRate",
    outputs: [{ name: "deposit", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
    ],
    name: "getFlow",
    outputs: [
      { name: "timestamp", internalType: "uint256", type: "uint256" },
      { name: "flowRate", internalType: "int96", type: "int96" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowId", internalType: "bytes32", type: "bytes32" },
    ],
    name: "getFlowByID",
    outputs: [
      { name: "timestamp", internalType: "uint256", type: "uint256" },
      { name: "flowRate", internalType: "int96", type: "int96" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "sender", internalType: "address", type: "address" },
      { name: "flowOperator", internalType: "address", type: "address" },
    ],
    name: "getFlowOperatorData",
    outputs: [
      { name: "flowOperatorId", internalType: "bytes32", type: "bytes32" },
      { name: "permissions", internalType: "uint8", type: "uint8" },
      { name: "flowRateAllowance", internalType: "int96", type: "int96" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperatorId", internalType: "bytes32", type: "bytes32" },
    ],
    name: "getFlowOperatorDataByID",
    outputs: [
      { name: "permissions", internalType: "uint8", type: "uint8" },
      { name: "flowRateAllowance", internalType: "int96", type: "int96" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "deposit", internalType: "uint256", type: "uint256" },
    ],
    name: "getMaximumFlowRateFromDeposit",
    outputs: [{ name: "flowRate", internalType: "int96", type: "int96" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "getNetFlow",
    outputs: [{ name: "flowRate", internalType: "int96", type: "int96" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperator", internalType: "address", type: "address" },
      { name: "addedFlowRateAllowance", internalType: "int96", type: "int96" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "increaseFlowRateAllowance",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperator", internalType: "address", type: "address" },
      { name: "permissionsToAdd", internalType: "uint8", type: "uint8" },
      { name: "addedFlowRateAllowance", internalType: "int96", type: "int96" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "increaseFlowRateAllowanceWithPermissions",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "account", internalType: "address", type: "address" },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "isPatricianPeriod",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "isPatricianPeriodNow",
    outputs: [
      {
        name: "isCurrentlyPatricianPeriod",
        internalType: "bool",
        type: "bool",
      },
      { name: "timestamp", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "account", internalType: "address", type: "address" },
      { name: "time", internalType: "uint256", type: "uint256" },
    ],
    name: "realtimeBalanceOf",
    outputs: [
      { name: "dynamicBalance", internalType: "int256", type: "int256" },
      { name: "deposit", internalType: "uint256", type: "uint256" },
      { name: "owedDeposit", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      { name: "existingPermissions", internalType: "uint8", type: "uint8" },
      { name: "permissionDelta", internalType: "uint8", type: "uint8" },
    ],
    name: "removePermissions",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperator", internalType: "address", type: "address" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "revokeFlowOperatorWithFullControl",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newAddress", internalType: "address", type: "address" }],
    name: "updateCode",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowRate", internalType: "int96", type: "int96" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "updateFlow",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "flowRate", internalType: "int96", type: "int96" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "updateFlowByOperator",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "token",
        internalType: "contract ISuperfluidToken",
        type: "address",
      },
      { name: "flowOperator", internalType: "address", type: "address" },
      { name: "permissions", internalType: "uint8", type: "uint8" },
      { name: "flowRateAllowance", internalType: "int96", type: "int96" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "updateFlowOperatorPermissions",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2844c1BBdA121E9E43105630b9C8310e5c72744b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x204C6f131bb7F258b2Ea1593f5309911d8E458eD)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x49c38108870e74Cb9420C0991a85D3edd6363F75)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xEbdA4ceF883A7B12c4E669Ebc58927FBa8447C7D)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x6EeE6060f715257b970700bc2656De21dEdF074C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xff48668fa670A85e55A7a822b352d5ccF3E7b18C)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x1EAa5ceA064aab2692AF257FB31f5291fdA3Cdee)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x19ba78B9cDB05A877718841c574325fdB53601bb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x731FdBB12944973B500518aea61942381d7e240D)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0x9d369e78e1a682cE0F8d9aD849BeA4FE1c3bD3Ad)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x16843ac25Ccc58Aa7960ba05f61cBB17b36b130A)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x6946c5B38Ffea373b0a2340b4AEf0De8F6782e58)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x4C476F2Fb27272680F2f6f2592E94d9e704691bC)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xff48668fa670A85e55A7a822b352d5ccF3E7b18C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6836F23d6171D74Ef62FcF776655aBcD2bcd62Ef)
 */
export const constantFlowAgreementV1Address = {
  1: "0x2844c1BBdA121E9E43105630b9C8310e5c72744b",
  5: "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8",
  10: "0x204C6f131bb7F258b2Ea1593f5309911d8E458eD",
  56: "0x49c38108870e74Cb9420C0991a85D3edd6363F75",
  100: "0xEbdA4ceF883A7B12c4E669Ebc58927FBa8447C7D",
  137: "0x6EeE6060f715257b970700bc2656De21dEdF074C",
  420: "0xff48668fa670A85e55A7a822b352d5ccF3E7b18C",
  1442: "0x1EAa5ceA064aab2692AF257FB31f5291fdA3Cdee",
  8453: "0x19ba78B9cDB05A877718841c574325fdB53601bb",
  42161: "0x731FdBB12944973B500518aea61942381d7e240D",
  42220: "0x9d369e78e1a682cE0F8d9aD849BeA4FE1c3bD3Ad",
  43113: "0x16843ac25Ccc58Aa7960ba05f61cBB17b36b130A",
  43114: "0x6946c5B38Ffea373b0a2340b4AEf0De8F6782e58",
  80001: "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
  84531: "0x4C476F2Fb27272680F2f6f2592E94d9e704691bC",
  421613: "0xff48668fa670A85e55A7a822b352d5ccF3E7b18C",
  11155111: "0x6836F23d6171D74Ef62FcF776655aBcD2bcd62Ef",
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2844c1BBdA121E9E43105630b9C8310e5c72744b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x204C6f131bb7F258b2Ea1593f5309911d8E458eD)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x49c38108870e74Cb9420C0991a85D3edd6363F75)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xEbdA4ceF883A7B12c4E669Ebc58927FBa8447C7D)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x6EeE6060f715257b970700bc2656De21dEdF074C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xff48668fa670A85e55A7a822b352d5ccF3E7b18C)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x1EAa5ceA064aab2692AF257FB31f5291fdA3Cdee)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x19ba78B9cDB05A877718841c574325fdB53601bb)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x731FdBB12944973B500518aea61942381d7e240D)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0x9d369e78e1a682cE0F8d9aD849BeA4FE1c3bD3Ad)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x16843ac25Ccc58Aa7960ba05f61cBB17b36b130A)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0x6946c5B38Ffea373b0a2340b4AEf0De8F6782e58)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x4C476F2Fb27272680F2f6f2592E94d9e704691bC)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0xff48668fa670A85e55A7a822b352d5ccF3E7b18C)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x6836F23d6171D74Ef62FcF776655aBcD2bcd62Ef)
 */
export const constantFlowAgreementV1Config = {
  address: constantFlowAgreementV1Address,
  abi: constantFlowAgreementV1ABI,
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
// Native Asset Super Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nativeAssetSuperTokenABI = [
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
  { stateMutability: "payable", type: "fallback" },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "wad", internalType: "uint256", type: "uint256" }],
    name: "downgradeToETH",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "initialAddress", internalType: "address", type: "address" },
    ],
    name: "initializeProxy",
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
  { stateMutability: "payable", type: "receive" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pure Super Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pureSuperTokenABI = [
  { stateMutability: "payable", type: "fallback" },
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
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "initialAddress", internalType: "address", type: "address" },
    ],
    name: "initializeProxy",
    outputs: [],
  },
  { stateMutability: "payable", type: "receive" },
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
    stateMutability: "pure",
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
    inputs: [],
    name: "getUnderlyingToken",
    outputs: [{ name: "", internalType: "address", type: "address" }],
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
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
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
    inputs: [{ name: "newAddress", internalType: "address", type: "address" }],
    name: "updateCode",
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
// SuperUpgrader
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xAEf1F1Ee5b5652560f305e9c0278d137a6AB5e9C)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb7db015aa9f37142340c94f09c543ad51b53e961)
 */
export const superUpgraderABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "_usdc", internalType: "contract FakeUSDC", type: "address" },
      { name: "_usdcx", internalType: "contract ISuperToken", type: "address" },
      { name: "_permit2", internalType: "contract IPermit2", type: "address" },
      { name: "_automate", internalType: "address", type: "address" },
    ],
  },
  { type: "error", inputs: [], name: "BAD_ETH_TRANSFER" },
  { type: "error", inputs: [], name: "INVALID_HOST" },
  { type: "error", inputs: [], name: "LOWER_LIMIT_NOT_REACHED" },
  { type: "error", inputs: [], name: "NOT_ENOUGH_GAS_TANK_BALANCE" },
  { type: "error", inputs: [], name: "NOT_NEGATIVE_FLOW_RATE" },
  { type: "error", inputs: [], name: "TASK_ALREADY_EXISTS_FOR_USER" },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "LOWER_LIMIT",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "UPPER_LIMIT",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "contract ISuperToken", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterAgreementCreated",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "contract ISuperToken", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterAgreementTerminated",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "contract ISuperToken", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterAgreementUpdated",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "automate",
    outputs: [
      { name: "", internalType: "contract IAutomate", type: "address" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "contract ISuperToken", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeAgreementCreated",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "contract ISuperToken", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeAgreementTerminated",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "contract ISuperToken", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "bytes32", type: "bytes32" },
      { name: "", internalType: "bytes", type: "bytes" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeAgreementUpdated",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "checker",
    outputs: [
      { name: "canExec", internalType: "bool", type: "bool" },
      { name: "execPayload", internalType: "bytes", type: "bytes" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "dedicatedMsgSender",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "depositedEther",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "fundsOwner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "host",
    outputs: [
      { name: "", internalType: "contract ISuperfluid", type: "address" },
    ],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "initialUpgradeAmount",
        internalType: "uint256",
        type: "uint256",
      },
      {
        name: "totalAllowanceAmount",
        internalType: "uint256",
        type: "uint256",
      },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "manualUpgradeWithPermit",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "permitSingle",
        internalType: "struct IAllowanceTransfer.PermitSingle",
        type: "tuple",
        components: [
          {
            name: "details",
            internalType: "struct IAllowanceTransfer.PermitDetails",
            type: "tuple",
            components: [
              { name: "token", internalType: "address", type: "address" },
              { name: "amount", internalType: "uint160", type: "uint160" },
              { name: "expiration", internalType: "uint48", type: "uint48" },
              { name: "nonce", internalType: "uint48", type: "uint48" },
            ],
          },
          { name: "spender", internalType: "address", type: "address" },
          { name: "sigDeadline", internalType: "uint256", type: "uint256" },
        ],
      },
      { name: "signature", internalType: "bytes", type: "bytes" },
      {
        name: "initialUpgradeAmount",
        internalType: "uint160",
        type: "uint160",
      },
      { name: "ctx", internalType: "bytes", type: "bytes" },
    ],
    name: "manualUpgradeWithPermit2",
    outputs: [{ name: "newCtx", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "permit2",
    outputs: [{ name: "", internalType: "contract IPermit2", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "taskIds",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "taskTreasury",
    outputs: [
      {
        name: "",
        internalType: "contract ITaskTreasuryUpgradable",
        type: "address",
      },
    ],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "topUpGasTank",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "upgradeWithAutomation",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "usdc",
    outputs: [{ name: "", internalType: "contract FakeUSDC", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "usdcx",
    outputs: [
      { name: "", internalType: "contract ISuperToken", type: "address" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_amount", internalType: "uint256", type: "uint256" },
      { name: "_token", internalType: "address", type: "address" },
    ],
    name: "withdrawFunds",
    outputs: [],
  },
  { stateMutability: "payable", type: "receive" },
] as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xAEf1F1Ee5b5652560f305e9c0278d137a6AB5e9C)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb7db015aa9f37142340c94f09c543ad51b53e961)
 */
export const superUpgraderAddress = {
  5: "0xAEf1F1Ee5b5652560f305e9c0278d137a6AB5e9C",
  80001: "0xb7DB015AA9F37142340C94F09c543Ad51B53e961",
} as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xAEf1F1Ee5b5652560f305e9c0278d137a6AB5e9C)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xb7db015aa9f37142340c94f09c543ad51b53e961)
 */
export const superUpgraderConfig = {
  address: superUpgraderAddress,
  abi: superUpgraderABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SuperfluidGovernance
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xe2E14e2C4518cB06c32Cd0818B4C01f53E1Ba653)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3a648764a6d66440ca096343937c711a7ac1b1e9)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xee07D9fce4Cf2a891BC979E9d365929506C2982f)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xaCc7380323681fdb8a0B9F2FE7d69dDFf0664478)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3AD3f7A0965Ce6f9358AD5CCE86Bc2b05F1EE087)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xF21019b8688e7730Ca6D9002569eCBaF8d1A3083)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x55F7758dd99d5e185f4CC08d4Ad95B71f598264D)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xA55632254Bc9F739bDe7191c8a4510aDdae3ef6D)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0xF74390BabA510ec2fE196c2e02B037380d7a6F12)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x2637eA93EE5cd887ff9AC98185eA67Bd70C5f62e)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xbe20Bac0DCF6f01834F51CCDab2dD72707C6e9b6)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x21d4E9fbB9DB742E6ef4f29d189a7C18B0b59136)
 */
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
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
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
    inputs: [{ name: "newAddress", internalType: "address", type: "address" }],
    name: "updateCode",
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
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xe2E14e2C4518cB06c32Cd0818B4C01f53E1Ba653)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3a648764a6d66440ca096343937c711a7ac1b1e9)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xee07D9fce4Cf2a891BC979E9d365929506C2982f)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xaCc7380323681fdb8a0B9F2FE7d69dDFf0664478)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3AD3f7A0965Ce6f9358AD5CCE86Bc2b05F1EE087)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xF21019b8688e7730Ca6D9002569eCBaF8d1A3083)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x55F7758dd99d5e185f4CC08d4Ad95B71f598264D)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xA55632254Bc9F739bDe7191c8a4510aDdae3ef6D)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0xF74390BabA510ec2fE196c2e02B037380d7a6F12)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x2637eA93EE5cd887ff9AC98185eA67Bd70C5f62e)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xbe20Bac0DCF6f01834F51CCDab2dD72707C6e9b6)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x21d4E9fbB9DB742E6ef4f29d189a7C18B0b59136)
 */
export const superfluidGovernanceAddress = {
  1: "0xe2E14e2C4518cB06c32Cd0818B4C01f53E1Ba653",
  5: "0x3A648764a6d66440Ca096343937c711A7ac1B1e9",
  10: "0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D",
  56: "0xee07D9fce4Cf2a891BC979E9d365929506C2982f",
  100: "0xaCc7380323681fdb8a0B9F2FE7d69dDFf0664478",
  137: "0x3AD3f7A0965Ce6f9358AD5CCE86Bc2b05F1EE087",
  420: "0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f",
  1442: "0xF21019b8688e7730Ca6D9002569eCBaF8d1A3083",
  8453: "0x55F7758dd99d5e185f4CC08d4Ad95B71f598264D",
  42161: "0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D",
  42220: "0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D",
  43113: "0xA55632254Bc9F739bDe7191c8a4510aDdae3ef6D",
  43114: "0xF74390BabA510ec2fE196c2e02B037380d7a6F12",
  80001: "0x2637eA93EE5cd887ff9AC98185eA67Bd70C5f62e",
  84531: "0xbe20Bac0DCF6f01834F51CCDab2dD72707C6e9b6",
  421613: "0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f",
  11155111: "0x21d4E9fbB9DB742E6ef4f29d189a7C18B0b59136",
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xe2E14e2C4518cB06c32Cd0818B4C01f53E1Ba653)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3a648764a6d66440ca096343937c711a7ac1b1e9)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xee07D9fce4Cf2a891BC979E9d365929506C2982f)
 * - [__View Contract on Gnosis Gnosis Chain Explorer__](https://blockscout.com/xdai/mainnet/address/0xaCc7380323681fdb8a0B9F2FE7d69dDFf0664478)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3AD3f7A0965Ce6f9358AD5CCE86Bc2b05F1EE087)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xF21019b8688e7730Ca6D9002569eCBaF8d1A3083)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x55F7758dd99d5e185f4CC08d4Ad95B71f598264D)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Celo Celo Explorer__](https://explorer.celo.org/mainnet/address/0x0170FFCC75d178d426EBad5b1a31451d00Ddbd0D)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xA55632254Bc9F739bDe7191c8a4510aDdae3ef6D)
 * - [__View Contract on Avalanche Snow Trace__](https://snowtrace.io/address/0xF74390BabA510ec2fE196c2e02B037380d7a6F12)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x2637eA93EE5cd887ff9AC98185eA67Bd70C5f62e)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xbe20Bac0DCF6f01834F51CCDab2dD72707C6e9b6)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io//address/0x777Be25F9fdcA87e8a0E06Ad4be93d65429FCb9f)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x21d4E9fbB9DB742E6ef4f29d189a7C18B0b59136)
 */
export const superfluidGovernanceConfig = {
  address: superfluidGovernanceAddress,
  abi: superfluidGovernanceABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SuperfluidHost
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
export const superfluidHostABI = [
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
    ],
    name: "callAppAction",
    outputs: [{ name: "returnedData", internalType: "bytes", type: "bytes" }],
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
    inputs: [],
    name: "castrate",
    outputs: [],
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
        name: "gov",
        internalType: "contract ISuperfluidGovernance",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
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
    name: "isAgreementTypeListed",
    outputs: [{ name: "yes", internalType: "bool", type: "bool" }],
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
      { name: "app", internalType: "contract ISuperApp", type: "address" },
    ],
    name: "isAppJailed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
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
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "ctx", internalType: "bytes", type: "bytes" }],
    name: "isCtxValid",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "forwarder", internalType: "address", type: "address" }],
    name: "isTrustedForwarder",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
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
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
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
    inputs: [{ name: "configWord", internalType: "uint256", type: "uint256" }],
    name: "registerApp",
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
    name: "updateAgreementClass",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newAddress", internalType: "address", type: "address" }],
    name: "updateCode",
    outputs: [],
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
export const superfluidHostAddress = {
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
export const superfluidHostConfig = {
  address: superfluidHostAddress,
  abi: superfluidHostABI,
} as const;
