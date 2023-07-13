import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import BookDemoBtn from "../components/buttons/BookDemoBtn";

export default function Home() {
  return (
    <Stack sx={{ minHeight: "100vh" }} alignItems="center">
      <Stack
        direction="column"
        flex={1}
        gap={3}
        sx={{
          my: 3,
          maxWidth: "min(100vw - 2.5rem, 1920px)",
          width: "100%",
        }}
      >
        <Paper
          component="header"
          elevation={0}
          sx={{ px: 6, py: 3, borderRadius: 2, height: "80px" }}
        >
          <Image
            src="/assets/superfluid-logo.svg"
            alt="Superfluid logo"
            width="171"
            height="31"
            style={{ display: "block" }}
          />
        </Paper>

        <Paper
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          elevation={0}
          sx={{
            borderRadius: 5,
            position: "relative",
            overflow: "hidden",
            // Substracting footer, header and all the y margins/gaps
            maxHeight: "calc(100vh - 375px)",
          }}
        >
          <Box flex="1" sx={{ maxWidth: "650px", px: 7.5 }}>
            <Stack direction="row" gap={1} alignItems="center">
              <svg width="39" height="2" viewBox="0 0 39 2">
                <path d="M39 1H0.5" stroke="#1DB227" />
              </svg>
              <Typography fontWeight="bold" color="primary">
                Subscription checkout builder
              </Typography>
            </Stack>
            <Typography variant="h1" sx={{ mt: 2, mb: 2.5 }} color="grey.900">
              Build your checkout and get paid every second.
            </Typography>
            <Typography variant="subtitle2" color="grey.800">
              Define your payment details and experiment with component styles.
              Export your creation with ease in the most convenient format and
              seamlessly integrate it into your platform.
            </Typography>
            <Stack direction="row" gap={2} sx={{ mt: 8 }}>
              <Button
                fullWidth
                component={Link}
                href="builder"
                variant="contained"
                color="primary"
                size="large"
                sx={{ maxWidth: "254px" }}
              >
                Enter Builder
              </Button>
              <BookDemoBtn sx={{ maxWidth: "180px" }}>Book a Demo</BookDemoBtn>
            </Stack>
          </Box>

          <Box sx={{ maxWidth: "min(50%, 1208px)" }}>
            <img
              src="/assets/preview.png"
              alt=""
              style={{ display: "block", width: "100%" }}
            />
          </Box>
        </Paper>
      </Stack>

      <Footer />
    </Stack>
  );
}
