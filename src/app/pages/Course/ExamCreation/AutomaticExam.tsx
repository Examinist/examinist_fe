import React from "react";
import HorizontalStepper from "./Stepper";
import { Box } from "@mui/material";
import { IAutomaticExamDetails } from "./Models";

export default function AutomaticExam() {
  const [examState,setExamState] = React.useState<IAutomaticExamDetails>();

  return (
    <Box sx={{ width: "100%", px: 5, py: 5 }}>
      <HorizontalStepper isAutomatic={true} />
    </Box>
  );
}
