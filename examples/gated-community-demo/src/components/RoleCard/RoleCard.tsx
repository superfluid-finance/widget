import { FC } from "react";

import Badge from "../Badge/Badge";
import WidgetWrapper from "../WidgetWrapper/WidgetWrapper";
import styles from "./RoleCard.module.css";

interface RoleCardProps {
  title: string;
  members: string;
  description: string;
  requirements: string[];
}

const RoleCard: FC<RoleCardProps> = ({
  title,
  description,
  requirements,
  members,
}) => (
  <div className={styles.Card}>
    <div className={styles.Left}>
      <div className={styles.TitleWrapper}>
        <h4>{title}</h4>
        <Badge iconUrl="/icons/users.svg">{members}</Badge>
      </div>
      <p>{description}</p>
    </div>

    <WidgetWrapper>
      {(openWidget) => (
        <div className={styles.Right} onClick={openWidget}>
          <h5>Requirements to qualify</h5>
          <ul className={styles.Requirements}>
            {requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
      )}
    </WidgetWrapper>
  </div>
);

export default RoleCard;
