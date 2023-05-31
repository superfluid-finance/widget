import { FC, useEffect, useMemo, useState } from "react";
import { Network, networks } from "../../networkDefinitions";
import {
  Autocomplete,
  Button,
  Chip,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SvgIcon,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import tokenList, {
  SuperTokenInfo,
  TokenInfo,
} from "@superfluid-finance/tokenlist";
import { ChainId, TimePeriod, timePeriods } from "@superfluid-finance/widget";
import { UseFieldArrayAppend } from "react-hook-form";
import { WidgetProps } from "./WidgetPreview";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";

export type PaymentOption = {
  network: Network;
  superToken: SuperTokenInfo;
};

const renderToken = (token: TokenInfo) => {
  const raw =
    token.name && token.symbol ? `${token.name} (${token.symbol})` : "";

  return raw.replace(/[^a-zA-Z0-9\s]g/, "");
};

type PaymentOptionSelectorProps = {
  defaultReceiverAddress: `0x${string}`;
  onAdd: UseFieldArrayAppend<WidgetProps, "paymentDetails.paymentOptions">;
};

const defaultNetwork = {
  name: "",
  chainId: -1,
  subgraphUrl: "",
  logoUrl: "",
};

const defaultToken: SuperTokenInfo = {
  address: "",
  chainId: -1,
  decimals: 0,
  name: "",
  symbol: "",
  extensions: {
    superTokenInfo: {
      type: "Pure",
    },
  },
};

const SelectPaymentOption: FC<PaymentOptionSelectorProps> = ({
  onAdd,
  defaultReceiverAddress,
}) => {
  const theme = useTheme();
  const [receiver, setReceiver] = useState<`0x${string}` | "">("");
  const [selectedNetwork, setSelectedNetwork] =
    useState<Network>(defaultNetwork);
  const [selectedToken, setSelectedToken] =
    useState<SuperTokenInfo>(defaultToken);

  const [flowRateAmount, setFlowRateAmount] = useState<`${number}`>("0");
  const [flowRateInterval, setFlowRateInterval] = useState<TimePeriod>("day");
  const [isReceiverDefault, setReceiverAsDefault] = useState(false);

  const filteredNetworks = useMemo(
    () =>
      networks.filter((network) =>
        tokenList.tokens.find(
          ({ chainId, tags }) =>
            network.chainId === chainId && tags && tags.includes("supertoken")
        )
      ),
    []
  );

  const handleNetworkSelect = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    const network = filteredNetworks.find(({ name }) => name === value);

    if (network) {
      setSelectedNetwork(network);
    }
  };

  const handleAdd = () => {
    if (!selectedToken) {
      return;
    }

    const network = networks.find((n) => n.chainId === selectedToken.chainId);

    if (network) {
      onAdd({
        receiverAddress: receiver === "" ? defaultReceiverAddress : receiver,
        superToken: {
          address: selectedToken.address as `0x${string}`,
        },
        chainId: selectedToken.chainId as ChainId,
        flowRate: {
          amountEther: flowRateAmount,
          period: flowRateInterval,
        },
      });
    }
  };

  const autoCompleteTokenOptions = useMemo(() => {
    const network = networks.find(({ name }) => name === selectedNetwork?.name);
    return tokenList.tokens.filter((token) => {
      return (
        token.chainId === network?.chainId && token.tags?.includes("supertoken")
      );
    });
  }, [selectedNetwork]);

  useEffect(() => {
    setSelectedToken(defaultToken);
  }, [selectedNetwork]);

  return (
    <Stack direction="column" gap={1}>
      <Stack direction="row" gap={2}>
        <Stack direction="column" flex={1}>
          <Stack
            direction="row"
            sx={{ pl: 1, justifyContent: "space-between" }}
          >
            <Typography variant="subtitle2">Network</Typography>
            <InfoIcon
              fontSize="small"
              sx={{ color: theme.palette.grey[600] }}
            />
          </Stack>
          <Select
            value={selectedNetwork.name}
            onChange={handleNetworkSelect}
            fullWidth
          >
            {filteredNetworks.map((network) => (
              <MenuItem value={network.name} key={`${network.chainId}`}>
                <Stack
                  direction="row"
                  gap={1}
                  sx={{ alignItems: "center", width: "100%" }}
                >
                  {network.logoUrl && (
                    <Image
                      src={network.logoUrl}
                      alt={network.name}
                      width={24}
                      height={24}
                    />
                  )}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    {network.name}
                    {network.isTestnet && (
                      <Chip
                        variant="filled"
                        color="primary"
                        label="test"
                        size="small"
                      />
                    )}
                  </Stack>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack direction="column" flex={1}>
          <Stack
            direction="row"
            sx={{ pl: 1, justifyContent: "space-between" }}
          >
            <Typography variant="subtitle2">SuperToken</Typography>
            <InfoIcon
              fontSize="small"
              sx={{ color: theme.palette.grey[600] }}
            />
          </Stack>
          <Autocomplete
            fullWidth
            value={selectedToken}
            onChange={(_, value) => setSelectedToken(value!)}
            id="token-select"
            options={autoCompleteTokenOptions}
            getOptionLabel={renderToken}
            renderOption={(props, option) => (
              <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                {option.logoURI && (
                  <Image src={option.logoURI} width={24} height={24} alt="" />
                )}
                <Typography
                  {...props}
                  key={`${option.symbol}-${option.chainId}`}
                >
                  {renderToken(option)}
                </Typography>
              </Stack>
            )}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </Stack>
      <Stack direction="column">
        <Stack direction="row" sx={{ pl: 1, justifyContent: "space-between" }}>
          <Typography variant="subtitle2">Flow Rate</Typography>
          <InfoIcon fontSize="small" sx={{ color: theme.palette.grey[600] }} />
        </Stack>

        <Stack direction="row" gap={"-1px"}>
          <TextField
            fullWidth
            value={flowRateAmount}
            onChange={({ target }) =>
              setFlowRateAmount(target.value as `${number}`)
            }
            InputProps={{
              sx: {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          <Select
            value={flowRateInterval}
            onChange={({ target }) =>
              setFlowRateInterval(target.value as TimePeriod)
            }
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              marginLeft: "-1px",
            }}
          >
            {timePeriods.map((interval) => (
              <MenuItem value={interval} key={interval}>
                /{interval}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <Stack>
        <Stack>
          <Stack
            direction="row"
            sx={{ pl: 1, justifyContent: "space-between" }}
          >
            <Typography variant="subtitle2">Receiver</Typography>
            <InfoIcon
              fontSize="small"
              sx={{ color: theme.palette.grey[600] }}
            />
          </Stack>
          <TextField
            value={receiver}
            onChange={({ target }) =>
              setReceiver(target.value as `0x${string}`)
            }
          />
        </Stack>
        <FormControlLabel
          sx={{ py: 1 }}
          control={
            <Switch
              checked={isReceiverDefault}
              onChange={() => setReceiverAsDefault((val) => !val)}
            />
          }
          label={
            <Typography variant="subtitle2">
              Use as default payment option
            </Typography>
          }
        />
      </Stack>
      <Button
        color="primary"
        variant="outlined"
        disabled={!(selectedNetwork && selectedToken)}
        onClick={handleAdd}
      >
        Add +
      </Button>
    </Stack>
  );
};

export default SelectPaymentOption;
