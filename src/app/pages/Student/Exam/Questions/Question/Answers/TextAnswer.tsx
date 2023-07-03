import React, { useContext, useEffect } from "react";
import IAnswerProbs from "./AnswerProbs";
import { TextField } from "@mui/material";
import { DefaultQuestionTypesEnum } from "../../../../../../types/CourseSettings";

export default function TextAnswer({ answer, onUpdate }: IAnswerProbs) {
  const [value, setValue] = React.useState<string>(
    answer.answer.length > 0 ? answer.answer[0] : ""
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (answer.answer.length === 0 || value !== answer.answer[0]) {
        onUpdate([value]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);
  return (
    <TextField
      autoComplete="off"
      variant="outlined"
      fullWidth
      sx={{ my: 1 }}
      multiline
      rows={
        answer.question?.question_type.name ===
        DefaultQuestionTypesEnum.SHORT_ANSWER
          ? 1
          : 4
      }
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
