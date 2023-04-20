import React from "react";
import SelectAnswerType from "./SelectAnswerType";
import ChoicesSingleAnswer from "./ChoicesSingleAnswer";
import { useFormContext } from "react-hook-form";
import ChoicesMultipleAnswer from "./ChoicesMultipleAnswer";

const answerTypes = ["Single", "Multiple"];
export default function MCQAnswer() {
  const {watch} = useFormContext();
  const watchAnswerType = watch("answerType");
  return (
    <div>
      <SelectAnswerType answerTypes={answerTypes}></SelectAnswerType>
     {watchAnswerType === "single" ? <ChoicesSingleAnswer /> : <ChoicesMultipleAnswer/>}
    </div>
  );
}
