import {
  AppBar,
  Dialog,
  Drawer,
  IconButton,
  ModalProps,
  Toolbar,
} from "@mui/material";
import { ViewContent } from "./ViewContent";
import { useCallback, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Children } from "./utils";
import { useWeb3Modal } from "@web3modal/react";

export type CheckoutViewState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type CheckoutViewProps =
  | {
      type: "drawer" | "dialog" | "full-screen";
      children: (state: Readonly<CheckoutViewState>) => Children;
    }
  | {
      type: "page";
    };

export function ViewProvider(props: CheckoutViewProps) {
  const [isOpen, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), [setOpen]);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);

  const viewState = useMemo<CheckoutViewState>(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  );

  const { isOpen: isWeb3ModalOpen } = useWeb3Modal();

  const modalProps: Omit<ModalProps, "children"> = {
    open: isOpen && !isWeb3ModalOpen,
    onClose: closeModal,
    keepMounted: isOpen,
  };

  switch (props.type) {
    case "dialog":
      return (
        <>
          {props.children(viewState)}
          <Dialog {...modalProps}>
            <ViewContent />
          </Dialog>
        </>
      );
    case "drawer":
      return (
        <>
          {props.children(viewState)}
          <Drawer {...modalProps} anchor="right">
            <ViewContent />
          </Drawer>
        </>
      );
    case "full-screen":
      return (
        <>
          {props.children(viewState)}
          <Dialog {...modalProps} fullScreen>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={closeModal}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <ViewContent />
          </Dialog>
        </>
      );
    default:
      return <ViewContent />;
  }
}
