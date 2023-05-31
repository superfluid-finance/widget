import { useEffect, useState } from "react";
import { Font } from "../types/general";

const useFonts = () => {
  const [fonts, setFonts] = useState<Font[]>([]);

  useEffect(() => {
    const effect = async () => {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`
      );

      const { items } = await response.json();

      if (items) {
        setFonts(items);
      }
    };

    effect();
  }, []);

  return fonts;
};

export default useFonts;
