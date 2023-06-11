import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import theme from "../../../../assets/theme";

const steps = ["Set Schedule's Info", "Schedule Exams"];

export default function CreateSchedule() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", px: 5, py: 4 }}>
      <Box
        sx={{
          fontSize: "1.9rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
          pb: 5,
          pl: 1
        }}
      >
        Create Schedule
      </Box>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "15px",
          py: 3,
          px: 5,
        }}
      >
        <Stepper activeStep={activeStep} sx={{ py: 4, px: 20 }}>
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
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ ml: 1, borderRadius: 3, boxShadow: 0 }}
              >
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} sx={{ ml: 1 }}>
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Box>
    </Box>
  );
}
