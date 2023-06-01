import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red, lightGreen } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#1DB227",
      light: "#ECFAEF",
      dark: "#16891D",
    },
    secondary: {
      main: "#19857b",
    },
    warning: {
      main: "#F3A002",
      light: "#FDF1D9",
    },
    error: {
      main: "#D22525",
      light: "#FBE6E7",
    },
    grey: {
      "100": "#DBDEE2",
      "500": "#8995A1",
      "700": "#656E78",
      "900": "#2E3A47",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
