import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import { useMapCommandsToContractWrites } from "./commandMappers";
import CircleIcon from "@mui/icons-material/Circle";

export function Transactions() {
  const { commands } = useCommandHandler(); // Cleaner to pass with props.

  const {} = useMapCommandsToContractWrites(commands);

  return (
    <Stack direction="column" spacing={3}>
      <List sx={{ ml: 3 }}>
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
  );
}
