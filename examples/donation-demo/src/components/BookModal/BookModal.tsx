import configuration from "@/configuration";
import { FC, useCallback } from "react";
import { useIntercom } from "react-use-intercom";
import styles from "./BookModal.module.css";
import Modal, { ModalProps } from "./Modal/Modal";

const BookModal: FC<ModalProps> = ({ show, onClose }) => {
  const { boot, show: showIntercom, startSurvey } = useIntercom();

  const bookDemo = useCallback(() => {
    boot();
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
        <div className={styles.ActionsWrapper}>
          <a
            className={styles.PrimaryButton}
            href="https://checkout-builder.superfluid.finance/"
            target="_blank"
          >
            Try the Widget Builder
          </a>
          <button className={styles.SecondaryButton} onClick={bookDemo}>
            Book a Demo
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookModal;
