import { Button, SxProps } from "@mui/material";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface BookDemoBtnProps extends PropsWithChildren {
  sx?: SxProps;
}

const BookDemoBtn: FC<BookDemoBtnProps> = ({ children, sx = {} }) => {
  // TODO: Fix when intercom starts working again. Until then we fall back to subscriptions form
  // const onBookDemo = () => {
  //   if (window.Intercom) {
  //     window.Intercom(
  //       "startSurvey",
  //       process.env.NEXT_PUBLIC_INTERCOM_SURVEY_ID,
  //     );
  //   }
  // };

  return (
    <Button
      component={Link}
      href="https://use.superfluid.finance/subscriptions"
      target="_blank"
      fullWidth
      size="large"
      variant="outlined"
      color="primary"
      sx={sx}
    >
      {children}
    </Button>
  );
};

export default BookDemoBtn;
