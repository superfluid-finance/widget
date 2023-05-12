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
import { useAccount } from "wagmi";

export default function StepContentReview() {
  const { isConnected } = useAccount();
  const {
    formState: { isValid, isValidating },
  } = useFormContext<ValidFormValues>();
  const { commands, handle } = useCommandHandler();

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
        <Button
          disabled={!isValid || isValidating || !isConnected}
          variant="contained"
          fullWidth
          onClick={() => void handle()}
        >
          Subscribe
        </Button>
      </Stack>
    </StepContent>
  );
}
