import SubscribeButton from "../SubscribeButton/SubscribeButton";
import styles from "./SubBox.module.css";

const SubBox = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Caption}>Total contributions</div>
      <h2>$698.98/mo</h2>
      <hr />
      <span className={styles.Caption}>
        Supporters: <b>199</b>
      </span>
      <SubscribeButton />
    </div>
  );
};

export default SubBox;
