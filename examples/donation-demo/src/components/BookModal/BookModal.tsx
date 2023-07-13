import configuration from "@/configuration";
import { FC, useCallback } from "react";
import { useIntercom } from "react-use-intercom";
import styles from "./BookModal.module.css";
import Modal, { ModalProps } from "./Modal/Modal";

interface BookModalProps extends ModalProps {}

const BookModal: FC<BookModalProps> = ({ show, onClose }) => {
  const { boot, show: showIntercom, startSurvey } = useIntercom();

  const bookDemo = useCallback(() => {
    boot();
    showIntercom();
    startSurvey(configuration.IntercomSurveyID);
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
