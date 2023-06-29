import { ethers } from "ethers";
import {
  erc20ABI,
  superTokenABI,
  cfAv1ForwarderABI,
} from "./abis/wagmi-generated";

const CFAAddress = "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8";
const fUSDCxAddress = "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a";
const fUSDCAddress = "0xc94dd466416A7dFE166aB2cF916D3875C049EBB7";
const provider = new ethers.InfuraProvider(5);
const wallet = new ethers.Wallet(
  process.env.WIDGET_WALLET_PRIVATE_KEY!,
  provider
);
const fUSDCx = new ethers.Contract(
  fUSDCxAddress,
  superTokenABI,
  wallet.provider
);
const fUSDC = new ethers.Contract(fUSDCAddress, erc20ABI, wallet.provider);
const CFA = new ethers.Contract(CFAAddress, cfAv1ForwarderABI, wallet.provider);

export async function revokeAllowanceIfNeccesary() {
  await fUSDC
    .allowance(
      "0x7c5de59A1b31e3D00279A825Cb95fAEDb09eA9FD",
      "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a"
    )
    .then(async (allowance: bigint) => {
      if (Number(allowance) > 0) {
        console.log("Allowance over 0 , revoking...");
        const data = fUSDC.interface.encodeFunctionData("approve", [
          "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a",
          0,
        ]);
        const tx = await wallet.sendTransaction({
          to: fUSDCAddress,
          from: wallet.address,
          data: data,
        });
        console.log(`Allowance revoked: ${tx.hash}`);
      }
    });
}

//TODO - fetch and validate balances after wrap
//TODO - delete flow before tests
