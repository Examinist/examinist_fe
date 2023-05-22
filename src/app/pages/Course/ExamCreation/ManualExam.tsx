import { Box, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import HorizontalStepper from "./Stepper";
import { IManualExamDetails } from "./Models";
import { IExamQuestion } from "../../../types/Exam";
import theme from "../../../../assets/theme";

interface IManualExamContext {
  examState: IManualExamDetails;
  setExamState: Dispatch<SetStateAction<IManualExamDetails>>;
}

export const ManualExamContext = React.createContext<IManualExamContext>({
  examState: {},
  setExamState: () => {},
});

export default function ManualExam() {
  const [examState, setExamState] = React.useState<IManualExamDetails>({
    title: "",
    duration: 30,
    is_auto: false,
    is_multiple_models: false,
    questions: new Map<string, IExamQuestion[]>(),
  });

  const contextValue: IManualExamContext = {
    examState: examState,
    setExamState: setExamState,
  };

  return (
    <Box sx={{ width: "100%", px: 5, py: 5 }}>
      <Typography
        variant="h5"
        color={theme.palette.text.primary}
        sx={{ fontWeight: 700 ,py:2}}
      >
        Manual Exam
      </Typography>
      <ManualExamContext.Provider value={contextValue}>
        <HorizontalStepper isAutomatic={false} />
      </ManualExamContext.Provider>
    </Box>
  );
}
