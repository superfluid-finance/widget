import { FC, useCallback } from "react";
import Modal, { ModalProps } from "./Modal/Modal";
import Button from "../Button/Button";
import styles from "./BookModal.module.css";
import { useIntercom } from "react-use-intercom";

interface BookModalProps extends ModalProps {}

const BookModal: FC<BookModalProps> = ({ show, onClose }) => {
  const { boot, show: showIntercom, startSurvey } = useIntercom();

  const bookDemo = useCallback(() => {
    boot();
    showIntercom();
    startSurvey(34698139);
    onClose && onClose();
  }, [boot, showIntercom, startSurvey, onClose]);

  return (
    <Modal show={show} onClose={onClose}>
      <div className={styles.BookModal}>
        <img
          className={styles.CloseBtn}
          onClick={onClose}
          src="/close.svg"
          alt="close"
        />
        <h3>Do you have more questions?</h3>
        <p>
          We’ll show you how your business can benefit from using our checkout
        </p>
        <button onClick={bookDemo}>Book a Demo</button>
      </div>
    </Modal>
  );
};

export default BookModal;
