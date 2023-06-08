import { useEffect } from "react";

const useFontLoader = (fontFamily?: string) => {
  useEffect(() => {
    if (!fontFamily) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily
      .split(",")[0]
      .replace(/'/g, "")
      .trim()}:wght@400;500;600&display=swap`;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [fontFamily]);
};

export default useFontLoader;
