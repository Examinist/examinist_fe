import { Box, Typography, TextField, Divider } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import ChoicesSingleAnswer from "./ChoicesSingleAnswer";
import MCQAnswer from "./MCQAnswer";
import TFAnswer from "./TFAnswer";
import TextAnswer from "./TextAnswer";
import EssayAnswer from "./EssayAnswer";

interface IQuestionCardProps {
  questionType: string;
}
export default function QuestionCard({ questionType }: IQuestionCardProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
   const { watch } = useFormContext();
   const watchQuestionType = watch("questionType");

   const renderAnswer = () => {
     if (watchQuestionType === "MCQ") {
       return <MCQAnswer />;
     } else if (watchQuestionType === "T/F") {
       return <TFAnswer />;
     } else if (watchQuestionType === "Short Answer") {
       return <TextAnswer />;
     } else {
       return <EssayAnswer />;
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