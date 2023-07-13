import { createTheme } from "@mui/material/styles";
import { Noto_Sans } from "next/font/google";
import type {} from "@mui/lab/themeAugmentation";

export const notoSans = Noto_Sans({
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
      contrastText: "#fff",
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
      "800": "#656E78",
      "900": "#2E3A47",
    },
    text: {
      primary: "#000",
      secondary: "#656E78",
    },
    background: {
      default: "#EAEFF4",
    },
    divider: "#DBDEE2",
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    fontFamily: notoSans.style.fontFamily,

    button: {
      textTransform: "none",
    },

    h1: {
      fontSize: "3.375rem",
      fontWeight: 700,
      lineHeight: 1,
    },

    h2: {
      fontSize: "2.625rem",
      fontWeight: 500,
      lineHeight: 1,
    },

    h3: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },

    h4: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },

    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },

    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },

    subtitle2: {
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },

    body2: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },

    caption: {
      fontSize: "0.875rem",
      lineHeight: 1.25,
      fontWeight: 400,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        translate: "yes",
      },
      styleOverrides: {
        sizeLarge: {
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        },
        outlinedSizeLarge: {
          paddingTop: "0.6875rem",
          paddingBottom: "0.6875rem",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: 1.5,
          fontWeight: 500,
          color: "#000",
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 28,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          fontSize: "1rem",
        },
      },
    },
  },
});

export default theme;
