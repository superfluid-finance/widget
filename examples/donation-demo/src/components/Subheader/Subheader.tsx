import Link from "next/link";
import { FC, PropsWithChildren } from "react";

import Chip from "../Chip/Chip";
import IconLink from "../IconLink/IconLink";
import styles from "./Subheader.module.css";

const Subheader = () => {
  return (
    <>
      <Link href="/" className={styles.BackButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="12"
          viewBox="0 0 21 12"
          fill="none"
        >
          <path
            d="M20 6.75C20.4142 6.75 20.75 6.41421 20.75 6C20.75 5.58579 20.4142 5.25 20 5.25V6.75ZM0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM20 5.25H1V6.75H20V5.25Z"
            fill="#1F2DF6"
          />
        </svg>
        <span>Go back to projects</span>
      </Link>
      <div className={styles.SubHeader}>
        <div>
          <h2>BlockchainBites</h2>
          <div className={styles.Tags}>
            <Chip>Education</Chip>
            <Chip>Community</Chip>
          </div>
        </div>

        <div className={styles.Links}>
          <IconLink iconUrl="/icon/ethereum.svg">0x85f6...1f7g</IconLink>
          <IconLink iconUrl="/icon/copy.svg">0xbite</IconLink>
          <IconLink iconUrl="/icon/twitter.svg">blockchainbites.xyz</IconLink>
          <IconLink iconUrl="/icon/lens.svg">0xbite.lens</IconLink>
        </div>
      </div>
    </>
  );
};

export default Subheader;
