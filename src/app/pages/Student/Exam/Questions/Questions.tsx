import { Box, Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { IStudentExamContext, StudentExamContext } from "../StudentExamContext";
import { Pagination } from "@mui/material";
import { IStudentAnswer } from "../../../../types/StudentPortalStudentExam";
import QuestionCard from "./Question/QuestionCard";

const questionsPerPage = 5;
export default function Questions() {
  const { exam } = useContext<IStudentExamContext>(StudentExamContext);
  const [answers, setAnswers] = useState<IStudentAnswer[]>(
    exam?.answers.slice(0, questionsPerPage)!
  );
  const [page, setPage] = useState<number>(1);
  const pagesCount: number = Math.ceil(
    (exam?.answers.length || 0) / questionsPerPage
  );

  return (
    <Stack sx={{ overflowY: "auto", flexGrow: 1 }}>
      <Stack sx={{ gap: 3, py: 3, px: 10 }}>
        {exam &&
          answers.map((answer, index) => (
            <QuestionCard
              key={answer?.id}
              answer={answer}
              index={index + (page - 1) * questionsPerPage}
            />
          ))}
      </Stack>
      <Box
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          sx={{ my: 2 }}
          count={pagesCount}
          onChange={(event: React.ChangeEvent<unknown>, newPage: number) => {
            setPage(newPage);
            setAnswers(
              exam?.answers.slice(
                (newPage - 1) * questionsPerPage,
                newPage * questionsPerPage
              )!
            );
          }}
        />
      </Box>
    </Stack>
  );
}
