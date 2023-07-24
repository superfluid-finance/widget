import Logo from "../Logo/Logo";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.Footer}>
    <Logo />
    <p>Support your favorite creators in web3 space</p>
  </footer>
);

export default Footer;
