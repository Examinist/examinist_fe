import React, { useEffect } from "react";

import ChoicesSingleAnswer from "./ChoicesSingleAnswer";
import { set, useFormContext } from "react-hook-form";
import ChoicesMultipleAnswer from "./ChoicesMultipleAnswer";
import { AnswerTypeEnum, IChoice } from "../../../../../types/Question";
import { IFormInputs } from "../../Fields";
import SelectAnswerType from "../SelectAnswerType";

const answerTypes = [AnswerTypeEnum.SINGLE, AnswerTypeEnum.MULTIPLE];
export default function MCQAnswer() {
  const { watch, setValue, getValues } = useFormContext<IFormInputs>();
  const watchAnswerType = watch("answer_type");
  // setValue("answerType", "single");
  useEffect(() => {
    setValue("answer_type", AnswerTypeEnum.SINGLE);
    setValue("choices_attributes", [
      { choice: "", is_answer: true },
      { choice: "", is_answer: false },
    ]);
  }, []);
  useEffect(() => {
    setValue(
      "choices_attributes",
      getValues("choices_attributes")?.map((choice: IChoice) => ({
        ...choice,
        is_answer: false,
      }))
    );
    setValue("choices_attributes.0.is_answer", true);
  }, [watchAnswerType]);
  return (
    <div>
      <SelectAnswerType answerTypes={answerTypes}></SelectAnswerType>
      {watchAnswerType === AnswerTypeEnum.SINGLE ? (
        <ChoicesSingleAnswer />
      ) : (
        <ChoicesMultipleAnswer />
      )}
    </div>
  );
}
