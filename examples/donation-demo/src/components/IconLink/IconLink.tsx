import { FC, PropsWithChildren } from "react";
import styles from "./IconLink.module.css";

interface IconLinkProps extends PropsWithChildren {
  iconUrl: string;
}

const IconLink: FC<IconLinkProps> = ({ iconUrl, children }) => {
  return (
    <div className={styles.IconLink}>
      <img src={iconUrl} alt="Social Logo" />
      <span>{children}</span>
    </div>
  );
};

export default IconLink;
