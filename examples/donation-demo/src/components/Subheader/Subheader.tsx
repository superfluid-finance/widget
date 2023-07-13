import { FC, PropsWithChildren } from "react";
import styles from "./Subheader.module.css";
import Chip from "../Chip/Chip";

interface SubheaderLinkProps extends PropsWithChildren {
  iconUrl: string;
}

const SubheaderLink: FC<SubheaderLinkProps> = ({ iconUrl, children }) => {
  return (
    <div className={styles.SubheaderLink}>
      <img src={iconUrl} alt="Social Logo" />
      <span>{children}</span>
    </div>
  );
};

interface SubHeaderProps {}

const Subheader: FC<SubHeaderProps> = ({}) => {
  return (
    <div className={styles.SubHeader}>
      <div>
        <h2>BlockchainBites</h2>
        <div className={styles.Tags}>
          <Chip>Education</Chip>
          <Chip>Community</Chip>
        </div>
      </div>

      <div className={styles.Links}>
        <SubheaderLink iconUrl="/icon/ethereum.svg">
          0x85f6...1f7g
        </SubheaderLink>
        <SubheaderLink iconUrl="/icon/copy.svg">0xbite</SubheaderLink>
        <SubheaderLink iconUrl="/icon/twitter.svg">
          blockchainbites.xyz
        </SubheaderLink>
        <SubheaderLink iconUrl="/icon/lens.svg">0xbite.lens</SubheaderLink>
      </div>
    </div>
  );
};

export default Subheader;
