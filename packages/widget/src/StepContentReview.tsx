import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  StepContent,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ValidFormValues } from "./formValues";
import { useCommandHandler } from "./CommandHandlerContext";
import CircleIcon from "@mui/icons-material/Circle";

export default function StepContentReview() {
  const {
    formState: { isValid },
  } = useFormContext<ValidFormValues>();
  const { commands, handle } = useCommandHandler();

  return (
    <StepContent TransitionProps={{ unmountOnExit: false }}>
      <Stack>
        <Stack direction="column" spacing={3}>
          <List sx={{ ml: 1.5 }}>
            {commands.map((command) => (
              <ListItem key={command.title}>
                <Stack direction="row" alignItems="center">
                  <ListItemIcon>
                    <CircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={command.title} />
                </Stack>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Button
          disabled={!isValid}
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
