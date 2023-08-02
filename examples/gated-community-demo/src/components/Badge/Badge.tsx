import { FC, PropsWithChildren } from "react";

import styles from "./Badge.module.css";

interface BadgeProps extends PropsWithChildren {
  iconUrl?: string;
  secondary?: boolean;
}

const Badge: FC<BadgeProps> = ({ iconUrl, secondary, children }) => (
  <div className={`${styles.Badge} ${secondary ? styles.Disabled : ""}`}>
    {iconUrl && <img src={iconUrl} />}
    {children}
  </div>
);

export default Badge;
