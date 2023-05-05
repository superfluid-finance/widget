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
import { FC } from "react";
import { Network, networks } from "@/networkDefinitions";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { SxProps } from "@mui/material";
import { Autocomplete } from "@mui/material";
import tokenList from "@/tokenList";
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
  root: {
    width: number;
    px: number;
    py: number;
  };
  input: SxProps<Theme>;
};

export type WidgetProps = {
  data: WidgetData;
  customStyle: WidgetStyle;
};

const WidgetPreview: FC<WidgetProps> = ({ data, customStyle }) => {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedNetworks>) => {
    const {
      target: { value },
    } = event;
    setSelectedNetworks(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Card sx={{ ...customStyle.root }}>
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
            <Select multiple value={selectedNetworks} onChange={handleChange}>
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
              options={data.tokens.map((token) => token.symbol)}
              renderInput={(params) => (
                <TextField {...params} label="SuperToken" />
              )}
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
