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
      light: "#F5F5F5", //background
      dark: "#6B6767",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

export default theme;