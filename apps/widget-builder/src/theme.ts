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
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#D22525",
      light: "#FBE6E7",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
