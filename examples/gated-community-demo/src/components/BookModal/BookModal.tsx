import { FC } from "react";

import styles from "./BookModal.module.css";
import Modal, { ModalProps } from "./Modal/Modal";

const BookModal: FC<ModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className={styles.BookModal}>
        <img
          className={styles.CloseBtn}
          onClick={onClose}
          src="/icons/close.svg"
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
          <a
            className={styles.SecondaryButton}
            href="https://use.superfluid.finance/subscriptions"
            target="_blank"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default BookModal;
