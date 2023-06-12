import * as React from "react";
import Box from "@mui/material/Box";
import theme from "../../../../assets/theme";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import ScheduleInfo from "./StepOne/ScheduleInfo";
import ScheduleExams from "./StepTwo/ScheduleExams";
import CreateScheduleStepper from "./CreateScheduleStepper";
import { IScheduleContext, ScheduleContext } from "./ScheduleContext";
import { useRef, useState } from "react";
import { IExam } from "../../../types/Exam";
const steps = ["Set Schedule's Info", "Schedule Exams", "Submit"];
// const components = [<ScheduleInfo />, <ScheduleExams />];

export default function CreateSchedule() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [title, setTitle] = useState<string>("");
  const [exams, setExams] = useState<IExam[]>([]);
  const stepOneFormRef = useRef<any>();
  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);}
  const components = [
    <ScheduleInfo reference={stepOneFormRef} onSuccess={nextStep}/>,
    <ScheduleExams />,
    <div></div>
  ];
  const stepsNextActions = [
    () => {
      stepOneFormRef.current?.submitForm();
    },
    () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },
    () =>{ setActiveStep((prevActiveStep) => prevActiveStep + 1)}
  ];

  const contextValue: IScheduleContext = {
    title: title,
    setTitle: setTitle,
    exams: exams,
    setExams: setExams,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        px: "5%",
        py: 4,
      }}
    >
      <Box display="flex" sx={{ gap: 2 }}>
        <IconButton
          aria-label="back"
          size="large"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosNewIcon
            sx={{ color: theme.palette.text.primary }}
            fontSize="inherit"
          />
        </IconButton>
        <Box
          sx={{
            fontSize: "1.9rem",
            fontWeight: "medium",
          }}
        >
          Create Schedule
        </Box>
      </Box>
      <CreateScheduleStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
        stepsNextActions={stepsNextActions}
      />
      <ScheduleContext.Provider value={contextValue}>
        {components[activeStep]}
      </ScheduleContext.Provider>
    </Box>
  );
}
