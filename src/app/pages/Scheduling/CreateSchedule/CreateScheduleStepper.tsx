import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useContext } from "react";
import theme from "../../../../assets/theme";
import { IScheduleContext, ScheduleContext } from "./ScheduleContext";

interface IStepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
  stepsNextActions: (() => void)[];
}
export default function CreateScheduleStepper({
  activeStep,
  setActiveStep,
  steps,
  stepsNextActions,
}: IStepperProps) {
  const {loading} = useContext<IScheduleContext>(ScheduleContext);
  const handleNext = () => {
    stepsNextActions[activeStep]();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "15px",
        py: 3,
        px: 5,
      }}
    >
      <Stepper activeStep={activeStep} sx={{ py: 4, px: "5%" }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            sx={{ mr: 1 }}
            
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} sx={{ ml: 1 }} disabled={loading}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                ml: "auto",
                borderRadius: 3,
                boxShadow: 0,
                height: "fit-content",
                alignSelf: "center",
                fontWeight: 650,
              }}
              onClick={handleNext}
              disabled={loading}
            >
              Submit
            </Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
}
