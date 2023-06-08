import { useEffect } from "react";
import { ThemeOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const FONT_WEIGHT_CONFIG = {
  "400": "regular",
  "500": "500",
  "600": "600",
};

export const FONT_WEIGHTS = Object.keys(FONT_WEIGHT_CONFIG);

const useFontLoader = (fontFamily?: string) => {
  useEffect(() => {
    if (!fontFamily) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily
      .split(",")[0]
      .replace("'", "")
      .trim()}:wght@${FONT_WEIGHTS.join(";")}&display=swap`;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [fontFamily]);
};

export default useFontLoader;
