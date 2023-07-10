import { FC } from "react";
import styles from "./Footer.module.css";
import FooterSection from "./FooterSection/FooterSection";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className={styles.Wrapper}>
      <div className={styles.Intro}>
        <img src="/logo.svg" />
        <p>The web3 development platform</p>
        <div className={styles.Social}>
          <img src="/social/facebook.svg" />
          <img src="/social/instagram.svg" />
          <img src="/social/twitter.svg" />
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
    </footer>
  );
};

export default Footer;
