import { Address } from "viem";
import { AccountAddress } from "./AccountAddress";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { create } from "blockies-ts";
import ContentCopyIcon_ from "@mui/icons-material/ContentCopy";
import { normalizeIcon } from "./helpers/normalizeIcon";
import { copyToClipboard } from "./utils";
import CheckCircleIcon_ from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const ContentCopyIcon = normalizeIcon(ContentCopyIcon_);
const CheckIcon = normalizeIcon(CheckCircleIcon_);

export function AccountAddressCard({ address }: { address: Address }) {
  const blockiesSrc = create({ seed: address.toLowerCase() }).toDataURL();
  const [copied, setCopied] = useState(false);
  return (
    <Card>
      <AccountAddress address={address}>
        {({
          ensAvatarResult,
          ensNameResult,
          checksumAddress,
          shortenedAddress,
        }) => (
          <Stack
            component={CardContent}
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
              title="Copy address to clipboard"
              onClick={() =>
                void copyToClipboard(checksumAddress).then((x) => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                })
              }
            >
              {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
            </IconButton>
          </Stack>
        )}
      </AccountAddress>
    </Card>
  );
}
