import React, { useEffect } from "react";

import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AnswerTypeEnum, IChoice } from "../../../../../types/Question";
import { IFormInputs } from "../../Fields";



export default function TFAnswer() {
  const { setValue, getValues } = useFormContext<IFormInputs>();
  const [checked, setChecked] = React.useState<string>("true");
  useEffect(() => {
    setValue("answer_type", AnswerTypeEnum.SINGLE);
    const choices: IChoice[] = getValues("choices_attributes")!;
    if((choices && choices.length == 2 && choices[0].choice?.toLowerCase() === "true" && choices[1].choice?.toLowerCase() === "false")){
        setChecked(choices[0].is_answer ? "True" : "False");
    }
    else{
        setValue("choices_attributes", [
          { choice: "True", is_answer: true },
          { choice: "False", is_answer: false },
        ]);
    }
   
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
    if (event.target.value === "True") {
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
        <FormControlLabel value={"True"} control={<Radio />} label={"True"} />
        <FormControlLabel value={"False"} control={<Radio />} label={"False"} />
      </RadioGroup>
    </>
  );
}
