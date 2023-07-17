import { FC } from "react";
import styles from "./ProjectCard.module.css";
import Link from "next/link";
import IconLink from "../IconLink/IconLink";

interface ProjectCardProps {
  title: string;
  imgUrl: string;
  description: string;
  websiteUrl: string;
  totalContributions: number;
  active?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  imgUrl,
  description,
  websiteUrl,
  totalContributions,
  active = false,
}) => {
  return (
    <div className={`${styles.ProjectCard} ${!active ? styles.Inactive : ""}`}>
      {active ? (
        <Link href="/project">
          <img className={styles.Image} src={imgUrl} alt="" />
        </Link>
      ) : (
        <img className={styles.Image} src={imgUrl} alt="" />
      )}

      <div className={styles.ProjectCardContent}>
        <h3>{title}</h3>
        <IconLink iconUrl="/icon/copy.svg">{websiteUrl}</IconLink>

        <p>{description}</p>
        <hr />
        <div className={styles.Contributions}>
          <span>Total contributions</span>
          <h3>${totalContributions}/mo</h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
