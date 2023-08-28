import { Box, useMediaQuery } from "@mui/material";
import { FC } from "react";

import Link from "../../Link";
import theme from "../../theme";

const TermsAndPrivacy: FC = () => {
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: matches ? "initial" : "absolute",
        ...(matches
          ? {
              width: "100%",
              textAlign: "center",
            }
          : {}),
        p: 2,
        bottom: 0,
        right: 0,
      }}
    >
      <Link href="https://www.superfluid.finance/termsofuse/" target="_blank">
        Terms of Use
      </Link>
      {" & "}
      <Link
        href="https://www.iubenda.com/privacy-policy/34415583/legal"
        target="_blank"
      >
        Privacy Policy
      </Link>
    </Box>
  );
};
export default TermsAndPrivacy;
