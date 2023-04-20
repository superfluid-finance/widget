import { Drawer, useTheme } from "@mui/material";
import { PropsWithChildren, useMemo, useState } from "react";
import ProductForm from "./ProductForm";

type ModalProps = {
  children: (props: ChildrenProps) => PropsWithChildren["children"];
};

type ChildrenProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ProductModal({ children }: ModalProps) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const childrenProps: ChildrenProps = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen]
  );
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
          }
        }}
      >
        <ProductForm onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
}