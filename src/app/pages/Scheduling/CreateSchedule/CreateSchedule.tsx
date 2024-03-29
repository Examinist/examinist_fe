import * as React from "react";
import Box from "@mui/material/Box";
import theme from "../../../../assets/theme";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import ScheduleInfoForm from "./Step1/ScheduleInfoForm";
import ScheduleExamsForm from "./Step2/ScheduleExamsForm";
import CreateScheduleStepper from "./CreateScheduleStepper";
import { IScheduleContext, ScheduleContext } from "./ScheduleContext";
import { useRef, useState } from "react";
import { IExam } from "../../../types/Exam";
const steps = ["Set Schedule's Info", "Schedule Exams"];

export default function CreateSchedule() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [title, setTitle] = useState<string>("");
  const [exams, setExams] = useState<IExam[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const stepOneFormRef = useRef<any>();
  const stepTwoFormRef = useRef<any>();

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const components = [
    <ScheduleInfoForm reference={stepOneFormRef} onSuccess={nextStep} />,
    <ScheduleExamsForm reference={stepTwoFormRef} onSuccess={nextStep}/>
  ]

  const stepsNextActions = [
    () => {
      stepOneFormRef.current?.submitForm();
    },
    () => {
      stepTwoFormRef.current?.submitForm();
    },
  ];

  const contextValue: IScheduleContext = {
    title: title,
    setTitle: setTitle,
    exams: exams,
    setExams: setExams,
    loading: loading,
    setLoading: setLoading,
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

      <ScheduleContext.Provider value={contextValue}>
        <CreateScheduleStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
          stepsNextActions={stepsNextActions}
        />
        {components[activeStep]}
      </ScheduleContext.Provider>
    </Box>
  );
}
