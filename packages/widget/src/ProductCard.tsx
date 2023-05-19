import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useCheckout } from "./CheckoutContext";

export default function ProductCard() {
  const {
    productDetails: { name, description, imageURI: imageURI_ },
  } = useCheckout();

  const imageURI = imageURI_ ?? "https://picsum.photos/200/200"; // TODO(KK): remove lorem

  return (
    <Card sx={{ m: 3 }}>
      {imageURI && (
        // TODO(KK): Figure out size. Ask Mikk
        <CardMedia sx={{ height: 140 }} image={imageURI} title="product image" />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
