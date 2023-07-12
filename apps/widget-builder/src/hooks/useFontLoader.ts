import { useEffect } from "react";
import { DisplaySettings } from "../components/widget-preview/WidgetPreview";
import { FONT_WEIGHTS } from "./useFontOptions";

const useFontLoader = (fontFamily?: string) => {
  useEffect(() => {
    if (!fontFamily) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${FONT_WEIGHTS.join(
      ";",
    )}&display=swap`;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [fontFamily]);
};

export default useFontLoader;
