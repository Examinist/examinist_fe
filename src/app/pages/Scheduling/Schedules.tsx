import { Box, Button } from "@mui/material";
import React from "react";
import theme from "../../../assets/theme";
import { useNavigate } from "react-router-dom";

export default function Schedules() {
  const navigate = useNavigate();
  return (
    <Box sx={{ px: 12, py: 5 }}>
      <Box display="flex">
        <Box
          sx={{
            fontSize: "2.3rem",
            fontWeight: "medium",
            fontFamily: "montserrat",
          }}
        >
          Schedules
        </Box>
        <Button
          variant="outlined"
          sx={{
            color: "#1B84BF",
            backgroundColor: theme.palette.white.main,
            ml: "auto",
            border: 1,
            fontSize: "14px",
            fontWeight: "bold",
            px: 4,
            borderRadius: "20px",
          }}
          onClick={() => {navigate("./new")}}
        >
          Create Schedule
        </Button>
      </Box>
    </Box>
  );
}
