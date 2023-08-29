import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChainId, PaymentOption } from "@superfluid-finance/widget";
import uniqBy from "lodash/uniqBy";
import {
  createRef,
  FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormContext } from "react-hook-form";
import { Address } from "viem";

import { useReadAsBase64 } from "../../hooks/useReadFileAsBase64";
import { getNetworkByChainIdOrThrow, Network } from "../../networkDefinitions";
import InputWrapper from "../form/InputWrapper";
import ImageSelect from "../image-select/ImageSelect";
import NFTDeploymentDialog from "../nft-deployment-modal/NFTDeploymentDialog";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const recaptchaKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "invalid-key";

const StreamGatingEditor: FC = () => {
  const { watch } = useFormContext<WidgetProps>();
  const [paymentOptions] = watch(["paymentDetails.paymentOptions"]);
  const recaptchaRef = createRef<ReCAPTCHA>();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");

  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");

  const [nftImage, setNftImage] = useState<File>();
  const { base64: nftImageBase64 } = useReadAsBase64(nftImage);

  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<
    Partial<Record<ChainId, PaymentOption[]>>
  >({});

  const [deployedCloneAddresses, setDeployedCloneAddresses] = useState<
    Record<ChainId, Address>[]
  >([]);

  const [isDeploying, setDeploying] = useState(false);
  const [isDeployed, setDeployed] = useState(false);

  useLayoutEffect(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  }, []);

  const onRecaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
  }, []);

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
      if (!recaptchaToken) {
        throw new Error("Recaptcha token is missing");
      }

      const response = await fetch("/api/deploy-enft", {
        method: "POST",
        body: JSON.stringify({
          selectedPaymentOptions,
          tokenName,
          tokenSymbol,
          nftImage: nftImageBase64,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        console.error("Deploying NFT failed. Reason:", response.statusText);
        return;
      }

      const { deployments }: { deployments: Record<ChainId, Address>[] } =
        await response.json();

      setDeployedCloneAddresses(deployments);
    } catch (error) {
      console.error("Deploying NFT failed. Reason:", error);
    } finally {
      setDeployed(true);
      setDeploying(false);
    }
  }, [tokenName, tokenSymbol, nftImage, selectedPaymentOptions, recaptchaKey]);

  const isDeployDisabled = useMemo(
    () =>
      !tokenName ||
      !tokenSymbol ||
      !nftImage ||
      paymentOptions.length === 0 ||
      deployedCloneAddresses.length > 0 ||
      isDeployed,
    [
      tokenName,
      tokenSymbol,
      nftImage,
      paymentOptions,
      deployedCloneAddresses,
      isDeployed,
    ],
  );

  return (
    <Stack>
      <Stack direction="column" gap={1} sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Gate your content with NFTS</Typography>
        <Typography color="grey.800">
          Create NFT your users will hold while they are paying for your product
          or service
        </Typography>
      </Stack>
      <Stack gap={2}>
        <InputWrapper title="NFT Symbol">
          {() => (
            <TextField
              value={tokenSymbol}
              onChange={({ target }) => setTokenSymbol(target.value)}
            />
          )}
        </InputWrapper>
        <InputWrapper title="NFT Name">
          {() => (
            <TextField
              value={tokenName}
              onChange={({ target }) => setTokenName(target.value)}
            />
          )}
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
              key={network.chainId}
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
          imageSrc={nftImage ? URL.createObjectURL(nftImage) : undefined}
          onClick={(file) => setNftImage(file)}
          onRemove={() => setNftImage(undefined)}
          sizeLimit={256 * 1024} // 256 kB
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
      <NFTDeploymentDialog
        open={deployedCloneAddresses.length > 0}
        cloneAddresses={deployedCloneAddresses}
        onClose={() => setDeployedCloneAddresses([])}
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={recaptchaKey}
        size="invisible"
        onChange={onRecaptchaChange}
      />
    </Stack>
  );
};

export default StreamGatingEditor;
