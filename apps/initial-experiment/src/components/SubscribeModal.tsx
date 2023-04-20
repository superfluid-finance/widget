import { Drawer, useTheme } from "@mui/material";
import { PropsWithChildren, useMemo, useState } from "react";
import Subscribe from "./Subscribe";
import { useProduct } from "./ProductProvider";
import tokenList from "../tokenList";

type ModalProps = {
  children: (props: ChildrenProps) => PropsWithChildren["children"];
};

type ChildrenProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function SubscribeModal({ children }: ModalProps) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const childrenProps: ChildrenProps = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen]
  );
  const [product] = useProduct();

  return (
    <>
      {children(childrenProps)}
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClose={() => void setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.grey[100],
          },
        }}
      >
        <Subscribe productInfo={product} tokenList={tokenList} />
      </Drawer>
    </>
  );
}
