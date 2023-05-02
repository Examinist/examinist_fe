import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    gray: Palette["primary"];
    white: Palette["primary"];
    yellow: Palette["primary"];
    green: Palette["primary"];
    red: Palette["primary"];
  }

  interface PaletteOptions {
    gray: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
    yellow: PaletteOptions["primary"];
    green: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B84BF",
      light:"#5FA5CD"
    },
    secondary: {
      main: "#6B6767",
    },
    gray: {
      main: "#CFCCCC",
      light: "#DDDDDD",
      dark: "#6B6767",
    },
    background: {
      default: "#F5F5F5",
    },
    white: {
      main:"#FFFFFF",
    },
    yellow: {
      main:"#F9C74F",
    },
    green: {
      main:"#90BE6D",
    },
    red: {
      main:"#F94144",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
  MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
        },
      },
    },
  },
});

export default theme;