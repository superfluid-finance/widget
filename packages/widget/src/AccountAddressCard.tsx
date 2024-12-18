import CheckIcon_ from "@mui/icons-material/Check.js";
import ContentCopyIcon_ from "@mui/icons-material/ContentCopy.js";
import {
  Avatar,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from "@mui/material";
import { create } from "blockies-ts";
import { useCallback, useState } from "react";
import { Address } from "viem";

import { AccountAddress } from "./AccountAddress.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";
import { copyToClipboard } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

const ContentCopyIcon = normalizeIcon(ContentCopyIcon_);
const CheckIcon = normalizeIcon(CheckIcon_);

interface AccountAddressCardProps {
  address: Address;
  dataTest?: string;
  PaperProps?: PaperProps;
}

export function AccountAddressCard({
  address,
  dataTest,
  PaperProps = { sx: {} },
}: AccountAddressCardProps) {
  const blockiesSrc = create({
    seed: address.toLowerCase(),
  }).toDataURL();
  const [copied, setCopied] = useState(false);

  const { eventHandlers } = useWidget();
  const onCopyAddressButtonClick = useCallback(
    async (checksumAddress: string) => {
      eventHandlers.onButtonClick({
        type: "switch_network",
      });
      await copyToClipboard(checksumAddress);
      setCopied(true);
      const timeoutId = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timeoutId);
    },
    [eventHandlers.onButtonClick],
  );

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
          <Stack direction="row" alignItems="center" spacing={1}>
            {ensAvatarResult.data ? (
              <Avatar
                data-testid="ens-avatar"
                alt="ENS avatar"
                variant="rounded"
                src={ensAvatarResult.data as string} // TODO?
                sx={{ width: 24, height: 24 }}
              />
            ) : (
              <Avatar
                data-testid="blockie-avatar"
                alt="generated blockie avatar"
                variant="rounded"
                src={blockiesSrc}
                sx={{ width: 24, height: 24 }}
              />
            )}
            <Typography
              data-testid={`${dataTest}-address`}
              variant="body1"
              title={checksumAddress}
              flex={1}
            >
              {/* TODO? */}
              {(ensNameResult.data as string | undefined) ?? shortenedAddress}
            </Typography>

            <IconButton
              data-testid={`${dataTest}-copy-button`}
              size="small"
              title="Copy address to clipboard"
              onClick={() => onCopyAddressButtonClick(checksumAddress)}
              sx={{
                "&:hover": { color: (theme) => theme.palette.primary.main },
              }}
            >
              {copied ? (
                <CheckIcon
                  data-testid="check-icon"
                  fontSize="inherit"
                  color="primary"
                />
              ) : (
                <ContentCopyIcon data-testid="copy-icon" fontSize="inherit" />
              )}
            </IconButton>
          </Stack>
        )}
      </AccountAddress>
    </Paper>
  );
}
