import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import { useMapCommandsToContractWrites } from "./commandMappers";
import { Command } from "./commands";
import CircleIcon from "@mui/icons-material/Circle";

type Props = Readonly<{
  commands: Command[];
}>;

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
