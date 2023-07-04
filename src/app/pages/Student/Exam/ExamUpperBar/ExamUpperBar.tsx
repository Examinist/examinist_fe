import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import { IStudentExamContext, StudentExamContext } from "../StudentExamContext";
import HoursMinutesCountDown from "./CountDown/HoursMinutesCountDown";
import { Button, LinearProgress } from "@mui/material";
import SubmitExamDialog from "../SubmitExam/SubmitExamDialog";
import {
  IStudentAnswer,
  StudentExamLocalStorageKey,
} from "../../../../types/StudentPortalStudentExam";
import { IStudentExamPayload } from "../../../../services/APIs/StudentAPIs";
import { useNavigate } from "react-router";

export default function ExamUpperBar() {
  const { exam, questionsCount, solvedQuestionsCount, saveChanges } =
    useContext<IStudentExamContext>(StudentExamContext);
  const [submitWindowOpen, setSubmitWindowOpen] =
    React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnComplete = () => {
    if (exam) {
      let studentAnswers: IStudentAnswer[];
      studentAnswers = exam?.answers.map((answer) => {
        const { question, ...answerPayload } = answer;
        return answerPayload;
      });
      const examPayload: IStudentExamPayload = {
        is_submitting: true,
        student_answers_attributes: studentAnswers,
      };
      saveChanges(examPayload);
    }
    localStorage.removeItem(StudentExamLocalStorageKey);
    navigate("/student");
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        borderBottom: 1,
        borderBottomColor: theme.palette.gray.light,
      }}
    >
      <Box
        sx={{
          py: 1,
          display: "flex",
          alignItems: "center",
          px: 4,
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Box
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: theme.palette.gray.dark,
            }}
          >
            {exam?.title}
          </Box>
          <Box
            sx={{
              fontSize: 17,
              fontWeight: 500,
              color: theme.palette.gray.dark,
            }}
          >
            {exam?.course.title}
          </Box>
        </Stack>
        {exam && (
          <>
            <HoursMinutesCountDown
              toDate={exam?.ends_at}
              onComplete={handleOnComplete}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: 600,
              }}
              onClick={() => setSubmitWindowOpen(true)}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        color="success"
        value={(solvedQuestionsCount / questionsCount) * 100}
      />
      <SubmitExamDialog
        open={submitWindowOpen}
        onClose={() => setSubmitWindowOpen(false)}
      />
    </Box>
  );
}
