import React, { useEffect } from 'react'
import SelectAnswerType from './SelectAnswerType';
import { useFormContext } from 'react-hook-form';
import TextAnswer from './TextAnswer';
import { AnswerTypeEnum } from '../../../../../types/Question';
import { IFormInputs } from '../Fields';

const answerTypes: string[] = [AnswerTypeEnum.TEXT, AnswerTypeEnum.PDF];
export default function EssayAnswer() {
  const {watch, setValue} = useFormContext<IFormInputs>();
  const watchAnswerType = watch("answer_type");
   useEffect(() => {
     setValue("answer_type", AnswerTypeEnum.TEXT);
   }, []);
  return (
    <div>
      <SelectAnswerType answerTypes={answerTypes}></SelectAnswerType>
     {watchAnswerType === AnswerTypeEnum.TEXT ? <TextAnswer /> : "pdf: coming soon :)"}
    </div>
  );
}
