import { List, ListItem, ListItemText, Stack } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import { CommandMapper } from "./CommandMapper";
import { ContractWriteHandler } from "./ContractWriteHandler";
import ContractWriteButton from "./ContractWriteButton";

// type TransactionState = {
//   total: number
//   active: number
// }

export function Transactions() {
  const { commands } = useCommandHandler(); // Cleaner to pass with props.

  return (
    <Stack direction="column" spacing={3}>
      <List sx={{ ml: 3 }} disablePadding>
        {commands.map((cmd, cmdIndex) => {
          return (
            <ListItem key={`${cmd.title}.${cmdIndex}`}>
              <ListItemText
                primary={cmd.title}
                secondaryTypographyProps={{ component: "div" }}
                secondary={
                  <List disablePadding>
                    <CommandMapper command={cmd}>
                      {(contractWrites) =>
                        contractWrites.map((contractWrite, writeIndex) => (
                          <ListItem
                            key={`${cmd.title}.${cmdIndex}.${writeIndex}`}
                          >
                            <ContractWriteHandler contractWrite={contractWrite}>
                              {(result) => (
                                <ContractWriteButton
                                  data={contractWrite}
                                  result={result}
                                />
                              )}
                            </ContractWriteHandler>
                          </ListItem>
                        ))
                      }
                    </CommandMapper>
                  </List>
                }
              />
            </ListItem>
          );
        })}
      </List>
      {/* <ContractWriteButton /> */}
    </Stack>
  );
}
