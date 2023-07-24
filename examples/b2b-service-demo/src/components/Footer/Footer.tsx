import { FC } from "react";

import styles from "./Footer.module.css";
import FooterSection from "./FooterSection/FooterSection";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className={styles.Wrapper}>
      <div className={styles.Content}>
        <div className={styles.Intro}>
          <img className={styles.Logo} src="/logo.svg" alt="Logo" />
          <p>The web3 development platform</p>
          <div className={styles.Social}>
            <img src="/social/facebook.svg" alt="Facebook button" />
            <img src="/social/instagram.svg" alt="Instagram button" />
            <img src="/social/twitter.svg" alt="Twitter icon" />
          </div>
        </div>
        <div className={styles.Links}>
          <FooterSection
            title="Products"
            links={["API", "SDK", "Supernode", "Webhooks"]}
          />
          <FooterSection
            title="For Developers"
            links={["Faucet", "Smart Contracts", "Docs"]}
          />
          <FooterSection
            title="Company"
            links={[
              "About us",
              "Privacy Policy",
              "Terms & Conditions",
              "Contact Us",
            ]}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
