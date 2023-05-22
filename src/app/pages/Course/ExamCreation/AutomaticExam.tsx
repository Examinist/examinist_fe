import React, { Dispatch, SetStateAction } from "react";
import HorizontalStepper from "./Stepper";
import { Box, Typography } from "@mui/material";
import { IAutomaticExamDetails } from "./Models";
import { IQuestion } from "../../../types/Question";
import { IExamQuestion } from "../../../types/Exam";
import { ITopic } from "../../../types/CourseSettings";
import theme from "../../../../assets/theme";

interface IAutomaticExamContext {
  automaticExamState: IAutomaticExamDetails;
  setAutomaticExamState: Dispatch<SetStateAction<IAutomaticExamDetails>>;
}

export const AutomaticExamContext = React.createContext<IAutomaticExamContext>({
  automaticExamState: {},
  setAutomaticExamState: () => {},
});

export default function AutomaticExam() {
  const [automaticExamState, setAutomaticExamState] =
    React.useState<IAutomaticExamDetails>({
      title: "",
      duration: 30,
      is_auto: false,
      is_multiple_models: false,
      questions: new Map<string, IExamQuestion[]>(),
      topics: new Map<string, number[]>(),
    });

  const contextValue: IAutomaticExamContext = {
    automaticExamState: automaticExamState,
    setAutomaticExamState: setAutomaticExamState,
  };

  return (
    <Box sx={{ width: "100%", px: 5, py: 5 }}>
      <AutomaticExamContext.Provider value={contextValue}>
        <Typography
          variant="h5"
          color={theme.palette.text.primary}
          sx={{ fontWeight: 700, py: 2 }}
        >
          Automatic Exam
        </Typography>
        <HorizontalStepper isAutomatic={true} />
      </AutomaticExamContext.Provider>
    </Box>
  );
}
