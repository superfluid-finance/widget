import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import { useCallback } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { ContractWriteResult } from "./ContractWriteManager.js";
import { runEventListener } from "./EventListeners.js";
import { useWidget } from "./WidgetContext.js";

export type ContractWriteButtonProps = ContractWriteResult;

export default function ContractWriteButton({
  contractWrite,
  prepareResult,
  writeResult,
  transactionResult,
}: ContractWriteButtonProps) {
  const { eventListeners } = useWidget();

  const write = writeResult.write;

  const isLoading =
    prepareResult.isLoading ||
    writeResult.isLoading ||
    transactionResult.isLoading;

  const expectedChainId = contractWrite.chainId;
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const needsToSwitchNetwork = expectedChainId !== chain?.id;

  const onSwitchNetworkButtonClick = useCallback(() => {
    switchNetwork?.(expectedChainId);
    runEventListener(eventListeners.onButtonClick, { type: "switch_network" });
  }, [switchNetwork, expectedChainId, eventListeners.onButtonClick]);

  const onContractWriteButtonClick = useCallback(() => {
    write?.();
    runEventListener(eventListeners.onButtonClick, {
      type: "invoke_transaction",
    });
  }, [write, eventListeners.onButtonClick]);

  // encodeFunctionData({
  //   abi: ,
  // });

  // useContractWrite({
  //   abi: superfluidHostABI,
  //   address: superfluidHostAddress[expectedChainId as keyof typeof superfluidHostAddress],
  //   functionName: "batchCall",
  //   args: [
  //     // SuperUpgrader
  //     // createFlow
  //   ]
  // })

  return (
    <Stack direction="column" alignItems="stretch" sx={{ width: "100%" }}>
      {needsToSwitchNetwork ? (
        <Button
          data-testid="switch-network-button"
          size="large"
          variant="contained"
          fullWidth
          onClick={onSwitchNetworkButtonClick}
        >
          Switch Network
        </Button>
      ) : (
        <>
          {/* <Button disabled={isSignatureLoading} onClick={() => signTypedData()}>Sign</Button>
        {isSignatureSuccess && <div>Signature: {signatureData}</div>}
        {isSignatureError && <div>Error signing message</div>} */}
          <LoadingButton
            loadingIndicator="Loading…"
            data-testid="transaction-button"
            size="large"
            variant="contained"
            fullWidth
            disabled={!write || transactionResult.isSuccess}
            onClick={onContractWriteButtonClick}
            loading={isLoading}
          >
            {contractWrite.displayTitle}
          </LoadingButton>
        </>
      )}
    </Stack>
  );
}

// const typedData: Parameters<typeof useSignTypedData>[0] = {
//   "types": {
//     // "EIP712Domain": [
//     //   {
//     //     "name": "name",
//     //     "type": "string"
//     //   },
//     //   {
//     //     "name": "version",
//     //     "type": "string"
//     //   },
//     //   {
//     //     "name": "chainId",
//     //     "type": "uint256"
//     //   },
//     //   {
//     //     "name": "verifyingContract",
//     //     "type": "address"
//     //   }
//     // ],
//     "Permit": [
//       {
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "name": "value",
//         "type": "uint256"
//       },
//       {
//         "name": "nonce",
//         "type": "uint256"
//       },
//       {
//         "name": "deadline",
//         "type": "uint256"
//       }
//     ],
//   },
//   "primaryType": "Permit",
//   // "domain": {
//   //   "name": erc20name,
//   //   "version": version,
//   //   "chainId": chainid,
//   //   "verifyingContract": tokenAddress
//   // },
//   // "message": {
//   //   "owner": owner,
//   //   "spender": spender,
//   //   "value": value,
//   //   "nonce": nonce,
//   //   "deadline": deadline
//   // }
// };
// const { data: signatureData, signTypedData, isLoading: isSignatureLoading, isSuccess: isSignatureSuccess, isError: isSignatureError } = useSignTypedData();
