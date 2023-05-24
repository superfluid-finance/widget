import { useEffect } from "react";
import { DisplaySettings } from "../components/widget-preview/WidgetPreview";

const useFontLoader = (displaySettings: DisplaySettings) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${displaySettings.font.config?.family}:wght@400;500&display=swap`;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [displaySettings.font.config?.family]);
};

export default useFontLoader;
