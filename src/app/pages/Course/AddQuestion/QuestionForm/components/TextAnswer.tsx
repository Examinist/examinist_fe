import { TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { IFormInputs } from "../Fields";
import { AnswerTypeEnum } from "../../../../../types/Question";

export default function TextAnswer() {
  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext<IFormInputs>();
  useEffect(() => {
      setValue("answer_type", AnswerTypeEnum.TEXT);
  }, []);
  
  return (
    <>
      <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
        Answer:
      </Typography>
      <TextField
        autoComplete="off"
        variant="standard"
        fullWidth
        sx={{ my: 1 }}
        placeholder="Enter Correct Answer here..."
        {...register("correct_answers_attributes.0.answer")}
        multiline
        error={errors?.correct_answers_attributes?.[0]?.answer? true : false}
        helperText={errors?.correct_answers_attributes?.[0]?.answer?.message}
      />
    </>
  );
}
