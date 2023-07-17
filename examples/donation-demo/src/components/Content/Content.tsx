import {
  FC,
  PropsWithChildren,
  createRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./Content.module.css";

interface ContentProps extends PropsWithChildren {
  lineHeight?: number;
}

const Content: FC<ContentProps> = ({ lineHeight = 24, children }) => {
  const containerRef = createRef<HTMLDivElement>();

  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;
    setHeight(containerRef.current?.clientHeight);

    function handleResize() {
      setHeight(containerRef.current?.clientHeight);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  const lines = useMemo(() => {
    if (!height) return new Array();
    console.log({ height });
    return new Array(Math.ceil(height / lineHeight)).fill(null);
  }, [height]);

  return (
    <div
      className={styles.ContentWrapper}
      style={{ lineHeight: `${lineHeight}px` }}
    >
      <div className={styles.ContentNumbers}>
        {lines.map((line, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      <div ref={containerRef}>{children}</div>
    </div>
  );
};

export default Content;
