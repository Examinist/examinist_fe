import React from "react";
import { IStudentAnswer } from "../../../../types/StudentPortalStudentExam";
import { Box } from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";
import theme from "../../../../../assets/theme";

interface IQuestionWithStatusProps {
  question: IStudentAnswer;
  number: number;
}
export default function QuestionWithStatus({
  question,
  number,
}: IQuestionWithStatusProps) {
  return (
    <Box
      sx={{
        display: "flex",
        my: 0.5,
        py: 0.5,
        alignItems: "center",
        backgroundColor: question.marked ? "#FFF3B2" : theme.palette.white.main,
      }}
    >
      <Box sx={{ fontSize: "17px", px: 3 }}> Question {number}</Box>
      <CircleIcon
        sx={{
          pr: 2,
          color: question.solved ? "#3FC164" : theme.palette.gray.main,
          ml: "auto",
          fontSize: "15px",
        }}
      />
    </Box>
  );
}
