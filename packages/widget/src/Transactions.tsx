import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import CircleIcon from "@mui/icons-material/Circle";
import { CommandMapper } from "./CommandMapper";

export function Transactions() {
  const { commands } = useCommandHandler(); // Cleaner to pass with props.

  return (
    <Stack direction="column" spacing={3}>
      <List sx={{ ml: 3 }}>
        {commands.map((cmd, index) => (
          <ListItem key={index}>
            <Stack direction="row" alignItems="center">
              <ListItemIcon>
                <CircleIcon />
              </ListItemIcon>
              <ListItemText primary={cmd.title} />
            </Stack>
          </ListItem>
        ))}
      </List>
      {commands.map((cmd, index) => (
        <CommandMapper key={index} {...cmd} />
      ))}
      <Button>Transact</Button>
    </Stack>
  );
}
