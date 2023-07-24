import { Paper, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

import FooterLinksGroup, { FooterLink } from "./FooterLinksGroup";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const theme = useTheme();

  const openIntercom = () => {
    if (window.Intercom) {
      window.Intercom("show");
    }
  };

  return (
    <Paper
      component="footer"
      elevation={0}
      sx={{ width: "100%", borderRadius: 0 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={4}
        sx={{
          py: 6,
          maxWidth: "min(100vw - 6rem, 1600px)",
          margin: "0 auto",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        }}
      >
        <Stack
          sx={{
            maxWidth: "220px",
            [theme.breakpoints.down("sm")]: {
              margin: "0 auto",
            },
          }}
        >
          <Image
            src="/assets/superfluid-logo.svg"
            alt="Superfluid logo"
            width="171"
            height="31"
            style={{
              display: "block",
            }}
          />
        </Stack>
        <Stack
          direction="row"
          gap={8}
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              textAlign: "center",
              gap: 5,
            },
          }}
        >
          <FooterLinksGroup title="Developers">
            <FooterLink href="https://docs.superfluid.finance/">
              Docs
            </FooterLink>
            <FooterLink href="https://github.com/superfluid-finance">
              Github
            </FooterLink>
            <FooterLink href="https://console.superfluid.finance/">
              Console
            </FooterLink>
            <FooterLink href="https://github.com/superfluid-finance/protocol-monorepo/issues?q=is%3Aissue+is%3Aopen+label%3A%22Tag%3A+Bounty%22">
              Contribute
            </FooterLink>
          </FooterLinksGroup>
          <FooterLinksGroup title="Resources">
            <FooterLink onClick={openIntercom}>Support Chat</FooterLink>
            {/* <FooterLink href="">Knowledge Base</FooterLink> */}
          </FooterLinksGroup>
          <FooterLinksGroup title="Company">
            <FooterLink href="https://www.superfluid.finance/about">
              About
            </FooterLink>
            <FooterLink href="https://www.superfluid.finance/blog">
              Blog
            </FooterLink>
            {/* <FooterLink href="">Contact</FooterLink> */}
            <FooterLink href="https://www.superfluid.finance/about/#job">
              Careers
            </FooterLink>
          </FooterLinksGroup>
          <FooterLinksGroup title="Social Media">
            <FooterLink href="https://medium.com/@superfluid_HQ">
              Medium
            </FooterLink>
            <FooterLink href="https://discord.superfluid.finance/">
              Discord
            </FooterLink>
            <FooterLink href="https://twitter.com/Superfluid_HQ">
              Twitter
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/company/superfluid">
              LinkedIn
            </FooterLink>
          </FooterLinksGroup>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Footer;
