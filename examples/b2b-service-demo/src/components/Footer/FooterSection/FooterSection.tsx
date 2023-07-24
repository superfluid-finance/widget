import { FC } from "react";

import styles from "./FooterSection.module.css";

interface FooterSectionProps {
  title: string;
  links: string[];
}

const FooterSection: FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <div className={styles.FooterSection}>
      <div className={styles.Title}>{title}</div>
      <ul className={styles.FooterList}>
        {links.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
