import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import theme from "../../../../assets/theme";
import { Stack } from "@mui/material";
import ManualInfo from "./ManualInfo";
import AutomaticInfo from "./AutomaticInfo";
import QuestionBankDialog from "./QuestionBankDialog";
import QuestionsList from "./QuestionsList";
import QuestionBank from "../QuestionBank/QuestionBank";
import QuestionsBody from "./QuestionsBody";
import Summary from "./Summary";

const steps = ["Exam General Info", "Exam Questions", "Submit Exam"];

export default function HorizontalStepper({ isAutomatic = false }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === steps.length - 1){
      alert("Exam Created Successfully");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }} spacing={2}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "15px",
        }}
      >
        <Stepper activeStep={activeStep} sx={{ p: "20px" }}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Sumbit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
      {activeStep === 0 ? (
        isAutomatic ? (
          <AutomaticInfo />
        ) : (
          <ManualInfo />
        )
      ) : activeStep === 1 ? (
        <QuestionsBody isAutomatic={isAutomatic} />
      ) : (
        <Summary isAutomatic={isAutomatic} />
      )}
    </Stack>
  );
}
