import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnlineExamsImage from "../../../../assets/images/OnlineExamsImage";

const RightColumn = () => (
  <Box
    sx={{
      backgroundColor: "#1B84BF",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "1rem",
      }}
    >
      <OnlineExamsImage />
      <Box
        sx={{
          color: "white",
          fontSize: "4rem",
          fontWeight: "bold",
        }}
      >
        Examinist
      </Box>
      <Box
        sx={{
          color: "white",
          fontSize: "2.5rem",
        }}
      >
        Examination made easy
      </Box>
    </Box>
  </Box>
);

const LeftColumn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const signin = () => {
    navigate("/instructor/courses");
  };

  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
          <Box
            sx={{
              color: "#1B84BF",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Box>
          <Box sx={{ color: "#6b7280" }}>
            Use your academic email and password to sign in to Examinist
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Button
          sx={{
            color: "white",
            fontSize: "1rem",
            backgroundColor: "#1B84BF",
          }}
          variant="contained"
          onClick={signin}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

const Signin = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={6} md={6}>
          <LeftColumn />
        </Grid>
        <Grid item xs={6} md={6}>
          <RightColumn />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signin;
