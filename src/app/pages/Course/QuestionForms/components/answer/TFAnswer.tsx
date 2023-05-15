import React, { useEffect } from "react";

import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AnswerTypeEnum, IChoice } from "../../../../../types/Question";
import { IFormInputs } from "../../Fields";

const options = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

export default function TFAnswer() {
  const { setValue, getValues } = useFormContext<IFormInputs>();
  const [checked, setChecked] = React.useState<string>("true");
  useEffect(() => {
    setValue("answer_type", AnswerTypeEnum.SINGLE);
    const choices: IChoice[] = getValues("choices_attributes")!;
    console.log(choices);
    if((choices && choices.length == 2 && choices[0].choice == "true" && choices[1].choice == "false")){
        setChecked(choices[0].is_answer ? "true" : "false");
    }
    else{
        setValue("choices_attributes", [
          { choice: "true", is_answer: true },
          { choice: "false", is_answer: false },
        ]);
    }
   
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
    if (event.target.value === "true") {
      setValue(`choices_attributes.0.is_answer`, true);
      setValue(`choices_attributes.1.is_answer`, false);
    } else {
      setValue(`choices_attributes.0.is_answer`, false);
      setValue(`choices_attributes.1.is_answer`, true);
    }
  };
  return (
    <>
      <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
        Answer:
      </Typography>
      <RadioGroup value={checked} onChange={handleOnChange}>
        <FormControlLabel value={"true"} control={<Radio />} label={"true"} />
        <FormControlLabel value={"false"} control={<Radio />} label={"false"} />
      </RadioGroup>
    </>
  );
}
