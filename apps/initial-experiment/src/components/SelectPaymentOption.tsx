import { Chip, Stack } from "@mui/material";
import { PaymentOption } from "./productTypes";
import { Address } from "abitype";
import { TokenInfo } from "@uniswap/token-lists"
import getOrThrow from "../getOrThrow";

type SelectPaymentOptionProps = {
  options: PaymentOption[];
  onSelect: (value: PaymentOption) => void;
  selectedOption: PaymentOption | null;
  tokenMap: Map<Address, TokenInfo>;
};

export default function SelectPaymentOption({
  options,
  onSelect,
  selectedOption,
  tokenMap,
}: SelectPaymentOptionProps) {
  return (
    <Stack direction="row" flexWrap="wrap">
      {options.map((option) => {
        const { superToken: superToken, flowRate } = option;
        const isSelected = option === selectedOption;
        const token = getOrThrow(tokenMap, option.superToken.address);
        return (
          <Chip
            key={superToken.address}
            variant={isSelected ? "filled" : "outlined"}
            label={`${flowRate.amountEther} ${token.symbol}/${flowRate.period}`}
            onClick={() => onSelect(option)}
            color={isSelected ? "primary" : "default"}
            sx={{ m: 0.5 }}
          />
        );
      })}
    </Stack>
  );
}