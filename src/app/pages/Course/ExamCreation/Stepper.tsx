import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import theme from "../../../../assets/theme";
import { Stack } from "@mui/material";
import ManualInfo from "./ManualInfo";
import AutomaticInfo from "./AutomaticInfo";
import QuestionsBody from "./QuestionsBody";
import Summary from "./Summary";
import { ManualExamContext } from "./ManualExam";
import { AutomaticExamContext } from "./AutomaticExam";
import {
  IAutoGeneratePayload,
  IExamPayload,
  IExamQuestionPayload,
  IExamResponse,
  IQuestionTypeTopics,
  autoGenerateExamApi,
  createExamApi,
} from "../../../services/APIs/ExamAPIs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";
import { IExamQuestion, IExamQuestionsGroup } from "../../../types/Exam";

const steps = ["Exam General Info", "Exam Questions", "Submit Exam"];

export default function HorizontalStepper({ isAutomatic = false }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const { examState } = React.useContext(ManualExamContext);
  const { automaticExamState, setAutomaticExamState } =
    React.useContext(AutomaticExamContext);
  const { courseId } = useParams<{ courseId: string }>();
  const { setAlertState } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToExamsPage = () => {
    const pathname = location.pathname;
    const firstPart = pathname.split("/")[1];
    const path = `/${firstPart}/courses/${courseId}/exams`;
    console.log("hi", path);

    navigate(`/${firstPart}/courses/${courseId}/exams`);
  };

  const flattenQuestionsMap = () => {
    const questionsMap = isAutomatic
      ? automaticExamState.questions
      : examState.questions;
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
    const exam = isAutomatic ? automaticExamState : examState;
    const examQuestionsList = flattenQuestionsMap();
    const examPayload: IExamPayload = {
      title: exam.title,
      duration: exam.duration,
      course_id: parseInt(courseId!),
      is_auto: exam.is_auto,
      has_models: exam.has_models,
      exam_questions_attributes: examQuestionsList,
    };
    console.log(automaticExamState);
    console.log("exam", examPayload);
    createExamApi(examPayload)
      .then(({ data }: IExamResponse) => {
        setAlertState({
          open: true,
          message: "Exam is created successfully!",
          severity: "success",
        });
        console.log("dd");
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

  const getQuestionsMap = (questions: IExamQuestionsGroup[]) => {
    const questionsMap = new Map<string, IExamQuestion[]>();

    questions.forEach((group) => {
      Object.keys(group).forEach((key) => {
        questionsMap.set(key, group[key]);
      });
    });

    return questionsMap;
  };

  const handleAutoGenerate = () => {
    let question_type_topics: IQuestionTypeTopics[] = [];
    Array.from(automaticExamState.topics?.entries() ?? []).map(
      ([key, topicsList]) => {
        question_type_topics.push({
          question_type_id: key,
          topic_ids: topicsList,
        });
      }
    );
    const autoGeneratePayload: IAutoGeneratePayload = {
      question_type_topics: question_type_topics,
      course_id: parseInt(courseId!),
      duration: automaticExamState.duration!,
    };

    autoGenerateExamApi(autoGeneratePayload)
      .then(({ data }: IExamResponse) => {
        setAutomaticExamState({
          ...automaticExamState,
          // FIXME: map this to this
          questions: getQuestionsMap(data.exam.exam_questions),
        });
        setAlertState({
          open: true,
          message: "Questions are auto-generated successfully!",
          severity: "success",
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data.message,
          severity: "error",
        });
      });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else if (activeStep === 0 && isAutomatic) {
      handleAutoGenerate();
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
              {activeStep === steps.length - 1 ? "Sumbit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
      {activeStep === 0 ? (
        isAutomatic ? (
          <AutomaticInfo setDisabled={setDisabled} />
        ) : (
          <ManualInfo setDisabled={setDisabled} />
        )
      ) : activeStep === 1 ? (
        <QuestionsBody isAutomatic={isAutomatic} setDisabled={setDisabled} />
      ) : (
        <Summary isAutomatic={isAutomatic} />
      )}
    </Stack>
  );
}
