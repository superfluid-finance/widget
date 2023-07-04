import { FlowRate } from "../core";

export function flowRatesEqual(flowRate1?: FlowRate, flowRate2?: FlowRate) {
  if (
    flowRate1?.amountEther === flowRate2?.amountEther &&
    flowRate1?.period === flowRate2?.period
  ) {
    return true;
  }

  return false;
}
