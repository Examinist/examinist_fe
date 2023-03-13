import { ThemeProvider } from '@mui/material';
import './App.css'
import AppRoutes from './app/routes/Routes'
import theme from './assets/theme';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
