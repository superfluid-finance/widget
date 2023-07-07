import {
  Box,
  Card,
  CardMedia,
  CardProps,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import ExpandIcon from "./ExpandIcon";
import NetworkBadge from "./NetworkBadge";
import { useWidget } from "./WidgetContext";
import { DraftFormValues } from "./formValues";

interface CheckoutProductProps {
  CardProps?: CardProps;
}
export default function CheckoutProduct({ CardProps }: CheckoutProductProps) {
  const [showDetails, setShowDetails] = useState(false);

  const collapsableDetails = useMediaQuery(
    "@media all and (max-height: 840px)"
  );

  const {
    productDetails: { name, description, imageURI },
    layout: { elevated },
  } = useWidget();

  const { watch } = useFormContext<DraftFormValues>();
  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);

  const toggleDetails = useCallback(
    () => setShowDetails(!showDetails),
    [showDetails]
  );

  return (
    <Card variant={elevated ? "elevation" : "outlined"} {...CardProps}>
      <Paper
        component={Stack}
        variant="outlined"
        flexDirection="row"
        gap={2}
        sx={{ m: "-1px" }}
      >
        {imageURI && (
          <CardMedia
            sx={{ minWidth: "calc(100% / 3)", borderRadius: 1 }}
            image={imageURI}
            title="product image"
          />
        )}
        <Box
          component={Stack}
          gap={1}
          flex={1}
          sx={{
            position: "relative",
            pl: imageURI ? 0 : 3.5,
            pr: imageURI ? 5 : 3.5,
            pb: 4,
            pt: 6,
          }}
        >
          <Typography
            data-testid="product-name"
            gutterBottom
            variant="subtitle2"
            color="text.secondary"
            fontWeight={500}
            component="div"
          >
            {name}
          </Typography>

          <Divider />

          <Box>
            <Typography variant="body1" color="text.secondary">
              Pay in Stream
            </Typography>
            {paymentOptionWithTokenInfo && (
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography
                  data-testid="main-token-amount"
                  variant="h2"
                  component="span"
                >
                  {
                    paymentOptionWithTokenInfo.paymentOption.flowRate
                      .amountEther
                  }
                </Typography>
                <Stack direction="column">
                  <Typography
                    data-testid="main-token-selected"
                    variant="caption"
                    color="text.secondary"
                  >
                    {paymentOptionWithTokenInfo.superToken.symbol}
                  </Typography>
                  <Typography
                    data-testid="main-flow-rate-period"
                    variant="caption"
                    color="text.secondary"
                  >
                    per{" "}
                    {paymentOptionWithTokenInfo.paymentOption.flowRate.period}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Box>

          {network && (
            <NetworkBadge
              network={network}
              AvatarProps={{
                sx: {
                  position: "absolute",
                  top: 0,
                  right: "32px",
                },
              }}
            />
          )}
        </Box>
      </Paper>

      {description && (
        <Box sx={{ px: 3.5, pb: 2.5, pt: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ cursor: collapsableDetails ? "pointer" : "initial" }}
            onClick={toggleDetails}
          >
            <Typography
              variant="subtitle2"
              fontWeight={500}
              color="text.secondary"
            >
              Details
            </Typography>
            {collapsableDetails && <ExpandIcon expanded={showDetails} />}
          </Stack>
          <Collapse in={!collapsableDetails || showDetails}>
            <Typography
              data-testid="product-description"
              variant="body2"
              color="text.secondary"
              sx={{ pt: 1, whiteSpace: "pre-wrap" }}
            >
              {description}
            </Typography>
          </Collapse>
        </Box>
      )}
    </Card>
  );
}
