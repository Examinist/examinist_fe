import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    gray: Palette["primary"];
  }

  interface PaletteOptions {
    gray: PaletteOptions["primary"];
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
  },
});

export default theme;