import { Box, Button } from "@mui/material";
import React from "react";
import theme from "../../../assets/theme";

export default function Schedules() {
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
            fontSize: "16px",
            fontWeight: "bold",
            px: 4,
            borderRadius: "20px",
          }}
        >
          Create Schedule
        </Button>
      </Box>
    </Box>
  );
}
