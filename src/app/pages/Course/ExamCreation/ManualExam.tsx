import { Box } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import HorizontalStepper from "./Stepper";
import { IManualExamDetails } from "./Models";
import { IExamQuestion } from "../../../types/Exam";

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
    duration: 0,
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
      <ManualExamContext.Provider value={contextValue}>
        <HorizontalStepper isAutomatic={false} />
      </ManualExamContext.Provider>
    </Box>
  );
}
