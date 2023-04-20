import { TextField, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function TextAnswer() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
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
        {...register("correctAnswer.0", { required: "Answer is required" })}
        multiline
        error={!!errors?.correctAnswer}
        helperText={errors?.correctAnswer?.message?.toString()}
      />
    </>
  );
}
