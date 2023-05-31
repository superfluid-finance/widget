import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useWidget } from "./WidgetContext";
import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";
import NetworkAvatar from "./NetworkAvatar";

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
    <Card variant="outlined" sx={{ display: "flex", m: 3 }}>
      {imageURI && (
        <CardMedia
          sx={{ minWidth: "calc(100% / 3)" }}
          image={imageURI}
          title="product image"
        />
      )}
      <CardContent>
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
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="medium"
          >
            Pay in Stream
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" component="span">
              {paymentOptionWithTokenInfo &&
                `${paymentOptionWithTokenInfo.paymentOption.flowRate.amountEther} ${paymentOptionWithTokenInfo.superToken.symbol}/${paymentOptionWithTokenInfo.paymentOption.flowRate.period}`}
            </Typography>
          </Stack>
        </Box>
        {network && <NetworkAvatar network={network} />}
      </CardContent>
    </Card>
  );
}
