import { Link, LinkProps, Stack, Typography, useTheme } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { FC, PropsWithChildren } from "react";

interface FooterLinkProps
  extends Pick<LinkProps, "sx" | "href">,
    Omit<NextLinkProps, "href">,
    PropsWithChildren {}

export const FooterLink: FC<FooterLinkProps> = ({ children, ...props }) => (
  <Link
    component={NextLink}
    variant="caption"
    underline="none"
    color="text.primary"
    {...props}
  >
    {children}
  </Link>
);

interface FooterLinksGroupProps extends PropsWithChildren {
  title: string;
}

const FooterLinksGroup: FC<FooterLinksGroupProps> = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Stack gap={3}>
      <Typography variant="subtitle1">{title}</Typography>
      <Stack
        gap={2}
        sx={{
          [theme.breakpoints.down("sm")]: {
            alignItems: "center",
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default FooterLinksGroup;
