import Container from "@mui/material/Container";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  GlobalStyles,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SubscribeModal from "../components/SubscribeModal";
import ProductModal from "../components/ProductModal";
import ProductProvider from "../components/ProductProvider";
import Link from "../Link";
import React from "react";
import StarIcon from "@mui/icons-material/StarBorder";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.superfluid.finance/">
        This is a dummy example.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const tiers = [
  {
    title: "Cheap",
    price: "1",
    description: [
      "Lorem ipsum",
      "Aenean accumsan",
      "Fusce vitae",
      "In hac habitasse",
      "Dolor maximus",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "Consectetur adipiscing",
      "Euismod mauris euismod",
      "Tellus dictum malesuada",
      "Posuere falestie",
      "Ullamcorper commodo",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "Sit amet consectetur",
      "Pellentesque enim",
      "Orci non posuere",
      "Platea vestibulum",
      "Dolor sed aliquam",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

export default function Home() {
  return (
    <ProductProvider>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Superfluid Checkout Sandbox
          </Typography>
          <ProductModal>
            {({ setOpen }) => (
              <Button
                href="#"
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
                onClick={() => setOpen(true)}
              >
                Configure Products
              </Button>
            )}
          </ProductModal>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim
          suspendisse in est ante in nibh mauris cursus. Dui nunc mattis enim ut
          tellus elementum.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <SubscribeModal>
                    {({ setOpen }) => (
                      <Button
                        fullWidth
                        onClick={() => void setOpen(true)}
                        variant={tier.buttonVariant as "outlined" | "contained"}
                      >
                        {tier.buttonText}
                      </Button>
                    )}
                  </SubscribeModal>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </ProductProvider>
  );

  // return (

  // <Container
  //   maxWidth="lg"
  //   sx={{
  //     height: "100vh",
  //   }}
  // >
  //   <Card
  //     sx={{
  //       p: 3,
  //     }}
  //   >
  //     <ProductProvider>
  //       <SubscribeModal>
  //         {({ setOpen }) => (
  //           <Button variant="contained" onClick={() => void setOpen(true)}>
  //             Subscribe
  //           </Button>
  //         )}
  //       </SubscribeModal>
  //       <ProductModal>
  //         {({ setOpen }) => (
  //           <Button variant="contained" onClick={() => void setOpen(true)}>
  //             Configure Product
  //           </Button>
  //         )}
  //       </ProductModal>
  //     </ProductProvider>
  //   </Card>
  // </Container>
  // );
}
