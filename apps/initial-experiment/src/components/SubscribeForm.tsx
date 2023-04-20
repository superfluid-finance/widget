import {
  Button,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Stack,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { FormEventHandler, useMemo, useState } from "react";
import SelectPaymentOption from "./SelectPaymentOption";
import SelectNetwork from "./SelectNetwork";
import { Web3Button } from "@web3modal/react";
import { Address, useAccount } from "wagmi";
import { Controller, useFormContext } from "react-hook-form";
import { ProductInfo } from "./productTypes";
import { networks } from "../networkDefinitions";
import { DraftForm } from "./Subscribe";
import { TokenInfo } from "@uniswap/token-lists";

export default function SubscribeForm({
  onSubmit,
  productInfo,
  tokenMap,
}: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  productInfo: ProductInfo;
  tokenMap: Map<Address, TokenInfo>;
}) {
  const { watch, control: c, setValue, formState: { isValid } } = useFormContext<DraftForm>();

  const [chainId, tokenOption] = watch(["chainId", "tokenOption"]);
  const { address: accountAddress, isConnected } = useAccount();

  const networkOptions = Object.keys(productInfo.paymentOptions).map((key) => ({
    id: Number(key),
    name: networks.find((x) => x.chainId === Number(key))?.name ?? "Unknown",
  }));

  const paymentOptions = useMemo(
    () => (chainId ? productInfo.paymentOptions[chainId]! : []),
    [productInfo, chainId]
  );

  const underlyingToken = tokenOption?.superToken?.underlyingTokenAddress
    ? tokenMap.get(tokenOption.superToken.underlyingTokenAddress)
    : undefined;

  const [activeStep, setActiveStep] = useState(isValid ? 4 : 0);

  return (
    <form onSubmit={onSubmit}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepButton onClick={() => setActiveStep(0)}>
            Select Network
          </StepButton>
          <StepContent>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Controller
                control={c}
                name="chainId"
                render={({ field: { value, onChange, onBlur } }) => (
                  <SelectNetwork
                    options={networkOptions}
                    onSelect={(id) => {
                      onBlur();
                      onChange(id);
                      setActiveStep(activeStep + 1);
                    }}
                    selectedChainId={value}
                  />
                )}
              />
              <Stack direction="row">
                <Button
                  size="small"
                  disabled={!chainId}
                  variant="contained"
                  onClick={() => setActiveStep(activeStep + 1)}
                  sx={{ mt: 2 }}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(1)}>Select Token</StepButton>
          <StepContent>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Controller
                control={c}
                name="tokenOption"
                render={({ field: { value, onChange, onBlur } }) => (
                  <SelectPaymentOption
                    options={paymentOptions}
                    onSelect={(newOption) => {
                      onBlur();
                      onChange(newOption);
                      setActiveStep(activeStep + 1);
                    }}
                    selectedOption={value}
                    tokenMap={tokenMap}
                  />
                )}
              />
              <Stack direction="row">
                <Button
                  size="small"
                  disabled={!tokenOption}
                  variant="contained"
                  onClick={() => setActiveStep(activeStep + 1)}
                >
                  Next
                </Button>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Back
                </Button>
              </Stack>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepButton onClick={() => setActiveStep(2)}>
            Connect Wallet
          </StepButton> 
          <StepContent>
            <Web3Button />
            <Stack direction="row" sx={{ mt: 3 }}>
              <Button
                size="small"
                disabled={!isConnected}
                variant="contained"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
            </Stack>
          </StepContent>
        </Step>
        <Step disabled={!tokenOption?.superToken?.underlyingTokenAddress}>
          <StepButton onClick={() => setActiveStep(3)}>
            Wrap Tokens (optional)
          </StepButton>
          <StepContent>
            <Stack spacing={1.5}>
              <Controller
                control={c}
                name="wrapAmountEther"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label="Amount"
                    sx={{ bgcolor: "white" }}
                    onChange={onChange}
                    onBlur={onBlur}
                    InputProps={{
                      endAdornment: <span>{underlyingToken?.symbol}</span>,
                    }}
                  />
                )}
              />
              <Button
                variant="text"
                onClick={() => {
                  setValue(
                    "wrapAmountEther",
                    tokenOption!.flowRate.amountEther,
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    }
                  );
                }}
              >
                Set to one period worth of wrap
              </Button>
              <Controller
                control={c}
                name="autoWrap"
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    }
                    label="Auto Wrap"
                  />
                )}
              />
            </Stack>
            <Stack direction="row" sx={{ mt: 3 }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
            </Stack>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Review Transaction</StepLabel>
          <StepContent>
            <Stack spacing={1}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(watch(), null, 2)}</pre>
                {/* <Stack direction="row" justifyContent="space-between">
                  <Typography>Network:</Typography>
                  <Typography>{chainId}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Token:</Typography>
                  <Typography>{tokenOption?.superToken?.address}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Sender:</Typography>
                  <Typography>{accountAddress}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Receiver:</Typography>
                  <Typography>TODO</Typography>
                </Stack> */}
              </Card>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  borderRadius: 100,
                  bgcolor: "#1db227",
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </StepContent>
        </Step>

      </Stepper>
    </form>
  );
}
