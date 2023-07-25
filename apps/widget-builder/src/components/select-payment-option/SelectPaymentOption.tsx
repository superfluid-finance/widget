import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  FormGroup,
  FormLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import tokenList, { SuperTokenInfo } from "@superfluid-finance/tokenlist";
import { ChainId, TimePeriod, timePeriods } from "@superfluid-finance/widget";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";

import { Network, networks } from "../../networkDefinitions";
import InputWrapper from "../form/InputWrapper";
import { WidgetProps } from "../widget-preview/WidgetPreview";

export type PaymentOption = {
  network: Network;
  superToken: SuperTokenInfo;
};

type PaymentOptionSelectorProps = {
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

type InputInfoProps = {
  tooltip: string;
};

const SelectPaymentOption: FC<PaymentOptionSelectorProps> = ({ onAdd }) => {
  const [receiver, setReceiver] = useState<`0x${string}` | "">("");
  const [selectedNetwork, setSelectedNetwork] =
    useState<Network>(defaultNetwork);
  const [selectedToken, setSelectedToken] =
    useState<SuperTokenInfo>(defaultToken);

  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [flowRateAmount, setFlowRateAmount] = useState<`${number}`>("0");
  const [flowRateInterval, setFlowRateInterval] = useState<TimePeriod>("month");
  const [isReceiverDefault, setReceiverAsDefault] = useState(false);
  const [userDataText, setUserDataText] = useState("");

  const filteredNetworks = useMemo(
    () =>
      networks.filter((network) =>
        tokenList.tokens.find(
          ({ chainId, tags }) =>
            /* #35 [SUBS] - Hide Ethereum Mainnet payment option in Widget.
             * As the UX is bad for streams on mainnet we don't want to encourage subscriptions there.
             */
            network.chainId !== 1 &&
            network.chainId === chainId &&
            tags &&
            tags.includes("supertoken"),
        ),
      ),
    [],
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

    if (network && receiver) {
      onAdd({
        receiverAddress: receiver,
        superToken: {
          address: selectedToken.address as `0x${string}`,
        },
        chainId: selectedToken.chainId as ChainId,
        ...(!isCustomAmount
          ? {
              flowRate: {
                amountEther: flowRateAmount,
                period: flowRateInterval,
              },
            }
          : {}),
      });
    }
  };

  const autoCompleteTokenOptions = useMemo(() => {
    const network = networks.find(({ name }) => name === selectedNetwork?.name);
    return tokenList.tokens.filter(
      (token) =>
        token.chainId === network?.chainId &&
        token.tags?.includes("supertoken"),
    );
  }, [selectedNetwork]);

  const onCustomAmountChanged = (_e: ChangeEvent, checked: boolean) =>
    setIsCustomAmount(checked);

  useEffect(() => {
    setSelectedToken(defaultToken);
  }, [selectedNetwork]);

  return (
    <Stack direction="column" gap={1.5}>
      <Stack sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} gap={1.5}>
        <InputWrapper
          title="Network"
          tooltip="Select the network you'd like to request payment on"
        >
          <Select
            data-testid="network-selection"
            value={selectedNetwork.name}
            onChange={handleNetworkSelect}
            fullWidth
          >
            {filteredNetworks.map((network) => (
              <MenuItem
                data-testid={network.chainId}
                value={network.name}
                key={`${network.chainId}`}
              >
                <Stack
                  direction="row"
                  gap={1}
                  sx={{ alignItems: "center", width: "100%" }}
                >
                  {network.logoUrl && (
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      src={network.logoUrl}
                      alt={network.name}
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
                        data-testid="testnet-chip"
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
        </InputWrapper>
        <InputWrapper
          title="Super Token"
          tooltip="Select the SuperToken you'd like to request payment in"
        >
          <Autocomplete
            fullWidth
            value={selectedToken}
            onChange={(_, value) => setSelectedToken(value!)}
            id="token-select"
            options={autoCompleteTokenOptions}
            getOptionLabel={(token) => token.symbol}
            componentsProps={{
              popper: {
                placement: "bottom-end",
                sx: {
                  width: "calc(80% - 48px) !important",
                  mt: "2px !important",
                },
                disablePortal: true,
              },
            }}
            renderOption={(props, option) => (
              <ListItem {...props}>
                <ListItemAvatar sx={{ width: 24, height: 24, minWidth: 40 }}>
                  {option.logoURI && (
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      src={option.logoURI}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={option.symbol}
                  secondary={option.name}
                  secondaryTypographyProps={{ variant: "caption" }}
                  sx={{ m: 0 }}
                />
              </ListItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: selectedToken?.logoURI && (
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      src={selectedToken.logoURI}
                    />
                  ),
                }}
              />
            )}
          />
        </InputWrapper>
      </Stack>

      <Box>
        <FormGroup>
          <Stack direction="row" alignItems="center">
            <FormLabel>Fixed amount</FormLabel>
            <Switch
              color="primary"
              value={isCustomAmount}
              onChange={onCustomAmountChanged}
            />
            <FormLabel>Custom amount</FormLabel>
          </Stack>
        </FormGroup>

        <Collapse in={!isCustomAmount}>
          <InputWrapper
            title="Stream Rate"
            tooltip="Set the amount of tokens per month for the payment"
            sx={{ pt: 1.5 }}
          >
            <Stack
              gap="-1px"
              sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}
            >
              <TextField
                data-testid="flow-rate-input"
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
                data-testid="time-unit-selection"
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
          </InputWrapper>
        </Collapse>
      </Box>

      <InputWrapper
        title="Receiver Wallet Address"
        tooltip="Set your wallet or multisig address on the relevant network"
      >
        <TextField
          data-testid="receiver-input-field"
          value={receiver}
          onChange={({ target }) => setReceiver(target.value as `0x${string}`)}
        />
      </InputWrapper>

      {/* <FormControlLabel
        data-testid="default-option-switch"
        control={
          <Switch
            checked={isReceiverDefault}
            onChange={() => setReceiverAsDefault((val) => !val)}
          />
        }
        label={<Typography>Use as default payment option</Typography>}
      /> */}

      {/* <InputWrapper
        title="User Data"
        tooltip=""
      >
        <TextField
          value={userDataText}
          onChange={({ target }) => setUserDataText(target.value)}
          helperText={`On-chain hex: ${toHex(userDataText)}`}
        />
      </InputWrapper> */}

      <Button
        data-testid="add-option-button"
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
