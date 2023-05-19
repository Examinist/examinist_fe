import React, { Dispatch, SetStateAction } from "react";
import HorizontalStepper from "./Stepper";
import { Box } from "@mui/material";
import { IAutomaticExamDetails } from "./Models";
import { IQuestion } from "../../../types/Question";
import { IExamQuestion } from "../../../types/Exam";


interface IAutomaticExamContext {
  automaticExamState: IAutomaticExamDetails;
  setAutomaticExamState: Dispatch<SetStateAction<IAutomaticExamDetails>>;
}

export const AutomaticExamContext = React.createContext<IAutomaticExamContext>({
  automaticExamState: {},
  setAutomaticExamState: () => {},
});


export default function AutomaticExam() {
  const [automaticExamState,setAutomaticExamState] = React.useState<IAutomaticExamDetails>(
  {
    title: "",
    duration: 30,
    is_auto: false,
    is_multiple_models: false,
    questions: new Map<string, IExamQuestion[]>(),
  });

  const contextValue: IAutomaticExamContext = {
    automaticExamState: automaticExamState,
    setAutomaticExamState: setAutomaticExamState,
  };

 
  return (
    <Box sx={{ width: "100%", px: 5, py: 5 }}>
      <AutomaticExamContext.Provider value={contextValue}>
          <HorizontalStepper isAutomatic={true} />
      </AutomaticExamContext.Provider>
    </Box>
  );
}
