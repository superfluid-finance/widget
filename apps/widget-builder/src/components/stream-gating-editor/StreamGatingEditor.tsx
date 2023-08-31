import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChainId,
  PaymentOption,
  SupportedNetwork,
  supportedNetworks,
} from "@superfluid-finance/widget";
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
import { Chain } from "wagmi";

import { useReadAsBase64 } from "../../hooks/useReadFileAsBase64";
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
  const paymentOptionNetworks = useMemo<SupportedNetwork[]>(() => {
    try {
      const result = uniqBy(paymentOptions, "chainId").map(({ chainId }) => {
        const result = supportedNetworks.find(({ id }) => id === chainId);
        if (!result) throw new Error("Network not found.");
        return result;
      });

      return result;
    } catch (error) {
      return [];
    }
  }, [paymentOptions]);

  // Group payment options by network
  const selectPaymentOptions = useCallback(
    (checked: boolean, network: Chain) => {
      const paymentOptionsByNetwork = paymentOptions.filter(
        ({ chainId }) => network.id === chainId,
      );

      setSelectedPaymentOptions((prev) => ({
        ...prev,
        [network.id]: checked ? paymentOptionsByNetwork : undefined,
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
  }, [
    tokenName,
    tokenSymbol,
    nftImage,
    selectedPaymentOptions,
    recaptchaToken,
    nftImageBase64,
  ]);

  const isDeployDisabled = useMemo(
    () =>
      !tokenName ||
      !tokenSymbol ||
      !nftImage ||
      !recaptchaToken ||
      paymentOptions.length === 0 ||
      deployedCloneAddresses.length > 0 ||
      isDeployed,
    [
      tokenName,
      tokenSymbol,
      nftImage,
      paymentOptions,
      deployedCloneAddresses,
      recaptchaToken,
      isDeployed,
    ],
  );

  return (
    <>
      <Stack gap={2} height="100%">
        <Box mb={1}>
          <Typography variant="h6" component="h2">
            Gate your content with NFTs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create NFT your users will hold while they are paying for your
            product or service.
          </Typography>
        </Box>
        <InputWrapper title="NFT Symbol">
          {(id) => (
            <TextField
              id={id}
              value={tokenSymbol}
              onChange={({ target }) => setTokenSymbol(target.value)}
            />
          )}
        </InputWrapper>
        <InputWrapper title="NFT Name">
          {(id) => (
            <TextField
              id={id}
              value={tokenName}
              onChange={({ target }) => setTokenName(target.value)}
            />
          )}
        </InputWrapper>
        <InputWrapper id="nft-image" title="NFT Image">
          {(id) => (
            <ImageSelect
              id={id}
              imageSrc={nftImage ? URL.createObjectURL(nftImage) : undefined}
              onClick={(file) => setNftImage(file)}
              onRemove={() => setNftImage(undefined)}
              sizeLimit={256 * 1024} // 256 kB
            />
          )}
        </InputWrapper>
        <Stack direction="column" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            Select networks you want to deploy your NFT to.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The following networks are used in your checkout widget:
          </Typography>
        </Stack>
        <Stack justifyContent="space-between" height="100%">
          <FormGroup sx={{ px: 1 }}>
            {paymentOptionNetworks.map((network) => (
              <FormControlLabel
                key={network.id}
                sx={{ fontWeight: "bold" }}
                control={
                  <Checkbox
                    color="primary"
                    value={network}
                    checked={Boolean(selectedPaymentOptions[network.id])}
                    onChange={({ target }) =>
                      selectPaymentOptions(target.checked, network)
                    }
                  />
                }
                label={network?.name}
              />
            ))}
          </FormGroup>
          <LoadingButton
            color="primary"
            variant="contained"
            size="large"
            onClick={deployNFT}
            loading={isDeploying}
            disabled={isDeployDisabled}
            sx={{ mt: 1 }}
          >
            Create NFT
          </LoadingButton>
        </Stack>
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
    </>
  );
};

export default StreamGatingEditor;
