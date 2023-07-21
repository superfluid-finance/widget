import Close from "@mui/icons-material/Close.js";
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
import { useCallback, useMemo, useState } from "react";
import { CheckoutContent } from "./CheckoutContent.js";
import { useWidget } from "./WidgetContext.js";
import { normalizeIcon } from "./helpers/normalizeIcon.js";
import { ChildrenProp } from "./utils.js";

const CloseIcon = normalizeIcon(Close);

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

export function WidgetView(props: ViewProps) {
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
    [isOpen, openModal, closeModal],
  );

  const {
    walletManager: { isOpen: isWalletManagerOpen },
  } = useWidget();

  const modalProps: Omit<ModalProps, "children"> = {
    open: isOpen && !isWalletManagerOpen,
    onClose: closeModal,
    keepMounted: isOpen,
  };

  const containerProps: ContainerProps = {
    disableGutters: true,
  };

  switch (props.type) {
    case "dialog":
      return (
        <>
          {props.children(viewState)}
          <Dialog
            {...modalProps}
            sx={{ borderRadius: theme.shape.borderRadius }}
            maxWidth="lg"
            PaperProps={{
              sx: {
                mx: 2,
                width: `min(558px, calc(100vw - ${theme.spacing(4)}))`,
              },
            }}
          >
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
          <Drawer
            {...modalProps}
            PaperProps={{
              sx: {
                width: "min(558px, 100vw)",
              },
            }}
            anchor="right"
          >
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
          <Dialog
            {...modalProps}
            sx={{ borderRadius: theme.shape.borderRadius }}
            fullScreen
          >
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
