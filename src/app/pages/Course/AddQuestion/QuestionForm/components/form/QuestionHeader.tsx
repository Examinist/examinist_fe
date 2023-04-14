import { Box, Typography, TextField } from '@mui/material';
import React from 'react'
import { useFormContext } from 'react-hook-form';

export default function QuestionHeader() {
    const {register, formState: {errors}} = useFormContext();
  return (
    <Box
      sx={{
        background: "white",
        width: "100%",
        p: 4,
        borderRadius: 3,
        mb: 4,
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "500" }} color="#6B6767">
        Question Header
      </Typography>
      <TextField
        autoComplete="off"
        variant="filled"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        placeholder="Enter question header here..."
        {...register("header")}
        multiline
        error={errors.header?.message ? true : false}
        helperText={errors.header?.message?.toString()}
      />
    </Box>
  );
}
