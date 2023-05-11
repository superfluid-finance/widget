import {
  AppBar,
  Dialog,
  Drawer,
  IconButton,
  ModalProps,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import { ViewContent } from "./ViewContent";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Children } from "./utils";
import { DisplaySettings } from "@mui/icons-material";
import { useWeb3Modal } from "@web3modal/react";

export type CheckoutViewState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type DisplaySettings = {
  inputRadius: CSSProperties["borderRadius"];
  buttonRadius: CSSProperties["borderRadius"];
  fontFamily: string;
  productImageURL?: string;
  logoURL?: string;
  primaryTextColor: `#${string}`;
  secondaryTextColor: `#${string}`;
  primaryColor: `#${string}`;
  secondaryColor: `#${string}`;
};

export type CheckoutViewProps = {
  displaySettings?: DisplaySettings;
} & (
  | {
      type: "drawer" | "dialog" | "full-screen";
      children: (state: Readonly<CheckoutViewState>) => Children;
    }
  | {
      type: "page";
    }
);

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
    keepMounted: true,
  };

  const theme = createTheme(
    props.displaySettings
      ? {
          palette: {
            text: {
              primary: props.displaySettings.primaryTextColor,
              secondary: props.displaySettings.secondaryTextColor,
            },
            primary: { main: props.displaySettings.primaryColor },
            secondary: { main: props.displaySettings.secondaryColor },
          },
          components: {
            MuiStepIcon: {
              styleOverrides: {
                text: {
                  fill: props.displaySettings.secondaryColor,
                },
              },
            },
            MuiOutlinedInput: {
              styleOverrides: {
                root: {
                  borderRadius: props.displaySettings.inputRadius,
                },
              },
            },
            MuiButton: {
              styleOverrides: {
                root: {
                  color: props.displaySettings.secondaryTextColor,
                  borderRadius: props.displaySettings.buttonRadius,
                },
              },
            },
          },
        }
      : {
          palette: {
            mode: "dark",
          },
        }
  );

  switch (props.type) {
    case "dialog":
      return (
        <ThemeProvider theme={theme}>
          {props.children(viewState)}
          <Dialog {...modalProps}>
            <ViewContent />
          </Dialog>
        </ThemeProvider>
      );
    case "drawer":
      return (
        <ThemeProvider theme={theme}>
          {props.children(viewState)}
          <Drawer {...modalProps} anchor="right">
            <ViewContent />
          </Drawer>
        </ThemeProvider>
      );
    case "full-screen":
      return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      );
    default:
      return (
        <ThemeProvider theme={theme}>
          <ViewContent />
        </ThemeProvider>
      );
  }
}
