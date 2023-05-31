import { Button, List, ListItem, ListItemText, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useCommandHandler } from "./CommandHandlerContext";
import { useChainId, useSwitchNetwork } from "wagmi";
import { useMemo } from "react";
import { StepperContinueButton } from "./StepperContinueButton";
import { CommandPreview } from "./previews/CommandPreview";

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
        {commands.map((cmd) => (
          <CommandPreview key={cmd.id} command={cmd} />
        ))}
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
        <StepperContinueButton disabled={!isValid || isValidating}>
          Continue
        </StepperContinueButton>
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
