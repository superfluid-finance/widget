import { Card } from "@mui/material";
import {
  Button,
  Select,
  MenuItem,
  Stack,
  Theme,
  Typography,
  TextField,
} from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { Network, networks } from "../../networkDefinitions";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { TokenInfo } from "@uniswap/token-lists";
import { BigNumber } from "ethers";
import { PaymentOption } from "./SelectPaymentOption";

export type PaymentInterval =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export type WidgetData = {
  productName: string;
  productDesc: string;
  paymentOptions: PaymentOption[];
  labels: {
    paymentOption: string;
    send: string;
  };
  networks: Network[];
  tokens: TokenInfo[];
};

export type WidgetStyle = {
  width: number;
  px: number;
  py: number;
};

export type WidgetProps = {
  data: WidgetData;
  // customStyle: WidgetStyle;
};

const renderPaymentOption = (paymentOption: PaymentOption) =>
  `${paymentOption.superToken.name} (${paymentOption.superToken.symbol}) on ${paymentOption.network.name}`;

const WidgetPreview: FC<WidgetProps> = ({ data }) => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>("");

  const handleChange = (
    event: SelectChangeEvent<typeof selectedPaymentOption>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedPaymentOption(value);
  };

  return (
    <Card sx={{ width: 500, p: 4 }}>
      <Stack direction="column" gap={2}>
        <Stack>
          <Typography variant="h6">{data.productName}</Typography>
          <Typography variant="caption">{data.productDesc}</Typography>
        </Stack>

        <Stack direction="column" gap={2}>
          <Stack>
            <Typography>{data.labels.paymentOption}</Typography>
            <Select value={selectedPaymentOption} onChange={handleChange}>
              {data.paymentOptions.map((option, i) => (
                <MenuItem
                  key={`${option.superToken.address}-${option.network.chainId}-${i}`}
                  value={`${option.superToken.address}-${option.network.chainId}`}
                >
                  {renderPaymentOption(option)}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Button variant="contained">{data.labels.send}</Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default WidgetPreview;
