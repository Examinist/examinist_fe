import React from 'react'
import SelectAnswerType from './SelectAnswerType';
import { useFormContext } from 'react-hook-form';
import TextAnswer from './TextAnswer';

const answerTypes: string[] = ["Text", "PDF"];
export default function EssayAnswer() {
  const {watch} = useFormContext();
  const watchAnswerType = watch("answerType");
  return (
    <div>
      <SelectAnswerType answerTypes={answerTypes}></SelectAnswerType>
     {watchAnswerType === "text" ? <TextAnswer /> : "pdf: coming soon :)"}
    </div>
  );
}
