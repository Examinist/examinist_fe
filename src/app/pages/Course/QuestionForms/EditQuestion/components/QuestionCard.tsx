import { Box, Typography, TextField, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { IQuestionType, DefaultQuestionTypesEnum } from "../../../../../types/CourseSettings";
import { AnswerTypeEnum } from "../../../../../types/Question";
import ChoicesMultipleAnswer from "../../components/answer/ChoicesMultipleAnswer";
import ChoicesSingleAnswer from "../../components/answer/ChoicesSingleAnswer";
import TFAnswer from "../../components/answer/TFAnswer";
import TextAnswer from "../../components/answer/TextAnswer";

export default function QuestionCard({
  questionType,
  answerType,
}: {
  questionType: IQuestionType;
  answerType: AnswerTypeEnum;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const renderMCQAnswer = () => {
    switch (answerType) {
      case AnswerTypeEnum.SINGLE:
        return <ChoicesSingleAnswer />;
      case AnswerTypeEnum.MULTIPLE:
        return <ChoicesMultipleAnswer />;
    }
  };

  const renderAnswer = () => {
    switch (questionType.name) {
      case DefaultQuestionTypesEnum.MCQ:
        return renderMCQAnswer();
      case DefaultQuestionTypesEnum.T_F:
        return <TFAnswer />;
      case DefaultQuestionTypesEnum.SHORT_ANSWER:
        return <TextAnswer />;
      default:
        return <TextAnswer />;
    }
  };

  return (
    <Box
      sx={{
        background: "white",
        width: "100%",
        borderRadius: 3,
        mb: 4,
        p: 1,
      }}
    >
      <Typography
        sx={{ fontSize: "23px", fontWeight: "500", py: 1, px: 3 }}
        color="#6B6767"
      >
        Question
      </Typography>
      <Divider />
      <Box sx={{ px: 3, py: 1 }}>
        <Typography sx={{ fontSize: "18px", my: 2 }} color="#6B6767">
          Question Header:
        </Typography>
        <TextField
          autoComplete="off"
          variant="standard"
          fullWidth
          sx={{ mb: 2 }}
          placeholder="Enter question header here..."
          {...register("header", { required: "Header is required" })}
          multiline
          error={errors.header?.message ? true : false}
          helperText={errors.header?.message?.toString()}
        />
        {renderAnswer()}
      </Box>
    </Box>
  );
}
