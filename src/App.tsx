import { createTheme, ThemeProvider } from '@mui/material';
import './App.css'
import AppRoutes from './app/routes/Routes'

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B84BF",
    },
    secondary: {
      main: "#6B6767",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App
