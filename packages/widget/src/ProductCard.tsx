import { Card, CardContent, Typography } from "@mui/material";
import { useCheckout } from "./CheckoutContext";

export default function ProductCard() {
  const {
    productDetails: { name, description },
  } = useCheckout();

  return (
    <Card sx={{ m: 3 }}>
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
