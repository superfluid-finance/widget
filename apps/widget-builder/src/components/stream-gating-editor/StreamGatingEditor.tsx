import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PaymentOption } from "@superfluid-finance/widget";
import uniqBy from "lodash/uniqBy";
import { FC, useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  ChainId,
  getNetworkByChainIdOrThrow,
  Network,
} from "../../networkDefinitions";
import InputWrapper from "../form/InputWrapper";
import ImageSelect from "../image-select/ImageSelect";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const StreamGatingEditor: FC = () => {
  const { watch } = useFormContext<WidgetProps>();
  const [paymentOptions] = watch(["paymentDetails.paymentOptions"]);

  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<
    Partial<Record<ChainId, PaymentOption[]>>
  >({});

  const [isDeploying, setDeploying] = useState(false);

  // Collect networks used in payment options
  const paymentOptionNetworks = useMemo(() => {
    try {
      const result = uniqBy(paymentOptions, "chainId").map(({ chainId }) => {
        return getNetworkByChainIdOrThrow(chainId);
      });

      return result;
    } catch (error) {
      return [];
    }
  }, [paymentOptions]);

  // Group payment options by network
  const selectPaymentOptions = useCallback(
    (checked: boolean, network: Network) => {
      const paymentOptionsByNetwork = paymentOptions.filter(
        ({ chainId }) => network.chainId === chainId,
      );

      setSelectedPaymentOptions((prev) => ({
        ...prev,
        [network.chainId]: checked ? paymentOptionsByNetwork : undefined,
      }));

      return;
    },
    [paymentOptions],
  );

  const deployNFT = useCallback(async () => {
    try {
      setDeploying(true);
      await fetch("/api/deploy-enft", {
        method: "POST",
        body: JSON.stringify({
          selectedPaymentOptions,
          tokenName,
          tokenSymbol,
          nftImage,
        }),
      });
    } catch (error) {
      console.error("Deploying NFT failed. Reason:", error);
    } finally {
      setDeploying(false);
    }
  }, [tokenName, tokenSymbol, nftImage, selectedPaymentOptions]);

  const isDeployDisabled = useMemo(
    () => !tokenName || !tokenSymbol || !nftImage || !paymentOptions.length,
    [tokenName, tokenSymbol, nftImage, paymentOptions],
  );

  return (
    <Stack>
      <Stack direction="column" gap={1} sx={{ mb: 3 }}>
        <Typography variant="h6">Stream Gating with NFTs</Typography>
        <Typography color="grey.800">
          Create NFT your users will hold while they are paying for your product
          or service
        </Typography>
      </Stack>
      <Stack gap={2}>
        <InputWrapper title="NFT Symbol">
          <TextField
            value={tokenSymbol}
            onChange={({ target }) => setTokenSymbol(target.value)}
          />
        </InputWrapper>
        <InputWrapper title="NFT Name">
          <TextField
            value={tokenName}
            onChange={({ target }) => setTokenName(target.value)}
          />
        </InputWrapper>
      </Stack>
      <Stack direction="column" sx={{ my: 2 }}>
        <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
          Select networks you want to deploy your NFT to.
        </Typography>
        <Typography color="grey.800">
          The following networks are used in your checkout widget:
        </Typography>
      </Stack>
      <Stack sx={{ px: 1 }}>
        <FormGroup>
          {paymentOptionNetworks.map((network) => (
            <FormControlLabel
              key={network.name}
              sx={{ fontWeight: "bold" }}
              control={
                <Checkbox
                  color="primary"
                  value={network}
                  checked={Boolean(selectedPaymentOptions[network.chainId])}
                  onChange={({ target }) =>
                    selectPaymentOptions(target.checked, network)
                  }
                />
              }
              label={network?.name}
            />
          ))}
        </FormGroup>
      </Stack>
      <Stack direction="column" gap={4} sx={{ mt: 4 }}>
        <ImageSelect
          label="Customize NFT Image"
          imageSrc={nftImage}
          onClick={(file) => setNftImage(URL.createObjectURL(file))}
          onRemove={() => setNftImage("")}
        />
        <LoadingButton
          color="primary"
          variant="contained"
          size="large"
          onClick={deployNFT}
          loading={isDeploying}
          disabled={isDeployDisabled}
        >
          Create NFT
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default StreamGatingEditor;
