import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { PaymentOption } from "./SelectPaymentOption";
import { useWidgetContext } from "./WidgetPreview";
import { FC } from "react";

export const renderPaymentOption = (paymentOption: PaymentOption) =>
  `${paymentOption.superToken.name} (${paymentOption.superToken.symbol}) on ${paymentOption.network.name}`;

export type WidgetContentProps = {
  selectedPaymentOption: string;
  onPaymentOptionSelect: (event: SelectChangeEvent<string>) => void;
};

export const WidgetContent: FC<WidgetContentProps> = ({
  selectedPaymentOption,
  onPaymentOptionSelect,
}) => {
  const { productName, productDesc, labels, paymentOptions } =
    useWidgetContext();

  return (
    <Stack direction="column" gap={2}>
      <Stack>
        <Typography variant="h6">{productName}</Typography>
        <Typography variant="caption">{productDesc}</Typography>
      </Stack>

      <Stack direction="column" gap={2}>
        <Stack>
          <Typography>{labels.paymentOption}</Typography>
          <Select
            value={selectedPaymentOption}
            onChange={onPaymentOptionSelect}
          >
            {paymentOptions.map((option, i) => (
              <MenuItem
                key={`${option.superToken.address}-${option.network.chainId}-${i}`}
                value={`${option.superToken.address}-${option.network.chainId}`}
              >
                {renderPaymentOption(option)}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Button variant="contained">{labels.send}</Button>
      </Stack>
    </Stack>
  );
};
