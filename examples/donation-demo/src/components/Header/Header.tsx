import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.Header}>
    <Logo />
  </header>
);

export default Header;
