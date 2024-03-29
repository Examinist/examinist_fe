import { Alert, ThemeProvider } from "@mui/material";
import axios from "axios";
import "./App.css";
import { AuthProvider } from "./app/context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./app/routes/Routes";
import theme from "./assets/theme";
import AlertProvider from "./app/context/AlertProvider";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AlertProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </AlertProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
