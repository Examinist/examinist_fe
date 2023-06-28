import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import { IStudentExamContext, StudentExamContext } from "../StudentExamContext";
import QuestionWithStatus from "./QuestionWithStatus";

export default function QuestionsOutline() {
  const { exam } = useContext<IStudentExamContext>(StudentExamContext);
  return (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: theme.palette.white.main,
        height: "100vh",
        width:"198px",
        py: 2,
        border: 1,
        borderColor: theme.palette.gray.light,
      }}
    >
      <Box
        sx={{
          fontSize: 24,
          fontWeight: 600,
          color: theme.palette.gray.dark,
          px: 3,
        }}
      >
        Questions
      </Box>
      {exam && (
        <Stack sx={{ mt: 2, overflowY: "auto" }}>
          {exam.answers.map((question, index) => (
            <QuestionWithStatus
              key={question.id}
              question={question}
              number={index + 1}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
