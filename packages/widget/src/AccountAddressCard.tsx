import CheckCircleIcon_ from "@mui/icons-material/CheckCircle";
import ContentCopyIcon_ from "@mui/icons-material/ContentCopy";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import { create } from "blockies-ts";
import { useState } from "react";
import { Address } from "viem";
import { AccountAddress } from "./AccountAddress";
import { normalizeIcon } from "./helpers/normalizeIcon";
import { copyToClipboard } from "./utils";

const ContentCopyIcon = normalizeIcon(ContentCopyIcon_);
const CheckIcon = normalizeIcon(CheckCircleIcon_);

export function AccountAddressCard({ address }: { address: Address }) {
  const blockiesSrc = create({ seed: address.toLowerCase() }).toDataURL();
  const [copied, setCopied] = useState(false);

  return (
    <Paper sx={{ px: 2.25, py: 1.75 }}>
      <AccountAddress address={address}>
        {({
          ensAvatarResult,
          ensNameResult,
          checksumAddress,
          shortenedAddress,
        }) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            {ensAvatarResult.data ? (
              <Avatar
                alt="ENS avatar"
                variant="rounded"
                src={ensAvatarResult.data}
              />
            ) : (
              <Avatar
                alt="generated blockie avatar"
                variant="rounded"
                src={blockiesSrc}
              />
            )}
            <Typography title={checksumAddress}>
              {ensNameResult.data ?? shortenedAddress}
            </Typography>

            <IconButton
              size="small"
              title="Copy address to clipboard"
              onClick={() =>
                void copyToClipboard(checksumAddress).then((x) => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                })
              }
            >
              {copied ? (
                <CheckIcon fontSize="small" color="success" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </Stack>
        )}
      </AccountAddress>
    </Paper>
  );
}
