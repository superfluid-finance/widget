import useOutsideClick from "@/hooks/useOutsideClick";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

interface ModalProps extends PropsWithChildren {
  show?: boolean;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({ show = false, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useOutsideClick(dialogRef, () => {
    onClose && onClose();
  });

  useEffect(() => {
    if (!dialogRef.current) return;
    const isOpen = dialogRef.current.open;

    if (show && !isOpen) {
      dialogRef.current.showModal();
    } else if (!show && isOpen) {
      dialogRef.current.close();
    }
  }, [show, dialogRef]);

  return (
    <dialog ref={dialogRef} className={styles.Modal}>
      {children}
    </dialog>
  );
};

export default Modal;
