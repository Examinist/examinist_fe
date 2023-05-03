import * as React from "react";
import theme from "../../../../assets/theme";
import { Box, Grid, Typography, styled } from "@mui/material";
import QuestionModifications from "./QuestionModifications";
import { DefaultQuestionTypesEnum, DifficultyLevelEnum, IQuestion } from "../../../types/Question";

const Rectangle = styled("div")(({ theme, color }) => ({
  position: "relative",
  display: "flex",
  width: "20px",
  height: "20px",
  backgroundColor: color,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
}));


export default function QuestionHeader(question: IQuestion) {
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === DifficultyLevelEnum.EASY)
      return theme.palette.green.main;
    return questionDifficulty === DifficultyLevelEnum.MEDIUM
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };

  const getWeight = () => {
    const {question_type, difficulty} = question;
    switch(difficulty){
      case DifficultyLevelEnum.EASY:
        return question_type.easy_weight;
      case DifficultyLevelEnum.MEDIUM:
        return question_type.medium_weight;
      case DifficultyLevelEnum.HARD:
        return question_type.hard_weight;
    }
  };

  return (
    <Grid container sx={{ pl: 2 }}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Grid container direction="row" spacing={5}>
              <Grid item>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.gray.dark}
                    sx={{ fontWeight: 700 }}
                  >
                    Topic:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.gray.dark}
                  >
                    {question.topic.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.gray.dark}
                    sx={{ fontWeight: 700 }}
                  >
                    Question Type:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.gray.dark}
                  >
                    {question.question_type.name == DefaultQuestionTypesEnum.MCQ
                      ? `${question.question_type.name} ( ${question.answer_type} )`
                      : question.question_type.name}
                  </Typography>
                </Box>
              </Grid>

              <Grid item>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.gray.dark}
                    sx={{ fontWeight: 700 }}
                  >
                    Weight:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.gray.dark}
                  >
                    {getWeight()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography variant="subtitle2" color={theme.palette.gray.dark}>
                  {question.difficulty}
                </Typography>
              </Grid>
              <Grid item>
                <Rectangle color={getColor(question.difficulty)} />
              </Grid>
              <Grid item>
                <QuestionModifications />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle2"
          color={theme.palette.gray.dark}
          sx={{ fontSize: 20 }}
        >
          {question.header}
        </Typography>
      </Grid>
    </Grid>
  );
}
