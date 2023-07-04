import React from "react";
import IAnswerProbs from "./AnswerProbs";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function MCQMultipleAnswers({ answer, onUpdate }: IAnswerProbs) {
  const [selectedChoices, setSelectedChoices] = React.useState<string[]>(
    answer.answer
  );
  return (
    <FormControl sx={{ ml: 2 }} component="fieldset" variant="standard">
      <FormLabel component="legend">Select all right answers:</FormLabel>
      <FormGroup>
        {answer.question?.choices.map((choice) => (
          <FormControlLabel
            key={choice.choice}
            control={
              <Checkbox
                checked={selectedChoices.indexOf(choice.choice) !== -1}
                onChange={(e) => {
                  const newValue = choice.choice;
                  let newSelectedChoices;
                  if (selectedChoices.indexOf(choice.choice) !== -1) {
                    newSelectedChoices = selectedChoices.filter(
                      (choice) => choice !== newValue
                    );
                  } else {
                    newSelectedChoices = [...selectedChoices, newValue];
                  }
                  setSelectedChoices(newSelectedChoices);
                  onUpdate(newSelectedChoices);
                }}
                name={choice.choice}
              />
            }
            label={choice.choice}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
