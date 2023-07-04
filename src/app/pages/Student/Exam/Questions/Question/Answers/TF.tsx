import React from "react";
import IAnswerProbs from "./AnswerProbs";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";

export default function TF({ answer, onUpdate }: IAnswerProbs) {
  const [value, setValue] = React.useState(
    answer.answer.length > 0 ? answer.answer[0] : ""
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
                      answer.answer.length === 0 ||
                      newValue !== answer.answer[0]
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
