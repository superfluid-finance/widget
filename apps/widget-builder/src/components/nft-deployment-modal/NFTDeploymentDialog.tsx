import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ChainId } from "@superfluid-finance/widget";
import Image from "next/image";
import { FC, useCallback } from "react";
import { Address } from "viem";

import Link from "../../Link";

type NFTDeploymentDialogProps = {
  cloneAddresses: Record<ChainId, Address>[];
  open: boolean;
  onClose: () => void;
};

const NFTDeploymentDialog: FC<NFTDeploymentDialogProps> = ({
  cloneAddresses,
  open,
  onClose,
}) => {
  const exportAddresses = useCallback(() => {
    const csv = "data:text/csv;charset=utf-8,";
    const headers = "chainId,address\n";
    const rows = cloneAddresses
      .map((row) => {
        const result = Object.entries(row);

        return result.join(",");
      })
      .join("\n");

    const data = csv + headers + rows;

    const encodedUri = encodeURI(data);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nft-contracts.csv");
    document.body.appendChild(link);

    link.click();
  }, [cloneAddresses]);

  return (
    <Dialog open={open}>
      <Box
        sx={{
          position: "relative",
          padding: 5,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12, color: "grey.900" }}
        >
          <Close />
        </IconButton>
        <Stack direction="column" gap={2} sx={{ alignItems: "center" }}>
          <Image
            src="/assets/nft-check.svg"
            width={120}
            height={120}
            alt="✅"
          />
          <Stack sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              textAlign="center"
            >{`You deployed an NFT contract for ${cloneAddresses.length} networks.`}</Typography>
            <Typography color="grey.800" textAlign="center">
              Export contract addresses or check how you can use them to gate
              your content.
            </Typography>
          </Stack>
          <Stack gap={1.5} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={exportAddresses}
            >
              Export Addresses
            </Button>
            <Link
              href="https://docs.superfluid.finance/superfluid/protocol-tutorials/nft-gating"
              style={{ width: "100%" }}
              target="_blank"
            >
              <Button variant="outlined" color="primary" size="large" fullWidth>
                See documentation
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default NFTDeploymentDialog;
