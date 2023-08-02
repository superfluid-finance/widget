import Link from "next/link";
import { FC } from "react";

import Badge from "../Badge/Badge";
import styles from "./CommunityCard.module.css";

interface CommunityCardProps {
  title: string;
  imgSrc: string;
  roles: number;
  users: string;
  hasAccess?: boolean;
}

const CommunityCard: FC<CommunityCardProps> = ({
  title,
  imgSrc,
  roles,
  users,
  hasAccess,
}) => {
  return (
    <Link href="/community" className={styles.Card}>
      <img src={imgSrc} />
      <div className={styles.CardContent}>
        <h4>{title}</h4>
        <div className={styles.Badges}>
          {!hasAccess && <Badge secondary>Access closed</Badge>}
          <Badge secondary={!hasAccess} iconUrl="/icons/users.svg">
            {users}
          </Badge>
          <Badge secondary={!hasAccess} iconUrl="/icons/role.svg">
            {roles} role
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
