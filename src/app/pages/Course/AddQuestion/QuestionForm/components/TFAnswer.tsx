import React, { useEffect } from 'react'
import CustomRadioGroup from '../../../../../components/Forms/CustomRadioGroup/CustomRadioGroup';
import { Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { AnswerTypeEnum } from '../../../../../types/Question';

const options =[{value: 'true', label: 'True'}, {value: 'false', label: 'False'}];

export default function TFAnswer() {
  const {setValue} = useFormContext();
  useEffect(() => {
     setValue("answer_type", AnswerTypeEnum.SINGLE);
  }, []);
  return (
    <>
      <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
        Answer:
      </Typography>
      <CustomRadioGroup name="correct_answer.0.name" options={options} />
    </>
  );
}
