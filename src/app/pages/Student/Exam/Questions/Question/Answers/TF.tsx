import React from "react";
import IAnswerProbs from "./AnswerProbs";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function TF({ answer, onUpdate }: IAnswerProbs) {
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
    <FormControl sx={{ml: 2}}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
    </FormControl>
  );
}
