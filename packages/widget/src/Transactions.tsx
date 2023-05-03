import { Box, List, ListItem } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import { useMapCommandsToContractWrites } from "./commandMappers";
import { Command } from "./commands";

type Props = Readonly<{
  commands: Command[];
}>;

export function Transactions() {
  const { commands } = useCommandHandler(); // Cleaner to pass with props.

  const {} = useMapCommandsToContractWrites(commands);

  return (
    <Box>
      <List>
        {commands.map((command) => (
          <ListItem key={command.title}>{command.title}</ListItem>
        ))}
      </List>
    </Box>
  );
}
