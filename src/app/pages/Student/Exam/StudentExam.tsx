import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import QuestionsOutline from "./QuestionsOutline/QuestionsOutline";
import UpperBar from "./UpperBar/UpperBar";
import theme from "../../../../assets/theme";
import {
  IStudentExamResponse,
  getStudentExamApi,
} from "../../../services/APIs/StudentExamAPIs";
import { useParams } from "react-router";
import {
  IStudentAnswer,
  IStudentDetailedExam,
} from "../../../types/StudentPortalStudentExam";
import { StudentExamContext } from "./StudentExamContext";
import Questions from "./Questions/Questions";
import { CircularProgress } from "@mui/material";

const saveUpdatesPeriodMins = 1;
export default function StudentExam() {
  const { examId } = useParams<{ examId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exam, setExam] = useState<IStudentDetailedExam | null>(null);
  const [changedAnswers, setChangedAnswers] = useState<Set<number>>(new Set());
  const [questionsCount, setQuestionsCount] = useState<number>(0);
  const [solvedQuestionsCount, setSolvedQuestionsCount] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    getStudentExamApi(parseInt(examId!))
      .then(({ data }: IStudentExamResponse) => {
        setExam(data.student_exam);
        setQuestionsCount(data.student_exam.answers.length);
        setSolvedQuestionsCount(
          data.student_exam.answers.filter(
            (answer: IStudentAnswer) => answer.solved )
            .length
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const saveChanges = () => {
    console.log("Saving changes...", changedAnswers);
  };

  useEffect(() => {
    const interval = setInterval(saveChanges, saveUpdatesPeriodMins * 5000);
    return () => {
      clearInterval(interval);
    };
  }, [changedAnswers]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <StudentExamContext.Provider
        value={{
          exam: exam,
          setExam: setExam,
          changedAnswers: changedAnswers,
          setChangedAnswers: setChangedAnswers,
          questionsCount: questionsCount, 
          solvedQuestionsCount: solvedQuestionsCount,
          setSolvedQuestionsCount: setSolvedQuestionsCount,
        }}
      >
        <Box sx={{ width: "200px" }}>
          <QuestionsOutline />
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <UpperBar />
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
    </Box>
  );
}
