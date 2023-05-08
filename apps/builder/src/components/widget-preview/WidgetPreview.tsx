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

export type WidgetData = {
  productName: string;
  labels: {
    from: string;
    to: string;
    network: string;
    token: string;
    amount: string;
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

const WidgetPreview: FC<WidgetProps> = ({ data }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof selectedNetwork>) => {
    const {
      target: { value },
    } = event;

    setSelectedNetwork(value);
  };

  const autoCompleteTokenOptions = useMemo(() => {
    const network = data.networks.find(({ name }) => name === selectedNetwork);
    return data.tokens.filter((token) => {
      return token.chainId === network?.chainId;
    });
  }, [selectedNetwork, data.networks]);

  return (
    <Card sx={{ width: 500, p: 4 }}>
      <Stack direction="column">
        <Typography variant="h6" pb={2}>
          {data.productName}
        </Typography>
        <Stack direction="column" gap={2}>
          <Stack>
            <Typography>{data.labels.from}</Typography>
            <TextField></TextField>
          </Stack>

          <Stack>
            <Typography>{data.labels.to}</Typography>
            <TextField></TextField>
          </Stack>

          <Stack>
            <Typography>{data.labels.network}</Typography>
            <Select value={selectedNetwork} onChange={handleChange}>
              {data.networks.map((network) => (
                <MenuItem value={network.name} key={network.chainId}>
                  {network.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack>
            <Typography>{data.labels.token}</Typography>
            <Autocomplete
              disablePortal
              id="network-select"
              options={autoCompleteTokenOptions}
              getOptionLabel={(option) => `${option.name} (${option.symbol})`}
              renderOption={(props, option) => (
                <Typography
                  {...props}
                  key={`${option.symbol}-${option.chainId}`}
                >
                  {option.symbol}
                </Typography>
              )}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>

          <Stack>
            <Typography>{data.labels.amount}</Typography>
            <TextField></TextField>
          </Stack>

          <Button variant="contained">{data.labels.send}</Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default WidgetPreview;
