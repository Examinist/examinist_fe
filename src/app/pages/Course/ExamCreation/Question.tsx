import * as React from "react";
import theme from "../../../../assets/theme";
import {
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { DifficultyLevelEnum, IQuestion } from "../../../types/Question";
import { Rectangle } from "../../../components/Rectangle";
import { DefaultQuestionTypesEnum } from "../../../types/CourseSettings";
import QuestionModifications from "../QuestionBank/QuestionModifications";
import { IExamQuestion } from "../../../types/Exam";
import QuestionAnswer from "../QuestionBank/QuestionAnswer";

export default function Question(examQuestion: IExamQuestion) {
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === DifficultyLevelEnum.EASY)
      return theme.palette.green.main;
    return questionDifficulty === DifficultyLevelEnum.MEDIUM
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };

  const getWeight = () => {
    const { question_type, difficulty } = examQuestion.question;
    switch (difficulty) {
      case DifficultyLevelEnum.EASY:
        return question_type.easy_weight;
      case DifficultyLevelEnum.MEDIUM:
        return question_type.medium_weight;
      case DifficultyLevelEnum.HARD:
        return question_type.hard_weight;
    }
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.white.main,
        pt: 2,
        pb: 3,
        pr: 6,
        pl: 2,
        borderRadius: 5,
      }}
      spacing={2}
      direction="column"
    >
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <Grid container direction="row" spacing={4}>
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
                    {examQuestion.question.topic?.name || "Undefined"}
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
                    {examQuestion.question.question_type
                      ? examQuestion.question.question_type.name ==
                        DefaultQuestionTypesEnum.MCQ
                        ? `${examQuestion.question.question_type.name} ( ${examQuestion.question.answer_type} )`
                        : examQuestion.question.question_type.name
                      : "Undefined"}
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
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="subtitle2" color={theme.palette.gray.dark}>
                  {examQuestion.question.difficulty}
                </Typography>
              </Grid>
              <Grid item>
                <Rectangle color={getColor(examQuestion.question.difficulty)} />
              </Grid>
              <Grid item>
                <QuestionModifications question={examQuestion.question} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle2"
          color={theme.palette.gray.dark}
          sx={{ fontSize: 20, pb: 2 }}
        >
          {examQuestion.question.header}
        </Typography>
      </Grid>
      {examQuestion.question.question_type.name ==
        DefaultQuestionTypesEnum.MCQ || examQuestion.question.question_type.name ==
        DefaultQuestionTypesEnum.T_F && (
        <QuestionAnswer {...examQuestion.question} />
      )}
      <Divider orientation="horizontal" flexItem sx={{ pt: 2 }}></Divider>

      <Grid item>
        <TextField id="standard-basic" label="Score" variant="standard" />
      </Grid>
    </Grid>
  );
}
