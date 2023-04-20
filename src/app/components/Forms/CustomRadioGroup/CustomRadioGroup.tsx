import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ICustomRadioGroupProps {
  title?: string;
  name: string;
  options: { value: string; label: string }[];
}

export default function CustomRadioGroup({
  title,
  name,
  options,
}: ICustomRadioGroupProps) {
  const { control } = useFormContext();
  return (
    <Box>
     {title && <Typography
        sx={{ fontSize: "18px", py: 2 }}
        color="#6B6767"
      >
        {title}
      </Typography>}
      <FormControl sx={{ ml: 2}}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              {options.map((option) => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          )}
        ></Controller>
      </FormControl>
    </Box>
  );
}
