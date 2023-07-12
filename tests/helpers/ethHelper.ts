import { ethers } from "ethers";
import {
  erc20ABI,
  superTokenABI,
  cfAv1ForwarderABI,
  CFA,
} from "./abis/wagmi-generated";
import { rebounderAddresses } from "../pageObjects/basePage";

const CFAAddress = "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8";
const CFAV1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const fUSDCxAddress = "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a";
const fUSDCAddress = "0xc94dd466416A7dFE166aB2cF916D3875C049EBB7";
const fDAIxAddress = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";
const provider = new ethers.InfuraProvider(5);
const wallet = new ethers.Wallet(
  process.env.WIDGET_WALLET_PRIVATE_KEY!,
  provider,
);
const fUSDCx = new ethers.Contract(
  fUSDCxAddress,
  superTokenABI,
  wallet.provider,
);
const fUSDC = new ethers.Contract(fUSDCAddress, erc20ABI, wallet.provider);
const CFAv1 = new ethers.Contract(CFAAddress, CFA, wallet.provider);
const CFAv1Forwarder = new ethers.Contract(
  CFAV1ForwarderAddress,
  cfAv1ForwarderABI,
  wallet.provider
);

export async function revokeAllowanceIfNeccesary() {
  await fUSDC
    .allowance(process.env.WIDGET_WALLET_PUBLIC_KEY, fUSDCxAddress)
    .then(async (allowance: bigint) => {
      if (Number(allowance) > 0) {
        console.log("Allowance over 0 , revoking...");
        const data = fUSDC.interface.encodeFunctionData("approve", [
          fUSDCxAddress,
          0,
        ]);
        const tx = await wallet.sendTransaction({
          to: fUSDCAddress,
          from: wallet.address,
          data: data,
        });
        await tx.wait().then((receipt) => {
          console.log(`Allowance revoked: ${receipt?.hash}`);
        });
      }
    });
}

export async function deleteFlowIfNeccesary() {
  await CFAv1Forwarder.getFlowInfo(
    fDAIxAddress,
    process.env.WIDGET_WALLET_PUBLIC_KEY,
    rebounderAddresses["goerli"]
  ).then(async (flow: bigint[]) => {
    //returns lastUpdated uint256, flowRate int96, deposit uint256, owedDeposit uint256
    if (flow[1] > 0) {
      console.log("Flow still ongoing, deleting...");
      const data = CFAv1Forwarder.interface.encodeFunctionData("deleteFlow", [
        fDAIxAddress,
        process.env.WIDGET_WALLET_PUBLIC_KEY,
        rebounderAddresses["goerli"],
        "0x",
      ]);
      const tx = await wallet.sendTransaction({
        to: CFAV1ForwarderAddress,
        from: wallet.address,
        data: data,
      });
      await tx.wait().then((receipt) => {
        console.log(`Flow deleted: ${receipt?.hash}`);
      });
    }
  });
}

export async function getUnderlyingTokenBalance() {
  return await fUSDC.balanceOf(process.env.WIDGET_WALLET_PUBLIC_KEY);
}

// Returns availableBalance int256, deposit uint256, owedDeposit uint256, timestamp uint256
export async function getSuperTokenBalance() {
  return await fUSDCx.realtimeBalanceOfNow(
    process.env.WIDGET_WALLET_PUBLIC_KEY
  );
}
