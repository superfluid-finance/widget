import { useEffect, useState } from "react";
import { Font } from "../types/general";

const FONT_WEIGHT_CONFIG = {
  "400": "regular",
  "500": "500",
  "600": "600",
};

export const FONT_WEIGHTS = Object.keys(FONT_WEIGHT_CONFIG);
const FONT_WEIGHT_VARIANTS = Object.values(FONT_WEIGHT_CONFIG);

function fontHasRequiredWeights(font: Font): boolean {
  return FONT_WEIGHT_VARIANTS.every((weight) => font.variants.includes(weight));
}

const useFonts = () => {
  const [fonts, setFonts] = useState<Font[]>([]);

  useEffect(() => {
    const effect = async () => {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`
      );

      const { items } = await response.json();

      if (items) {
        setFonts(items.filter(fontHasRequiredWeights));
      }
    };

    effect();
  }, []);

  return fonts;
};

export default useFonts;
