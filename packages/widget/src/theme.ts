import { Theme, ThemeOptions } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

type ThemeMode = "light" | "dark";

type DefaultTypography = Theme["typography"];

interface TypographyCustomVariants {
  label: React.CSSProperties;
}

declare module "@mui/material/styles" {
  interface TypographyVariants extends TypographyCustomVariants {}
  interface TypographyVariantsOptions extends TypographyCustomVariants {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
}

export const ELEVATION1_BG = `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%)`;

export const buildThemeOptions = (mode: ThemeMode): ThemeOptions => {
  const themeWithDesignTokens = getCoreTheme(mode);

  return deepmerge(
    themeWithDesignTokens,
    getThemedComponents(mode, themeWithDesignTokens),
  );
};

const getModeStyleCB =
  (mode: ThemeMode) =>
  <T>(lightStyle: T, darkStyle: T): T =>
    mode === "dark" ? darkStyle : lightStyle;

interface CoreThemeOptions
  extends Required<
    Pick<
      ThemeOptions,
      "palette" | "shadows" | "transitions" | "breakpoints" | "shape"
    >
  > {
  typography: DefaultTypography;
}

const getCoreTheme = (mode: ThemeMode): CoreThemeOptions => {
  const getModeStyle = getModeStyleCB(mode);
  return {
    palette: {
      mode: mode,
      contrastThreshold: 2.7, // 2.7 to allow white on Superfluid green
      text: {
        primary: getModeStyle("#12141ede", "#FFFFFFFF"),
        secondary: getModeStyle("#656E78", "#FFFFFFC7"),
      },
      primary: {
        main: "#1DB227",
      },
      error: {
        main: getModeStyle("#D22525FF", "#F2685BFF"),
        dark: getModeStyle("#B80015FF", "#B80015FF"),
        light: getModeStyle("#FF5965FF", "#FF5965FF"),
        contrastText: getModeStyle("#FFFFFFFF", "#FFFFFFFF"),
      },
      warning: {
        main: getModeStyle("#F3A002FF", "#F3A002FF"),
        dark: getModeStyle("#BB7100FF", "#BB7100FF"),
        light: getModeStyle("#FFD149FF", "#FFD149FF"),
        contrastText: getModeStyle("#FFFFFFFF", "#000000DE"),
      },
      info: {
        main: getModeStyle("#8292ADFF", "#8292ADFF"),
        dark: getModeStyle("#DADADAFF", "#55647EFF"),
        light: getModeStyle("#B2C2DFFF", "#B2C2DFFF"),
        contrastText: getModeStyle("#FFFFFFFF", "#000000DE"),
      },
      success: {
        main: getModeStyle("#10BB35FF", "#10BB35FF"),
        dark: getModeStyle("#008900FF", "#008900FF"),
        light: getModeStyle("#5FEF66FF", "#5FEF66FF"),
        contrastText: getModeStyle("#FFFFFFFF", "#000000DE"),
      },
      background: {
        paper: getModeStyle("#FFFFFFFF", "#151619"),
        default: getModeStyle("#FFFFFFFF", "#151619"),
      },
      divider: getModeStyle("#E9EBEF", "#FFFFFF1F"),
    },
    typography: {
      fontSize: 16,
      htmlFontSize: 16,

      button: {
        textTransform: "none",
      },

      h1: {
        fontSize: "3.875rem",
        fontWeight: 500,
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
        fontWeight: 500,
        lineHeight: 1.5,
      },

      body2: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },

      caption: {
        fontSize: "0.875rem",
        lineHeight: 1.25,
        fontWeight: 400,
      },

      label: {
        fontSize: "0.75rem",
        lineHeight: 1.5,
        fontWeight: 400,
      },
    } as DefaultTypography,
    // TODO: Only elevation 1 is used, find a way to overwrite only the first one.
    shadows: [
      "none", // elevation 0
      getModeStyle("0px 0px 6px 3px rgba(204, 204, 204, 0.25)", "none"), // elevation 1
      getModeStyle(
        "0px 0px 30px -2px rgba(204, 204, 204, 0.4), 0px 0px 6px rgba(204, 204, 204, 0.25)",
        "none",
      ), // elevation 2
      getModeStyle(
        "0px 0px 3px -2px rgba(0, 0, 0, 0.2), 0px 0px 25px rgba(0, 0, 0, 0.14), 0px 0px 8px rgba(0, 0, 0, 0.12)",
        "0px 0px 3px -2px rgba(0, 0, 0, 0.2), 0px 0px 25px rgba(0, 0, 0, 0.14), 0px 0px 8px rgba(0, 0, 0, 0.12)",
      ), // elevation 3
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.15), 0px 0px 3px -2px rgba(0, 0, 0, 0.23), 0px 0px 25px rgba(0, 0, 0, 0.17)",
        "0px 0px 8px rgba(0, 0, 0, 0.15), 0px 0px 3px -2px rgba(0, 0, 0, 0.23), 0px 0px 25px rgba(0, 0, 0, 0.17)",
      ), // elevation 4
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.18), 0px 0px 3px -2px rgba(0, 0, 0, 0.26), 0px 0px 25px rgba(0, 0, 0, 0.2)",
        "0px 0px 8px rgba(0, 0, 0, 0.18), 0px 0px 3px -2px rgba(0, 0, 0, 0.26), 0px 0px 25px rgba(0, 0, 0, 0.2)",
      ), // elevation 5
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.21), 0px 0px 3px -2px rgba(0, 0, 0, 0.29), 0px 0px 25px rgba(0, 0, 0, 0.23)",
        "0px 0px 8px rgba(0, 0, 0, 0.21), 0px 0px 3px -2px rgba(0, 0, 0, 0.29), 0px 0px 25px rgba(0, 0, 0, 0.23)",
      ), // elevation 6
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.24), 0px 0px 3px -2px rgba(0, 0, 0, 0.32), 0px 0px 25px rgba(0, 0, 0, 0.26)",
        "0px 0px 8px rgba(0, 0, 0, 0.24), 0px 0px 3px -2px rgba(0, 0, 0, 0.32), 0px 0px 25px rgba(0, 0, 0, 0.26)",
      ), // elevation 7
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.27), 0px 0px 3px -2px rgba(0, 0, 0, 0.35), 0px 0px 25px rgba(0, 0, 0, 0.29)",
        "0px 0px 8px rgba(0, 0, 0, 0.27), 0px 0px 3px -2px rgba(0, 0, 0, 0.35), 0px 0px 25px rgba(0, 0, 0, 0.29)",
      ), // elevation 8
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.3), 0px 0px 3px -2px rgba(0, 0, 0, 0.38), 0px 0px 25px rgba(0, 0, 0, 0.32)",
        "0px 0px 8px rgba(0, 0, 0, 0.3), 0px 0px 3px -2px rgba(0, 0, 0, 0.38), 0px 0px 25px rgba(0, 0, 0, 0.32)",
      ), // elevation 9
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.33), 0px 0px 3px -2px rgba(0, 0, 0, 0.41), 0px 0px 25px rgba(0, 0, 0, 0.35)",
        "0px 0px 8px rgba(0, 0, 0, 0.33), 0px 0px 3px -2px rgba(0, 0, 0, 0.41), 0px 0px 25px rgba(0, 0, 0, 0.35)",
      ), // elevation 10
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.36), 0px 0px 3px -2px rgba(0, 0, 0, 0.44), 0px 0px 25px rgba(0, 0, 0, 0.38)",
        "0px 0px 8px rgba(0, 0, 0, 0.36), 0px 0px 3px -2px rgba(0, 0, 0, 0.44), 0px 0px 25px rgba(0, 0, 0, 0.38)",
      ), // elevation 11
      getModeStyle(
        "0px 0px 8px rgba(0, 0, 0, 0.39), 0px 0px 3px -2px rgba(0, 0, 0, 0.47), 0px 0px 25px rgba(0, 0, 0, 0.41)",
        "0px 0px 8px rgba(0, 0, 0, 0.39), 0px 0px 3px -2px rgba(0, 0, 0, 0.47), 0px 0px 25px rgba(0, 0, 0, 0.41)",
      ), // elevation 12
      getModeStyle(
        "0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
        "0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
      ), // elevation 13
      getModeStyle(
        "0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
        "0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
      ), // elevation 14
      getModeStyle(
        "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
        "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
      ), // elevation 15
      getModeStyle(
        "0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
        "0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
      ), // elevation 16
      getModeStyle(
        "0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
        "0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
      ), // elevation 17
      getModeStyle(
        "0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12);",
        "0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12);",
      ), // elevation 18
      getModeStyle(
        "0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
        "0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
      ), // elevation 19
      getModeStyle(
        "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
        "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
      ), // elevation 20
      getModeStyle(
        "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
        "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
      ), // elevation 21
      getModeStyle(
        "0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
        "0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
      ), // elevation 22
      getModeStyle(
        "0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
        "0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
      ), // elevation 23
      getModeStyle(
        "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
        "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
      ), // elevation 24
    ],
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(.55, 0, 0.1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 990,
        lg: 1200,
        xl: 1536,
      },
    },
    shape: {
      borderRadius: 20,
    },
  };
};

export function getThemedComponents(
  mode: ThemeMode,
  coreThemeOptions: CoreThemeOptions, // Core config can be used in components
): ThemeOptions {
  // This is used to handle light and dark themes
  const getModeStyle = getModeStyleCB(mode);

  const typography = coreThemeOptions.typography as DefaultTypography;

  return {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontVariantNumeric: "tabular-nums",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
          sizeLarge: {
            fontSize: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiLink: {
        defaultProps: {
          variant: "body1",
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          fontSizeSmall: {
            fontSize: "1.25rem",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          sizeSmall: {
            fontSize: "1.125rem",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          rounded: {
            borderRadius: "5px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            border: `1px solid ${coreThemeOptions.palette.divider}`,
          },
        },
      },
      MuiStepper: {
        styleOverrides: {
          horizontal: {
            justifyContent: "space-between",
            marginBottom: 12,
          },
        },
      },
      MuiStep: {
        styleOverrides: {
          vertical: {
            borderBottom: "1px solid",
            borderColor: coreThemeOptions.palette.divider,
            ":last-child": {
              border: "none",
            },
          },
          horizontal: {
            padding: 0,
          },
        },
      },
      MuiStepContent: {
        styleOverrides: {
          root: {
            borderLeft: "none",
            padding: 0,
            margin: 0,
          },
        },
      },
      MuiStepButton: {
        styleOverrides: {
          vertical: {
            margin: 0,
            padding: 0,
          },
          horizontal: {
            margin: 0,
            padding: 12,
            width: "auto",
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          text: {
            ...coreThemeOptions.typography.caption,
            fontWeight: 500,
          },
          root: {
            width: "1.5rem",
            height: "1.5rem",
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          vertical: {
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 28,
            paddingRight: 28,
          },
          label: {
            ...typography.subtitle2,
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            border: "none",
          },
        },
      },
    },
  };
}
