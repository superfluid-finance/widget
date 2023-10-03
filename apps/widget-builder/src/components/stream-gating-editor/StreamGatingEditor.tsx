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
  ExistentialNFT,
  PaymentOption,
  SupportedNetwork,
  supportedNetworks,
} from "@superfluid-finance/widget";
import isEmpty from "lodash/isEmpty";
import uniqBy from "lodash/uniqBy";
import {
  createRef,
  FC,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormContext } from "react-hook-form";
import { Chain } from "wagmi";

import useAnalyticsBrowser from "../../hooks/useAnalyticsBrowser";
import { useReadAsBase64 } from "../../hooks/useReadFileAsBase64";
import { polyfill } from "../../utils/utils";
import InputWrapper from "../form/InputWrapper";
import ImageSelect from "../image-select/ImageSelect";
import NetworkAvatar from "../NetworkAvatar";
import NFTDeploymentDialog from "../nft-deployment-modal/NFTDeploymentDialog";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const recaptchaKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "invalid-key";

type StreamGatingEditorProps = {
  previewContainerRef: RefObject<HTMLDivElement>;
};

polyfill();

const StreamGatingEditor: FC<StreamGatingEditorProps> = ({
  previewContainerRef,
}) => {
  const { watch, setValue } = useFormContext<WidgetProps>();

  const [paymentOptions, productDetails, existentialNFT] = watch([
    "paymentDetails.paymentOptions",
    "productDetails",
    "existentialNFT",
  ]);

  const recaptchaRef = createRef<ReCAPTCHA>();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");

  const { base64: nftImageBase64 } = useReadAsBase64(existentialNFT.image);
  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<
    Partial<Record<ChainId, PaymentOption[]>>
  >({});
  const [isDeploying, setDeploying] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<{
    error: string;
    message?: string;
  } | null>(null);

  useLayoutEffect(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  }, []);

  useEffect(() => {
    if (!errors) return;
    // Temporary until we have desings for error handling
    alert(`${errors.error}${errors.message ? ": " + errors.message : ""}`);
  }, [errors]);

  const onRecaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
  }, []);

  const ajs = useAnalyticsBrowser();

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

      setSelectedPaymentOptions((prev) => {
        if (checked) {
          return {
            ...prev,
            [network.id]: paymentOptionsByNetwork,
          };
        } else {
          delete prev[network.id as ChainId];

          return Object.assign({}, prev);
        }
      });

      return;
    },
    [paymentOptions, setSelectedPaymentOptions],
  );

  const deployNFT = useCallback(async () => {
    try {
      setDeploying(true);
      if (!recaptchaToken) {
        throw new Error("Recaptcha token is missing");
      }

      ajs.track("enft_deployment_requested", {
        selectedPaymentOptions,
      });

      const response = await fetch("/api/deploy-enft", {
        method: "POST",
        body: JSON.stringify({
          productDetails,
          selectedPaymentOptions,
          tokenName: existentialNFT.name,
          tokenSymbol: existentialNFT.symbol,
          contractOwner: existentialNFT.owner,
          nftImage: nftImageBase64,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        console.error("Deploying NFT failed.", body);

        setErrors(body);

        ajs.track("enft_deployment_failed", { reason: response });

        return;
      }

      const { deployments }: { deployments: ExistentialNFT["deployments"] } =
        await response.json();

      ajs.track("enft_deployment_succeeded", { deployments });

      setValue("existentialNFT.deployments", deployments);
      setDialogOpen(true);
    } catch (error) {
      console.error("Deploying NFT failed. Reason:", error);
      ajs.track("enft_deployment_failed", { reason: error });
    } finally {
      setDeploying(false);
    }
  }, [
    existentialNFT.name,
    existentialNFT.symbol,
    existentialNFT.owner,
    existentialNFT.image,
    selectedPaymentOptions,
    recaptchaToken,
    nftImageBase64,
  ]);

  const resetDeployment = () => {
    setValue("existentialNFT.deployments", {});
    setSelectedPaymentOptions({});
    setErrors(null);
  };

  const isDeployDisabled = useMemo(
    () =>
      !existentialNFT.name ||
      !existentialNFT.symbol ||
      !existentialNFT.owner ||
      !recaptchaToken ||
      paymentOptions.length === 0 ||
      isEmpty(selectedPaymentOptions) ||
      !isEmpty(existentialNFT.deployments),
    [
      existentialNFT.name,
      existentialNFT.symbol,
      existentialNFT.owner,
      existentialNFT.deployments,
      paymentOptions,
      selectedPaymentOptions,
      recaptchaToken,
    ],
  );

  return (
    <>
      <Stack gap={2} height="100%">
        <Box mb={1}>
          <Typography data-testid="gating-title" variant="h6" component="h2">
            Gate your content with NFTs
          </Typography>
          <Typography
            data-testid="nft-gating-message"
            variant="body2"
            color="text.secondary"
          >
            Create NFT your users will hold while they are paying for your
            product or service.
          </Typography>
        </Box>
        <InputWrapper
          dataTestid="nft-symbol-title"
          title="NFT Symbol"
          tooltip="The Symbol of your NFT. It will be displayed in your users' wallets."
        >
          {(id) => (
            <TextField
              data-testid="nft-symbol-input-field"
              id={id}
              value={existentialNFT.symbol}
              onChange={({ target }) =>
                setValue("existentialNFT.symbol", target.value)
              }
            />
          )}
        </InputWrapper>
        <InputWrapper
          dataTestid="nft-name-title"
          title="NFT Name"
          tooltip="The Name of your NFT. It will be displayed in your users' wallets."
        >
          {(id) => (
            <TextField
              data-testid="nft-name-input-field"
              id={id}
              value={existentialNFT.name}
              onChange={({ target }) =>
                setValue("existentialNFT.name", target.value)
              }
            />
          )}
        </InputWrapper>
        <InputWrapper
          dataTestid="contract-owner-title"
          title="Contract owner"
          tooltip="The address with authority to add further PaymentOptions or deprecate the contract."
        >
          {(id) => (
            <TextField
              data-testid="contract-owner-input-field"
              id={id}
              value={existentialNFT.owner}
              onChange={({ target }) =>
                setValue("existentialNFT.owner", target.value)
              }
            />
          )}
        </InputWrapper>
        <InputWrapper
          dataTestid="nft-image-title"
          id="nft-image"
          title="NFT Image"
          optional
          tooltip="The custom artwork for the NFT, which will be displayed in your users' wallets"
        >
          {(id) => (
            <ImageSelect
              data-testid="nft-image-upload-field"
              id={id}
              imageSrc={existentialNFT.image}
              onClick={(file) =>
                setValue("existentialNFT.image", URL.createObjectURL(file))
              }
              onRemove={() => setValue("existentialNFT.image", undefined)}
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
                    data-testid={`${network.name}-checkbox`}
                    color="primary"
                    value={network.name}
                    checked={Boolean(selectedPaymentOptions[network.id])}
                    onChange={({ target }) =>
                      selectPaymentOptions(target.checked, network)
                    }
                  />
                }
                label={
                  <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                    <NetworkAvatar network={network} />
                    {network.name}
                  </Stack>
                }
              />
            ))}
          </FormGroup>
          <LoadingButton
            data-testid="create-nft-button"
            color="primary"
            variant="contained"
            size="large"
            onClick={errors ? () => resetDeployment() : deployNFT}
            loading={isDeploying}
            disabled={isDeployDisabled}
            sx={{ mt: 1 }}
          >
            {errors ? "Deployment Failed, Reset?" : "Create NFT"}
          </LoadingButton>
        </Stack>
      </Stack>
      <NFTDeploymentDialog
        open={isDialogOpen}
        cloneAddresses={existentialNFT.deployments}
        onClose={() => setDialogOpen(false)}
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={recaptchaKey}
        size="invisible"
        onChange={onRecaptchaChange}
      />
      {/* {previewContainerRef &&
        createPortal(
          <div>NFT Image Placeholder</div>,
          // <img src="" width={400} height={400} alt="NFT Preview" />,
          previewContainerRef.current!,
        )} */}
    </>
  );
};

export default StreamGatingEditor;
