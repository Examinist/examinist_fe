import React from "react";
import HorizontalStepper from "./Stepper";
import { Box } from "@mui/material";

export default function AutomaticExam() {
  return (
    <Box sx={{ width: "100%", px: 5, py: 5 }}>
      <HorizontalStepper isAutomatic={true} />
    </Box>
  );
}
