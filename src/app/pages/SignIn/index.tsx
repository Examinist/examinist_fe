import { Box, Button, Grid, TextField } from "@mui/material";
import RightColumn from "./components/RightColumn";
import SignInForm from "./components/SignInForm";


const Signin = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={6} md={6}>
          <SignInForm />
        </Grid>
        <Grid item xs={6} md={6}>
          <RightColumn />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signin;
