import { ThemeProvider } from "@mui/material";
import axios from "axios";
import "./App.css";
import { AuthProvider } from "./app/context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./app/routes/Routes";
import theme from "./assets/theme";

// axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
