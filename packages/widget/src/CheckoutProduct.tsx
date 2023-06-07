import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import NetworkBadge from "./NetworkBadge";
import { useWidget } from "./WidgetContext";
import { DraftFormValues } from "./formValues";

export default function CheckoutProduct() {
  const {
    productDetails: { name, description, imageURI },
  } = useWidget();

  const { watch } = useFormContext<DraftFormValues>();
  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);

  return (
    <Card component={Stack} flexDirection="row">
      {imageURI && (
        <CardMedia
          sx={{ minWidth: "calc(100% / 3)", borderRadius: 1 }}
          image={imageURI}
          title="product image"
        />
      )}
      <CardContent
        component={Stack}
        gap={1}
        sx={{ position: "relative", px: 2.25, pt: 5, pb: 4 }}
      >
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="body1" color="text.secondary">
            Pay in Stream
          </Typography>
          {paymentOptionWithTokenInfo && (
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h2" component="span">
                {paymentOptionWithTokenInfo.paymentOption.flowRate.amountEther}
              </Typography>
              <Stack direction="column">
                <Typography variant="caption" color="text.secondary">
                  {paymentOptionWithTokenInfo.superToken.symbol}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  per {paymentOptionWithTokenInfo.paymentOption.flowRate.period}
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
      </CardContent>
    </Card>
  );
}
