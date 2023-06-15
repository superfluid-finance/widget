import CheckIcon_ from "@mui/icons-material/Check";
import ContentCopyIcon_ from "@mui/icons-material/ContentCopy";
import {
  Avatar,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from "@mui/material";
import { create } from "blockies-ts";
import { useState } from "react";
import { Address } from "viem";
import { AccountAddress } from "./AccountAddress";
import { normalizeIcon } from "./helpers/normalizeIcon";
import { copyToClipboard } from "./utils";

const ContentCopyIcon = normalizeIcon(ContentCopyIcon_);
const CheckIcon = normalizeIcon(CheckIcon_);

interface AccountAddressCardProps {
  address: Address;
  PaperProps?: PaperProps;
}

export function AccountAddressCard({
  address,
  PaperProps = { sx: {} },
}: AccountAddressCardProps) {
  const blockiesSrc = create({ seed: address.toLowerCase() }).toDataURL();
  const [copied, setCopied] = useState(false);

  return (
    <Paper
      {...PaperProps}
      sx={{ px: 2.25, py: 1.75, borderRadius: 0.75, ...PaperProps.sx }}
    >
      <AccountAddress address={address}>
        {({
          ensAvatarResult,
          ensNameResult,
          checksumAddress,
          shortenedAddress,
        }) => (
          <Stack direction="row" alignItems="center" gap={1}>
            {ensAvatarResult.data ? (
              <Avatar
                alt="ENS avatar"
                variant="rounded"
                src={ensAvatarResult.data}
                sx={{ width: 24, height: 24 }}
              />
            ) : (
              <Avatar
                alt="generated blockie avatar"
                variant="rounded"
                src={blockiesSrc}
                sx={{ width: 24, height: 24 }}
              />
            )}
            <Typography variant="body1" title={checksumAddress} flex={1}>
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
              sx={{
                m: -0.5,
                "&:hover": { color: (theme) => theme.palette.primary.main },
              }}
            >
              {copied ? (
                <CheckIcon fontSize="inherit" color="primary" />
              ) : (
                <ContentCopyIcon fontSize="inherit" />
              )}
            </IconButton>
          </Stack>
        )}
      </AccountAddress>
    </Paper>
  );
}
