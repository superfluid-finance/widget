export function calculateDepositAmount({
  liquidationPeriod,
  flowRate,
  minimumDeposit,
}: {
  liquidationPeriod: bigint;
  flowRate: bigint;
  minimumDeposit: bigint;
}): bigint {
  const calculatedDeposit = flowRate * liquidationPeriod;

  return calculatedDeposit > minimumDeposit
    ? calculatedDeposit
    : minimumDeposit;
}
