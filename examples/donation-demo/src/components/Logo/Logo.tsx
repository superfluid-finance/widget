import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img src="/logo.svg" alt="Devshare Logo" />
      <span>DevShare</span>
    </div>
  );
};

export default Logo;
