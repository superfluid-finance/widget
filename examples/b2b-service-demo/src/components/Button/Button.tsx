import { FC, PropsWithChildren } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  outlined?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ onClick, outlined = false, children }) => {
  return (
    <button
      className={`${styles.Button} ${
        outlined ? styles.Outlined : styles.Filled
      }`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 303 46" fill="none">
        <path
          d="M291.229 9.54824L291.229 9.54759L282.839 2.59308C281.987 1.88662 280.915 1.5 279.808 1.5H5.75C3.12665 1.5 1 3.62665 1 6.25V40.25C1 42.8733 3.12664 45 5.74999 45H296.75C299.373 45 301.5 42.8734 301.5 40.25V20.314C301.5 18.9023 300.872 17.5637 299.786 16.6612L291.229 9.54824Z"
          fill={outlined ? "transparent" : "#60B2FF"}
          stroke="#60B2FF"
          strokeWidth="1.5"
        />
      </svg>
      <span>{children}</span>
    </button>
  );
};

export default Button;
