import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  StepContent,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useCommandHandler } from "./CommandHandlerContext";
import { useChainId, useSwitchNetwork } from "wagmi";

export default function StepContentReview() {
  const {
    formState: { isValid, isValidating },
    watch,
  } = useFormContext<ValidFormValues>();
  const { commands, handle } = useCommandHandler();

  const expectedChainId = watch("network.id");
  const chainId = useChainId();

  const { switchNetwork } = useSwitchNetwork();
  const needsToSwitchNetwork = expectedChainId !== chainId;

  return (
    <StepContent TransitionProps={{ unmountOnExit: false }}>
      <Stack>
        <Stack direction="column" spacing={3}>
          <List sx={{ ml: 1.5 }}>
            {commands.map((cmd) => {
              const { title, ...rest } = cmd;

              return (
                <ListItem key={title}>
                  <ListItemText
                    primary={title}
                    secondary={
                      <Typography component="pre" variant="body2">
                        {JSON.stringify(rest, null, 2)}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Stack>
        {needsToSwitchNetwork ? (
          <Button
            variant="contained"
            fullWidth
            onClick={() => switchNetwork?.(expectedChainId)}
          >
            Switch Network
          </Button>
        ) : (
          <Button
            disabled={!isValid || isValidating}
            variant="contained"
            fullWidth
            onClick={() => void handle()}
          >
            Subscribe
          </Button>
        )}
      </Stack>
    </StepContent>
  );
}
