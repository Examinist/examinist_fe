import { FormControl, RadioGroup, FormControlLabel, Radio, Box, Typography } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

export default function SelectDifficulty() {
  const {control} = useFormContext();
  return (
    <Box sx={{ px: 5, pt: 3 }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "500", py: 2 }}
        color="#6B6767"
      >
        Difficulty Level
      </Typography>
      <FormControl sx={{ml: 2}}>
        <Controller
          name="difficulty"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="easy"
                control={<Radio />}
                label="Easy"
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              /> 
              <FormControlLabel
                value="hard"
                control={<Radio />}
                label="Hard"
              />
            </RadioGroup>
          )}
        ></Controller>
      </FormControl>
    </Box>
  );
}
