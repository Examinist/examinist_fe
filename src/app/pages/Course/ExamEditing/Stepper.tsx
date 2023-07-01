import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import theme from "../../../../assets/theme";
import { Stack } from "@mui/material";
import ExamInfo from "./ExamInfo";
import QuestionsBody from "./QuestionsBody";
import Summary from "./Summary";
import { updateContext } from "./EditExam";
import { examContext } from "../ExamCreation/Models";

import {
  IExamPayload,
  IExamQuestionPayload,
  updateExamApi,
} from "../../../services/APIs/ExamAPIs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";

const steps = ["Exam General Info", "Exam Questions", "Submit Exam"];

export default function HorizontalStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const { examState } = React.useContext(examContext);
  const { updateState } = React.useContext(updateContext);

  const { courseId } = useParams<{ courseId: string }>();
  const { setAlertState } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { examId } = useParams<{ examId: string }>();

  const navigateToExamsPage = () => {
    const pathname = location.pathname;
    const firstPart = pathname.split("/")[1];
    const path = `/${firstPart}/courses/${courseId}/exams`;
    navigate(`/${firstPart}/courses/${courseId}/exams`);
  };

  const flattenQuestionsMap = () => {
    const questionsMap = examState.questions;
    let examQuestionsList: IExamQuestionPayload[] = [];
    Array.from(questionsMap?.entries() ?? []).map(([key, questionsList]) => {
      questionsList.map((question) => {
        examQuestionsList.push({
          question_id: question.question.id,
          score: question.score,
        });
      });
    });
    return examQuestionsList;
  };

  const handleSubmit = () => {
    const exam = examState;
    const examPayload: IExamPayload = {
      title: exam.title,
      duration: exam.duration,
      course_id: parseInt(courseId!),
      is_auto: exam.is_auto,
      has_models: exam.has_models,
      exam_questions_attributes: updateState.exam_questions_attributes,
    };
    updateExamApi(parseInt(examId!), examPayload)
      .then(() => {
        setAlertState({
          open: true,
          message: "Exam Updated Successfully",
          severity: "success",
        });
        navigateToExamsPage();
      })
      .catch(({ response: { statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText,
          severity: "error",
        });
      });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack
      sx={{ justifyContent: "center", alignItems: "center", px: 10 }}
      spacing={2}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "15px",
          py: 3,
          px: 5,
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
            <Button onClick={handleNext} disabled={disabled}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
      {activeStep === 0 ? (
        <ExamInfo setDisabled={setDisabled} />
      ) : activeStep === 1 ? (
        <QuestionsBody setDisabled={setDisabled} />
      ) : (
        <Summary />
      )}
    </Stack>
  );
}
