import {
  AppBar,
  Container,
  ContainerProps,
  Dialog,
  Drawer,
  IconButton,
  ModalProps,
  Toolbar,
  useTheme,
} from "@mui/material";
import { CheckoutContent } from "./CheckoutContent";
import { useCallback, useMemo, useState } from "react";
import { ChildrenProp } from "./utils";
import { useWidget } from "./WidgetContext";

export type ModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type ViewProps =
  | {
      type: "drawer" | "dialog" | "full-screen";
      children: (modal: Readonly<ModalState>) => ChildrenProp;
    }
  | {
      type: "page";
    };

export function ViewContainer(props: ViewProps) {
  const theme = useTheme();

  const [isOpen, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), [setOpen]);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);

  const viewState = useMemo<ModalState>(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  );

  const {
    walletManager: { isOpen: isWalletManagerOpen },
  } = useWidget();

  const modalProps: Omit<ModalProps, "children"> = {
    open: isOpen && !isWalletManagerOpen,
    onClose: closeModal,
    keepMounted: isOpen,
    sx: {
      borderRadius: theme.shape.borderRadius,
    },
  };

  const containerProps: ContainerProps = {
    fixed: true,
    disableGutters: true,
    sx: {
      width: theme.breakpoints.values.sm, // TODO(KK): Check with Mikk.
    },
  };

  switch (props.type) {
    case "dialog":
      return (
        <>
          {props.children(viewState)}
          <Dialog {...modalProps}>
            <Container {...containerProps}>
              <CheckoutContent />
            </Container>
          </Dialog>
        </>
      );
    case "drawer":
      return (
        <>
          {props.children(viewState)}
          <Drawer {...modalProps} anchor="right">
            <Container {...containerProps}>
              <CheckoutContent />
            </Container>
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
                  X{/* <CloseIcon /> // TODO: weird bug with builder */}
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container {...containerProps}>
              <CheckoutContent />
            </Container>
          </Dialog>
        </>
      );
    default:
      return (
        <Container {...containerProps}>
          <CheckoutContent />
        </Container>
      );
  }
}
