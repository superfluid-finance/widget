import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import FooterLinksGroup, { FooterLink } from "./FooterLinksGroup";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <Paper
      component="footer"
      elevation={0}
      sx={{ width: "100%", borderRadius: 0 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          py: 3,
          maxWidth: "min(100vw - 6rem, 1920px)",
          margin: "0 auto",
        }}
      >
        <Box sx={{ maxWidth: "220px" }}>
          <Image
            src="/assets/superfluid-logo.svg"
            alt="Superfluid logo"
            width="171"
            height="31"
            style={{ display: "block" }}
          />
          <Typography variant="body1" color="grey.800" sx={{ mt: 3 }}>
            Lorem ipsum dolor sit amet consectetur. Sed eu non sed fusce. Diam
            vel nulla blandit libero volutpat euismod amet.
          </Typography>
        </Box>
        <Stack direction="row" gap={8}>
          <FooterLinksGroup title="Developers">
            <FooterLink href="">Docs</FooterLink>
            <FooterLink href="">Github</FooterLink>
            <FooterLink href="">Console</FooterLink>
            <FooterLink href="">Contribute</FooterLink>
          </FooterLinksGroup>
          <FooterLinksGroup title="Resources">
            <FooterLink href="">Support Chat</FooterLink>
            <FooterLink href="">Knowledge Base</FooterLink>
          </FooterLinksGroup>
          <FooterLinksGroup title="Company">
            <FooterLink href="">About</FooterLink>
            <FooterLink href="">Blog</FooterLink>
            <FooterLink href="">Contact</FooterLink>
            <FooterLink href="">Careers</FooterLink>
          </FooterLinksGroup>
          <FooterLinksGroup title="Social Media">
            <FooterLink href="">Medium</FooterLink>
            <FooterLink href="">Discord</FooterLink>
            <FooterLink href="">Twitter</FooterLink>
            <FooterLink href="">LinkedIn</FooterLink>
          </FooterLinksGroup>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Footer;
