import { FC, PropsWithChildren } from "react";
import styles from "./Chip.module.css";
interface ChipProps extends PropsWithChildren {}

const Chip: FC<ChipProps> = ({ children }) => {
  return <span className={styles.Chip}>{children}</span>;
};

export default Chip;
