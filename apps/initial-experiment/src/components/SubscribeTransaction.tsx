import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useSigner } from "wagmi";
import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import { Command } from "./commands";
import { useMapCommandsToContractWrites } from "./commandMappers";
import ContractWriteHandler, {
  ContractWriteResult,
  WagmiOverrides,
} from "./ContractWriteHandler";
import ContractWriteButton from "./ContractWriteButton";

export default function SubscribeTransaction({
  commands,
  onBack
}: {
  commands: Command[];
  onBack: () => void;
}) {
  const { data: signer } = useSigner();

  const contractWrites = useMapCommandsToContractWrites(commands);

  const [writeResults, setWriteResults] = useState<ContractWriteResult[]>(
    contractWrites.map((x) => ({
      prepareStatus: "idle",
      writeStatus: "idle",
      transactionStatus: "idle",
      isLoading: true,
      isFinished: false,
    }))
  );

  const [writeIndex, setWriteIndex] = useState(0);

  const nextWriteComposite =
    writeIndex < contractWrites.length
      ? { result: writeResults[writeIndex], data: contractWrites[writeIndex] }
      : null;

  const [disableGasEstimation, setDisableGasEstimation] = useState(false);
  const [disableWaitForSuccess, setDisableWaitForSuccess] = useState(false);

  const overrides = useMemo<WagmiOverrides>(
    () =>
      disableGasEstimation
        ? {
            gasLimit: BigNumber.from(1_000_000),
          }
        : undefined,
    [disableGasEstimation]
  );

  return (
    <Box p={3} width="640px">

      <Button onClick={onBack}>Back</Button>

      <Typography variant="h6" gutterBottom>
        Transacting...
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={disableGasEstimation}
              onChange={(_event, checked) => setDisableGasEstimation(checked)}
            />
          }
          label="Disable gas estimation"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={disableWaitForSuccess}
              onChange={(_event, checked) => setDisableWaitForSuccess(checked)}
            />
          }
          label="Disable wait for success"
        />
      </FormGroup>

      <Stack alignItems="center" spacing={3}>
        {signer &&
          contractWrites.map((x, index) => (
            <ContractWriteHandler
              key={index}
              enabled={index === writeIndex}
              contractWrite={x}
              signer={signer}
              onChange={(newResult) => {
                setWriteResults([
                  ...writeResults.slice(0, index),
                  newResult,
                  ...writeResults.slice(index + 1),
                ]);

                if (index === writeIndex) {
                  if (
                    disableWaitForSuccess &&
                    newResult.writeStatus === "success"
                  ) {
                    setWriteIndex((prev) => prev + 1);
                  } else if (newResult.isFinished) {
                    setWriteIndex((prev) => prev + 1);
                  }
                }
              }}
              overrides={overrides}
            />
          ))}

        <Stepper orientation="vertical" activeStep={writeIndex}>
          {contractWrites.map(({ functionName }, index) => (
            <Step key={index}>
              <StepLabel>{functionName}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {nextWriteComposite && <ContractWriteButton {...nextWriteComposite} />}
      </Stack>
    </Box>
  );
}
