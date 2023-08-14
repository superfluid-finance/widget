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
import { FC, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  getNetworkByChainIdOrThrow,
  NetworkNames,
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
    Partial<Record<NetworkNames, PaymentOption>>
  >({});

  const [isDeploying, setDeploying] = useState(false);

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
      setDeploying(false);
      console.error("Deploy NFT error", error);
    }

    setDeploying(false);
  }, [tokenName, tokenSymbol, nftImage, selectedPaymentOptions]);

  return (
    <Stack>
      <Stack direction="column" gap={2} sx={{ mb: 2 }}>
        <Typography variant="body2">
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
        <Typography variant="subtitle2">
          Select networks you want to deploy your NFT to.
        </Typography>
        <Typography variant="caption">
          The following networks are used in your checkout widget:
        </Typography>
      </Stack>
      <Stack sx={{ px: 1 }}>
        <FormGroup>
          {paymentOptions.map((paymentOption) => {
            const network = getNetworkByChainIdOrThrow(paymentOption.chainId);

            return (
              <FormControlLabel
                key={network.name}
                sx={{ fontWeight: "bold" }}
                control={
                  <Checkbox
                    color="primary"
                    value={network.name}
                    checked={Boolean(selectedPaymentOptions[network.name])}
                    onChange={({ target }) => {
                      setSelectedPaymentOptions((prev) => ({
                        ...prev,
                        [network.name]: target.checked
                          ? paymentOption
                          : undefined,
                      }));
                    }}
                  />
                }
                label={network?.name}
              />
            );
          })}
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
        >
          Create NFT
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default StreamGatingEditor;
