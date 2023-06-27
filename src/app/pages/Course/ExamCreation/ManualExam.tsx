import { Box, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import HorizontalStepper from "./Stepper";
import { IExamContext, IManualExamDetails, examContext } from "./Models";
import { IExamQuestion } from "../../../types/Exam";
import theme from "../../../../assets/theme";


export default function ManualExam() {
  const [examState, setExamState] = React.useState<IManualExamDetails>({
    title: "",
    duration: 30,
    is_auto: false,
    has_models: false,
    questions: new Map<string, IExamQuestion[]>(),
  });

  const contextValue: IExamContext = {
    examState: examState,
    setExamState: setExamState,
  };

  return (
    <Box sx={{ width: "100%", px: 5, py: 4 }}>
      <Box
        sx={{
          pl: 10,
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
          pb: 5,
        }}
      >
        Manual Exam
      </Box>
      <examContext.Provider value={contextValue}>
        <HorizontalStepper isAutomatic={false} />
      </examContext.Provider>
    </Box>
  );
}
