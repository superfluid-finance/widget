import { Box } from "@mui/material";
import { FC } from "react";

import Link from "../../Link";
import { goerliPermitTokens } from "../widget-preview/WidgetPreview";

const TermsAndPrivacy: FC = () => (
  <Box
    sx={{
      position: "absolute",
      p: 2,
      bottom: 0,
      left: "540px",
    }}
  >
    <Link
      sx={{
        fontWeight: 600,
      }}
      target="_blank"
      href={`https://goerli.etherscan.io/token/${
        goerliPermitTokens.find((x) => (x.tags ?? []).includes("underlying"))!
          .address
      }#writeContract#F4`}
    >
      {"Click here to mint Permit Super Token's underlying token on Goerli!"}
    </Link>
    <br />
    <Link
      data-testid="terms-link"
      href="https://www.superfluid.finance/termsofuse/"
      target="_blank"
    >
      Terms of Use
    </Link>
    {" & "}
    <Link
      data-testid="privacy-link"
      href="https://www.iubenda.com/privacy-policy/34415583/legal"
      target="_blank"
    >
      Privacy Policy
    </Link>
  </Box>
);

export default TermsAndPrivacy;
