import { FC } from "react";
import Modal, { ModalProps } from "./Modal/Modal";
import Button from "../Button/Button";
import styles from "./BookModal.module.css";

interface BookModalProps extends ModalProps {}

const BookModal: FC<BookModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className={styles.BookModal}>
        <img className={styles.CloseBtn} onClick={onClose} src="/close.svg" />
        <h3>Do you have more questions?</h3>
        <p>
          We’ll show you how your business can benefit from using our checkout
        </p>
        <a href="" target="_blank">
          Book a Demo
        </a>
      </div>
    </Modal>
  );
};

export default BookModal;
