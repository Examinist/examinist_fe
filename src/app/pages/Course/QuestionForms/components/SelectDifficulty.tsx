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
import { DifficultyLevelEnum } from "../../../../types/Question";
import theme from "../../../../../assets/theme";
import { Rectangle } from "../../../../components/Rectangle";


const getColor = (questionDifficulty: string) => {
  if (questionDifficulty === DifficultyLevelEnum.EASY)
    return theme.palette.green.main;
  return questionDifficulty === DifficultyLevelEnum.MEDIUM
    ? theme.palette.yellow.main
    : theme.palette.red.main;
};

const renderDifficultyLevel = (difficultyLevel: DifficultyLevelEnum) => (
  <FormControlLabel
    value={difficultyLevel}
    control={<Radio />}
    label={
      <Box sx={{ display: "flex", gap: 1 }}>
        <Rectangle color={getColor(difficultyLevel)} />
        <Typography> {difficultyLevel}</Typography>
      </Box>
    }
  />
);

export default function SelectDifficulty() {
  const { control } = useFormContext();
  return (
    <Box sx={{ px: 5, pt: 3 }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "500", py: 2 }}
        color="#6B6767"
      >
        Difficulty Level
      </Typography>
      <FormControl sx={{ ml: 2 }}>
        <Controller
          name="difficulty"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field}>
              {renderDifficultyLevel(DifficultyLevelEnum.EASY)}
              {renderDifficultyLevel(DifficultyLevelEnum.MEDIUM)}
              {renderDifficultyLevel(DifficultyLevelEnum.HARD)}
            </RadioGroup>
          )}
        ></Controller>
      </FormControl>
    </Box>
  );
}
