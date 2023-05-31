import { useEffect } from "react";
import { DisplaySettings } from "../components/widget-preview/WidgetPreview";
import { FONT_WEIGHTS } from "./useFonts";

const useFontLoader = (displaySettings: DisplaySettings) => {
  useEffect(() => {
    if (displaySettings.font.config?.family === undefined) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${
      displaySettings.font.config?.family
    }:wght@${FONT_WEIGHTS.join(";")}&display=swap`;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [displaySettings.font.config?.family]);
};

export default useFontLoader;
