import { FC } from "react";
import { Card } from "@mui/material";
import { WidgetContent, WidgetContentProps } from "./WidgetContent";

const WidgetDialog: FC<WidgetContentProps> = (props) => {
  return (
    <Card sx={{ width: 500, p: 4 }}>
      <WidgetContent {...props} />
    </Card>
  );
};

export default WidgetDialog;
