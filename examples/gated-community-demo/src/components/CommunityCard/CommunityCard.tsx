import Link from "next/link";
import { FC, PropsWithChildren } from "react";

import Badge from "../Badge/Badge";
import styles from "./CommunityCard.module.css";

interface CommunityCardWrapperProps extends PropsWithChildren {
  hasAccess?: boolean;
}

const CommunityCardWrapper: FC<CommunityCardWrapperProps> = ({
  hasAccess,
  children,
}) =>
  !hasAccess ? (
    <div className={`${styles.Card} ${styles.NoAccess}`}>{children}</div>
  ) : (
    <Link href="/community" className={styles.Card}>
      {children}
    </Link>
  );

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
    <CommunityCardWrapper hasAccess={hasAccess}>
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
    </CommunityCardWrapper>
  );
};

export default CommunityCard;
