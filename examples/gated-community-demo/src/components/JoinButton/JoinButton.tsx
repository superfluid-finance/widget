import { FC, PropsWithChildren } from "react";

import WidgetWrapper from "../WidgetWrapper/WidgetWrapper";
import styles from "./JoinButton.module.css";

const JoinButton: FC<PropsWithChildren> = ({ children }) => (
  <WidgetWrapper>
    {(openWidget) => (
      <button className={styles.Button} onClick={openWidget}>
        {children}
      </button>
    )}
  </WidgetWrapper>
);

export default JoinButton;
