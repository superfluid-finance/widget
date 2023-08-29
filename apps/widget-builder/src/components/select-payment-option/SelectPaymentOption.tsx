import {
  Autocomplete,
  Avatar,
  Button,
  Collapse,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  ChainId,
  NetworkAssetInfo,
  supportedNetworks,
  TimePeriod,
  timePeriods,
} from "@superfluid-finance/widget";
import tokenList, {
  SuperTokenInfo,
} from "@superfluid-finance/widget/tokenlist";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { Chain } from "wagmi";

import InputWrapper, { InputInfo } from "../form/InputWrapper";
import NetworkAvatar from "../NetworkAvatar";
import { WidgetProps } from "../widget-preview/WidgetPreview";

export type PaymentOption = {
  network: NetworkAssetInfo;
  superToken: SuperTokenInfo;
};

type PaymentOptionSelectorProps = {
  onAdd: UseFieldArrayAppend<WidgetProps, "paymentDetails.paymentOptions">;
};

const SelectPaymentOption: FC<PaymentOptionSelectorProps> = ({ onAdd }) => {
  const [receiver, setReceiver] = useState<`0x${string}` | "">("");
  const [selectedNetwork, setSelectedNetwork] = useState<Chain | null>(null);
  const [selectedToken, setSelectedToken] = useState<SuperTokenInfo | null>(
    null,
  );

  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [flowRateAmount, setFlowRateAmount] = useState<`${number}` | "">("");
  const [flowRateInterval, setFlowRateInterval] = useState<TimePeriod>("month");

  const filteredNetworks = useMemo(
    () =>
      supportedNetworks.filter((network) =>
        tokenList.tokens.find(
          ({ chainId, tags }) =>
            /* #35 [SUBS] - Hide Ethereum Mainnet payment option in Widget.
             * As the UX is bad for streams on mainnet we don't want to encourage subscriptions there.
             */
            network.id !== 1 &&
            network.id === chainId &&
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

    const network = supportedNetworks.find(
      (n) => n.id === selectedToken.chainId,
    );

    if (network && receiver) {
      onAdd({
        receiverAddress: receiver,
        superToken: {
          address: selectedToken.address as `0x${string}`,
        },
        chainId: selectedToken.chainId as ChainId,
        ...(!isCustomAmount
          ? {
              ...(showUpfrontPayment
                ? {
                    transferAmountEther: upfrontPaymentAmount
                      ? upfrontPaymentAmount
                      : "0",
                  }
                : {}),
              flowRate: {
                amountEther: flowRateAmount ? flowRateAmount : "0",
                period: flowRateInterval,
              },
            }
          : {}),
      });
    }
  };

  const autoCompleteTokenOptions = useMemo(() => {
    const network = supportedNetworks.find(
      ({ name }) => name === selectedNetwork?.name,
    );
    return tokenList.tokens.filter(
      (token) =>
        token.chainId === network?.id && token.tags?.includes("supertoken"),
    );
  }, [selectedNetwork]);

  const onCustomAmountChanged = (_e: any, checked: boolean) => {
    if (checked !== null) {
      if (checked !== isCustomAmount) {
        setIsCustomAmount(checked);
        setShowUpfrontPayment(false);
        setUpfrontPaymentAmount("");
        setFlowRateAmount("");
      }
    }
  };

  useEffect(() => {
    setSelectedToken(null);
  }, [selectedNetwork]);

  const [showUpfrontPayment, setShowUpfrontPayment] = useState(false);
  const [upfrontPaymentAmount, setUpfrontPaymentAmount] = useState<
    `${number}` | ""
  >("");
  const onShowUpfrontPaymentChanged = (_e: ChangeEvent, checked: boolean) => {
    if (checked) {
      setShowUpfrontPayment(true);
      setUpfrontPaymentAmount(flowRateAmount);
    } else {
      setShowUpfrontPayment(false);
      setUpfrontPaymentAmount("");
    }
  };

  return (
    <Stack direction="column" gap={1.5}>
      <InputWrapper
        title=""
        sx={{ width: "100%" }}
        helperText={
          isCustomAmount
            ? "User-defined rate is a payment type suited for donations where users determine the amount they want to pay over a given period of time."
            : "Fixed rate is a payment type suited for regular subscriptions where users pay a predetermined amount over a given period of time."
        }
      >
        {(id) => (
          <ToggleButtonGroup
            id={id}
            value={isCustomAmount}
            exclusive
            onChange={onCustomAmountChanged}
            fullWidth
            color="primary"
          >
            <ToggleButton value={false}>Fixed rate</ToggleButton>
            <ToggleButton value={true}>User-defined rate</ToggleButton>
          </ToggleButtonGroup>
        )}
      </InputWrapper>

      <InputWrapper
        title="Network"
        tooltip="Select the network you'd like to request payment on."
        helperText={
          selectedNetwork ? `Chain ID: ${selectedNetwork.id}` : undefined
        }
      >
        {(id) => (
          <Select
            labelId={`label-${id}`}
            id={id}
            data-testid="network-selection"
            value={selectedNetwork?.name}
            onChange={handleNetworkSelect}
            fullWidth
          >
            <ListSubheader>Mainnets</ListSubheader>
            {filteredNetworks
              .filter((x) => !x.testnet)
              .map((network) => (
                <MenuItem
                  data-testid={network.id}
                  value={network.name}
                  key={`${network.id}`}
                >
                  <Stack
                    direction="row"
                    gap={1}
                    sx={{ alignItems: "center", width: "100%" }}
                  >
                    <NetworkAvatar network={network} />
                    {network.name}
                  </Stack>
                </MenuItem>
              ))}
            <ListSubheader>Testnets</ListSubheader>
            {filteredNetworks
              .filter((x) => x.testnet)
              .map((network) => (
                <MenuItem
                  data-testid={network.id}
                  value={network.name}
                  key={`${network.id}`}
                >
                  <Stack
                    direction="row"
                    gap={1}
                    sx={{ alignItems: "center", width: "100%" }}
                  >
                    <NetworkAvatar network={network} />
                    {network.name}
                  </Stack>
                </MenuItem>
              ))}
          </Select>
        )}
      </InputWrapper>

      <InputWrapper
        id="token-select"
        title="Super Token"
        tooltip="Select the SuperToken you'd like to request payment in."
        helperText={
          selectedToken ? `Address: ${selectedToken.address}` : undefined
        }
      >
        {(id) => (
          <Autocomplete
            fullWidth
            disabled={!selectedNetwork}
            value={selectedToken}
            onChange={(_, value) => setSelectedToken(value!)}
            id={id}
            options={autoCompleteTokenOptions}
            getOptionLabel={(token) => token.symbol}
            componentsProps={{
              popper: {
                placement: "bottom-end",
              },
            }}
            renderOption={(props, option) => (
              <ListItem {...props}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  {option.logoURI && (
                    <Avatar
                      sx={{ width: 24, height: 24, objectFit: "contain" }}
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
                      sx={{ width: 24, height: 24, objectFit: "contain" }}
                      src={selectedToken.logoURI}
                    />
                  ),
                }}
              />
            )}
          />
        )}
      </InputWrapper>

      <Collapse in={!isCustomAmount}>
        <Stack spacing={1}>
          <InputWrapper
            title="Stream Rate"
            tooltip="Set the amount of tokens per month for the payment."
            sx={{ pt: 1.5 }}
          >
            {(id) => (
              <Stack
                gap="-1px"
                sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}
              >
                <TextField
                  id={id}
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
                    endAdornment: (
                      <InputAdornment position="end">
                        {selectedToken?.symbol}
                      </InputAdornment>
                    ),
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
            )}
          </InputWrapper>
          <FormGroup>
            <Stack direction="row" alignItems="center" gap={1}>
              <FormControlLabel
                sx={{
                  mr: 0,
                }}
                control={
                  <Switch
                    color="primary"
                    checked={showUpfrontPayment}
                    value={showUpfrontPayment}
                    onChange={onShowUpfrontPaymentChanged}
                  />
                }
                label="Charge upfront payment amount"
              />
              <InputInfo tooltip="A one-time payment amount to be paid before the stream starts." />
            </Stack>
          </FormGroup>

          <Collapse in={showUpfrontPayment}>
            <FormGroup>
              <InputWrapper
                title="Upfront Payment Amount"
                tooltip="The ERC-20 transfer amount the user should send as an upfront payment."
                sx={{ pt: 1.5 }}
              >
                {(id) => (
                  <TextField
                    id={id}
                    data-testid="upfront-payment-amount-input"
                    fullWidth
                    value={upfrontPaymentAmount}
                    onChange={({ target }) =>
                      setUpfrontPaymentAmount(target.value as `${number}`)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {selectedToken?.symbol}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </InputWrapper>
            </FormGroup>
          </Collapse>
        </Stack>
      </Collapse>

      <InputWrapper
        title="Receiver Address"
        tooltip="Set your wallet or multisig address on the relevant network."
      >
        {(id) => (
          <TextField
            id={id}
            data-testid="receiver-input-field"
            value={receiver}
            onChange={({ target }) =>
              setReceiver(target.value as `0x${string}`)
            }
          />
        )}
      </InputWrapper>

      <Button
        data-testid="add-option-button"
        color="primary"
        size="large"
        variant="contained"
        disabled={!(selectedNetwork && selectedToken)}
        onClick={handleAdd}
        sx={{ mt: 1.5 }}
      >
        Add +
      </Button>
    </Stack>
  );
};

export default SelectPaymentOption;
