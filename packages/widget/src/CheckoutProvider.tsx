import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CheckoutConfig } from "./CheckoutConfig";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import { ModalProps } from "@mui/material/Modal";
import { CheckoutContent } from "./CheckoutContent";

type ModalState = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export type CheckoutContextValue = {
  modal: ModalState
} & CheckoutConfig;

export const CheckoutContext = createContext<CheckoutContextValue>(undefined!);

type Props = {
  children: (
    contextValue: CheckoutContextValue
  ) => PropsWithChildren["children"];
  modal?: "drawer" | "dialog";
} & CheckoutConfig;

export function CheckoutProvider({ children, modal = "drawer", ...config }: Props) {
  // TODO: validate input

  // # Modal
  const [isOpen, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), [setOpen]);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);

  const modalState = useMemo<ModalState>(() => ({
    isOpen,
    openModal,
    closeModal,
  }), [isOpen, openModal, closeModal])

  const modalProps: Omit<ModalProps, "children"> = {
    open: isOpen,
    onClose: closeModal
  };
  const ModalComponent = modal === "dialog" ? Dialog : Drawer;
  // ---

  const contextValue = useMemo(() => ({
    modal: modalState,
    ...config
  }), [modalState, Object.values(config)]);

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children(contextValue)}
      <ModalComponent {...modalProps}>
        <CheckoutContent />
      </ModalComponent>
    </CheckoutContext.Provider>
  );
}
