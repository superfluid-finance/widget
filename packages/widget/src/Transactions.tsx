import { List, ListItem, ListItemText, Stack } from "@mui/material";
import { useCommandHandler } from "./CommandHandlerContext";
import { CommandMapper } from "./CommandMapper";
import { ContractWriteHandler } from "./ContractWriteHandler";
import ContractWriteButton from "./ContractWriteButton";
import { useState } from "react";

export function Transactions() {
  const { commands, success } = useCommandHandler(); // Cleaner to pass with props.

  const [commandIndex, setCommandIndex] = useState(0);
  const [writeIndex, setWriteIndex] = useState(0);

  return (
    <Stack direction="column" spacing={3}>
      <List sx={{ ml: 3 }} disablePadding>
        {commands.map((cmd, commandIndex_) => {
          return (
            <ListItem key={`${cmd.title}.${commandIndex_}`}>
              <ListItemText
                primary={cmd.title}
                secondaryTypographyProps={{ component: "div" }}
                secondary={
                  <List disablePadding>
                    <CommandMapper command={cmd}>
                      {(contractWrites) => {
                        const isCommandActive = commandIndex_ === commandIndex;
                        if (isCommandActive && contractWrites.length === 0) {
                          if (commandIndex_ === commands.length - 1) {
                            success();
                          } else {
                            setCommandIndex(commandIndex + 1);
                          }
                        }
                        return contractWrites.map(
                          (contractWrite, writeIndex_) => {
                            const isWriteActive =
                              isCommandActive && writeIndex_ === writeIndex;
                            return (
                              <ListItem
                                key={`${cmd.title}.${commandIndex_}.${writeIndex_}`}
                              >
                                <ContractWriteHandler
                                  prepare={isWriteActive}
                                  contractWrite={contractWrite}
                                >
                                  {(result) => {
                                    const isSuccess =
                                      !!result.transactionResult.isSuccess;
                                    if (isWriteActive && isSuccess) {
                                      setWriteIndex(writeIndex + 1);

                                      if (
                                        writeIndex_ ===
                                        contractWrites.length - 1
                                      ) {
                                        setCommandIndex(commandIndex + 1);
                                        setWriteIndex(0);

                                        if (
                                          commandIndex_ ===
                                          commands.length - 1
                                        ) {
                                          success();
                                        }
                                      }
                                    }

                                    return <ContractWriteButton {...result} />;
                                  }}
                                </ContractWriteHandler>
                              </ListItem>
                            );
                          }
                        );
                      }}
                    </CommandMapper>
                  </List>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
