import React from "react";
import IAnswerProbs from "./AnswerProbs";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

export default function MCQSingleAnswer({ answer, onUpdate }: IAnswerProbs) {
  const [value, setValue] = React.useState(
    answer.answers.length > 0 ? answer.answers[0] : ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
    if (answer.answers.length === 0 || newValue !== answer.answers[0]) {
      onUpdate([newValue]);
    }
  };

  return (
    <FormControl sx={{ ml: 2 }}>
      <FormLabel component="legend">Select single answer:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {answer.question?.choices.map((choice) => (
          <FormControlLabel
            key={choice.choice}
            value={choice.choice}
            control={<Radio />}
            label={choice.choice}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
