import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

interface AnswerTypeProps{
  answerTypes: string[];
}

export default function SelectAnswerType({answerTypes}: AnswerTypeProps) {
  const {control} = useFormContext();
  return (
    <Box sx={{ display: "flex", py: 2 }}>
      <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
        Answer Type:
      </Typography>
      <FormControl sx={{ ml: 5 }}>
        <Controller
          name="answerType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Box sx={{ display: "flex", gap: 5 }}>
                {answerTypes.map((answerType) => (
                  <div key={answerType}>
                    <FormControlLabel
                      value={answerType.toLowerCase()}
                      control={<Radio />}
                      label={answerType}
                    />
                  </div>
                ))}
              </Box>
            </RadioGroup>
          )}
        ></Controller>
      </FormControl>
    </Box>
  );
}
