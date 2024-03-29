import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import QuestionsSideBar from "./QuestionsSideBar";
import UpperGradingBar from "./UpperGradingBar";
import {
  IStudentExamResponse,
  getStudentExamApi,
} from "../../../../services/APIs/StaffPortalStudentExamAPIs";
import useAlert from "../../../../hooks/useAlert";
import { IErrorResponse } from "../../../../services/Response";
import { IExamResponse, getExamApi } from "../../../../services/APIs/ExamAPIs";
import { IGradeExam, IGradeExamContext, gradeExamContext } from "../Models";
import { IStudent } from "../../../../types/User";
import { any } from "prop-types";
import ExamQuestionsList from "./Questions/ExamQuestionsList";
import theme from "../../../../../assets/theme";

export default function StudentExam() {
  const { examId } = useParams<{ examId: string }>();
  const { studentExamId } = useParams<{ studentExamId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setAlertState } = useAlert();
  const [title, setTitle] = useState<string>("");
  const [student, setStudent] = useState<IStudent>({} as IStudent);
  const [gradeState, setGradeState] = useState<IGradeExam>({
    totalScore: 0,
    partialScore: 0,
    totalQuestions: 0,
    questionsAnswered: 0,
    answers: [],
    student_answers_attributes: [],
    loading: false,
  });

  const contextValue: IGradeExamContext = {
    gradeState: gradeState,
    setGradeState: setGradeState,
  };

  useEffect(() => {
    getExamApi(parseInt(examId!))
      .then(({ data }: IExamResponse) => {
        setTitle(data.exam.title);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {});

    setIsLoading(true);

    getStudentExamApi(parseInt(examId!), parseInt(studentExamId!))
      .then(({ data }: IStudentExamResponse) => {
        setGradeState({
          totalScore: data.student_exam.total_score,
          partialScore: data.student_exam.partial_score,
          totalQuestions: data.student_exam.total_graded_questions,
          questionsAnswered: data.student_exam.partial_graded_questions,
          answers: data.student_exam.student_answers,
          loading: false,
          student_answers_attributes: [],
        });
        setStudent(data.student_exam.student);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText,
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <gradeExamContext.Provider value={contextValue}>
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <UpperGradingBar title={title} student={student} />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              <Box>
                <QuestionsSideBar />
              </Box>
              <Box
                sx={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: theme.palette.background.default,
                  py: 1,
                  px: 5,
                }}
              >
                <ExamQuestionsList />
              </Box>
            </Box>
          </Box>
        </gradeExamContext.Provider>
      )}
    </>
  );
}
