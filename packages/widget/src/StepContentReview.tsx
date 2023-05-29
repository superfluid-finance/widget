import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  StepContent
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useCommandHandler } from "./CommandHandlerContext";
import { useChainId, useSwitchNetwork } from "wagmi";
import { useMemo } from "react";
import { StepperContinueButton } from "./StepperContinueButton";
import { CommandPreview } from "./previews/previews";

export default function StepContentReview() {
  const {
    formState: { isValid, isValidating },
    watch,
  } = useFormContext<ValidFormValues>();
  const { commands: commandAggregates } = useCommandHandler();

  const commands = useMemo(
    () =>
      commandAggregates.map((x) => {
        const { contractWrites, ...command } = x;
        return command;
      }),
    [commandAggregates]
  );

  const expectedChainId = watch("network.id");
  const chainId = useChainId();

  const { switchNetwork } = useSwitchNetwork();
  const needsToSwitchNetwork = expectedChainId !== chainId;

  return (
      <Stack>
        <Stack direction="column" spacing={3}>
          <List sx={{ ml: 1.5 }}>
            {commands.map((cmd) => (
              <ListItem key={cmd.id}>
                <ListItemText
                  primary={<CommandPreview command={cmd} />} />
              </ListItem>
            ))}
          </List>
        </Stack>
        {needsToSwitchNetwork ? (
          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={() => switchNetwork?.(expectedChainId)}
          >
            Switch Network
          </Button>
        ) : (
          <StepperContinueButton disabled={!isValid || isValidating}>Continue</StepperContinueButton>
          // <Button
          //   disabled={!isValid || isValidating}
          //   variant="contained"
          //   fullWidth
          //   onClick={() => {
          //     handle();
          //   }}
          // >
          //   Subscribe
          // </Button>
        )}
      </Stack>
  );
}
