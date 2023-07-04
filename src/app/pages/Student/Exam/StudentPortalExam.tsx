import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import QuestionsOutline from "./QuestionsOutline/QuestionsOutline";
import ExamUpperBar from "./ExamUpperBar/ExamUpperBar";
import theme from "../../../../assets/theme";
import {
  IStudentExamPayload,
  IStudentExamResponse,
  getStudentExamApi,
  submitStudentExamApi,
} from "../../../services/APIs/StudentAPIs";
import { useParams } from "react-router";
import {
  IStudentAnswer,
  IStudentDetailedExam,
  StudentExamLocalStorageKey,
} from "../../../types/StudentPortalStudentExam";
import { StudentExamContext } from "./StudentExamContext";
import Questions from "./Questions/Questions";
import { CircularProgress } from "@mui/material";
import CustomCircularProgress from "../../../components/CustomCircularProgress";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const saveUpdatesPeriodMins = 1;
export default function StudentPortalExam() {
  const { examId } = useParams<{ examId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exam, setExam] = useState<IStudentDetailedExam | null>(null);
  const [changedAnswers, setChangedAnswers] = useState<Set<number>>(new Set());
  const [questionsCount, setQuestionsCount] = useState<number>(0);
  const [solvedQuestionsCount, setSolvedQuestionsCount] = useState<number>(0);
  const { setAlertState } = useAlert();
  const navigate = useNavigate();

  const syncExamData = (exam: IStudentDetailedExam) => {
    setExam(exam);
    setQuestionsCount(exam.answers.length);
    setSolvedQuestionsCount(
      exam.answers.filter((answer: IStudentAnswer) => answer.solved).length
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getStudentExamApi(parseInt(examId!))
      .then(({ data }: IStudentExamResponse) => {
        syncExamData(data.student_exam);
        localStorage.setItem(StudentExamLocalStorageKey, examId!);
      })
      .catch(({ response: { data, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText || "Something went wrong",
          severity: "error",
        });
        navigate("/student");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const saveChanges = (payload: IStudentExamPayload) => {
    submitStudentExamApi(parseInt(examId!), payload);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {isLoading ? (
        <CustomCircularProgress />
      ) : (
        <StudentExamContext.Provider
          value={{
            exam: exam,
            setExam: setExam,
            questionsCount: questionsCount,
            solvedQuestionsCount: solvedQuestionsCount,
            setSolvedQuestionsCount: setSolvedQuestionsCount,
            saveChanges: saveChanges,
          }}
        >
          <Box sx={{ width: "200px" }}>
            <QuestionsOutline />
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <ExamUpperBar />
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
              <Questions />
            )}
          </Box>
        </StudentExamContext.Provider>
      )}
    </Box>
  );
}
