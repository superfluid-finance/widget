import { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import { Network, networks } from "../../networkDefinitions";
import { TokenInfo } from "@uniswap/token-lists";
import { BigNumber } from "ethers";
import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import tokenList from "../../tokenList";
import { NullableObject } from "../../types/general";

export const paymentIntervals = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "year",
] as const;

export type PaymentInterval = (typeof paymentIntervals)[number];

export type PaymentOption = {
  network: Network;
  superToken: TokenInfo;
};

const renderToken = (token: TokenInfo) => {
  const raw = `${token.name} (${token.symbol})`;

  return raw.replace(/[^a-zA-Z0-9\s]g/, "");
};

type PaymentOptionSelectorProps = {
  onAdd: (paymentOption: PaymentOption) => void;
};

const SelectPaymentOption: FC<PaymentOptionSelectorProps> = ({ onAdd }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>({
    name: "",
    chainId: -1,
    subgraphUrl: "",
  });
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);

  const handleNetworkSelect = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    const network = networks.find(({ name }) => name === value);

    if (network) {
      setSelectedNetwork(network);
    }
  };

  const handleAdd = ({
    network,
    superToken,
  }: NullableObject<PaymentOption>) => {
    if (!(network && superToken)) {
      return;
    }

    onAdd({ network, superToken });
  };

  const autoCompleteTokenOptions = useMemo(() => {
    const network = networks.find(({ name }) => name === selectedNetwork?.name);
    return tokenList.tokens.filter((token) => {
      return token.chainId === network?.chainId;
    });
  }, [selectedNetwork, networks]);

  useEffect(() => {
    setSelectedToken(null);
  }, [selectedNetwork]);

  return (
    <Stack direction="column" gap={1}>
      <Stack direction="row" gap={2}>
        <Stack direction="column" flex={1}>
          <Typography>Network</Typography>
          <Select
            value={selectedNetwork.name}
            onChange={handleNetworkSelect}
            fullWidth
          >
            {networks.map((network) => (
              <MenuItem value={network.name} key={`${network.chainId}`}>
                {network.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack direction="column" flex={1}>
          <Typography>SuperToken</Typography>
          <Autocomplete
            fullWidth
            value={selectedToken}
            onChange={(_, value) => setSelectedToken(value)}
            disablePortal
            id="network-select"
            options={autoCompleteTokenOptions}
            getOptionLabel={renderToken}
            renderOption={(props, option) => (
              <Typography {...props} key={`${option.symbol}-${option.chainId}`}>
                {renderToken(option)}
              </Typography>
            )}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </Stack>

      <Button
        disabled={!(selectedNetwork && selectedToken)}
        onClick={() =>
          handleAdd({ network: selectedNetwork, superToken: selectedToken })
        }
      >
        Add
      </Button>
    </Stack>
  );
};

export default SelectPaymentOption;
