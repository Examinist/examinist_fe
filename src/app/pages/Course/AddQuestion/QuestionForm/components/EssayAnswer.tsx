import React, { useEffect } from 'react'
import SelectAnswerType from './SelectAnswerType';
import { useFormContext } from 'react-hook-form';
import TextAnswer from './TextAnswer';
import { AnswerTypeEnum } from '../../../../../types/Question';

const answerTypes: string[] = ["Text", "PDF"];
export default function EssayAnswer() {
  const {watch, setValue} = useFormContext();
  const watchAnswerType = watch("answerType");
   useEffect(() => {
     setValue("answerType", AnswerTypeEnum.TEXT);
   }, []);
  return (
    <div>
      <SelectAnswerType answerTypes={answerTypes}></SelectAnswerType>
     {watchAnswerType === "text" ? <TextAnswer /> : "pdf: coming soon :)"}
    </div>
  );
}
