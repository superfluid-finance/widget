import { Button, ButtonProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface BookDemoBtnProps extends PropsWithChildren, ButtonProps {}

const BookDemoBtn: FC<BookDemoBtnProps> = ({ children, ...props }) => {
  const onBookDemo = () => {
    if (window.Intercom) {
      window.Intercom(
        "startSurvey",
        process.env.NEXT_PUBLIC_INTERCOM_SURVEY_ID,
      );
    }
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color="primary"
      {...props}
      onClick={onBookDemo}
    >
      {children}
    </Button>
  );
};

export default BookDemoBtn;
