import { Box } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const TermsAndPrivacy: FC = () => (
  <Box sx={{ position: "absolute", p: 2, bottom: 0, right: 0 }}>
    <Link href="https://www.superfluid.finance/termsofuse/" target="_blank">
      Terms of Use
    </Link>
    {" and "}
    <Link
      href="https://www.iubenda.com/privacy-policy/34415583/legal"
      target="_blank"
    >
      Privacy Policy
    </Link>
  </Box>
);

export default TermsAndPrivacy;
