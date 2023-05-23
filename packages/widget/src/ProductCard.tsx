import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useWidget } from "./WidgetContext";
import { useFormContext } from "react-hook-form";
import { DraftFormValues } from "./formValues";

export default function ProductCard() {
  const {
    productDetails: { name, description, imageURI: imageURI_ },
  } = useWidget();

  const { watch } = useFormContext<DraftFormValues>();
  const [network, paymentOptionWithTokenInfo] = watch([
    "network",
    "paymentOptionWithTokenInfo",
  ]);

  const imageURI = imageURI_ ?? "https://picsum.photos/200/200"; // TODO(KK): remove lorem

  return (
    <Card sx={{ m: 3 }}>
      {imageURI && (
        // TODO(KK): Figure out size. Ask Mikk
        <CardMedia
          sx={{ height: 140 }}
          image={imageURI}
          title="product image"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
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
          <Typography variant="h6" component="span">{network?.name}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
