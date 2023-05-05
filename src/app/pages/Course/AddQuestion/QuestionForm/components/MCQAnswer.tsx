import React, { useEffect } from "react";
import SelectAnswerType from "./SelectAnswerType";
import ChoicesSingleAnswer from "./ChoicesSingleAnswer";
import { useFormContext } from "react-hook-form";
import ChoicesMultipleAnswer from "./ChoicesMultipleAnswer";
import { AnswerTypeEnum } from "../../../../../types/Question";

const answerTypes = ["Single", "Multiple"];
export default function MCQAnswer() {
  const {watch, setValue} = useFormContext();
  const watchAnswerType = watch("answerType");
  // setValue("answerType", "single");
  useEffect(() => {
    setValue("answer_type", AnswerTypeEnum.SINGLE);
  }, []);
  return (
    <div>
      <SelectAnswerType answerTypes={answerTypes}></SelectAnswerType>
     {watchAnswerType === "single" ? <ChoicesSingleAnswer /> : <ChoicesMultipleAnswer/>}
    </div>
  );
}
