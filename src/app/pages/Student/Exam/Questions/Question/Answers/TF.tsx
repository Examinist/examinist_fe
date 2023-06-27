import React from "react";
import IAnswerProbs from "./AnswerProbs";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";

export default function TF({ answer, onUpdate }: IAnswerProbs) {
  const [value, setValue] = React.useState(
    answer.answers.length > 0 ? answer.answers[0] : ""
  );
  return (
    <FormControl sx={{ ml: 2 }} component="fieldset" variant="standard">
      <FormGroup>
        {answer.question?.choices.map((choice) => (
          <FormControlLabel
            key={choice.choice}
            control={
              <Checkbox
                checked={choice.choice === value}
                onChange={(e) => {
                  const newValue = choice.choice;
                  if (newValue === value) {
                    setValue("");
                    onUpdate([]);
                  } else {
                    setValue(newValue);
                    if (
                      answer.answers.length === 0 ||
                      newValue !== answer.answers[0]
                    ) {
                      onUpdate([newValue]);
                    }
                  }
                }}
              />
            }
            label={choice.choice}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
