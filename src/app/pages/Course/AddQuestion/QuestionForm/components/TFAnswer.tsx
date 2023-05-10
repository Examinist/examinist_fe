import React, { useEffect } from "react";
import CustomRadioGroup from "./Forms/CustomRadioGroup/CustomRadioGroup";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AnswerTypeEnum } from "../../../../../types/Question";

const options = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

export default function TFAnswer() {
  const { setValue } = useFormContext();
  const [checked, setChecked] = React.useState<string>("true");
  useEffect(() => {
    setValue("answer_type", AnswerTypeEnum.SINGLE);
    setValue("choices_attributes", [{choice: "true", is_answer: true}, {choice: "false", is_answer: false}]);
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
    if(event.target.value === 'true'){
      setValue("choices_attributes", [{choice: "true", is_answer: true}, {choice: "false", is_answer: false}]);
    }
    else{
      setValue("choices_attributes", [{choice: "true", is_answer: false}, {choice: "false", is_answer: true}]);
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
