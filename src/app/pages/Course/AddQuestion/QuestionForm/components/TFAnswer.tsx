import React from 'react'
import CustomRadioGroup from '../../../../../components/Forms/CustomRadioGroup/CustomRadioGroup';
import { Typography } from '@mui/material';

const options =[{value: 'true', label: 'True'}, {value: 'false', label: 'False'}];

export default function TFAnswer() {
  return (
    <>
      <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
        Answer:
      </Typography>
      <CustomRadioGroup name="correctAnswer.0" options={options} />
    </>
  );
}
