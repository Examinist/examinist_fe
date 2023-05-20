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

export default function ExamViewQuestion({
  examQuestion,
}: {
  examQuestion: IExamQuestion;
}) {
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === DifficultyLevelEnum.EASY)
      return theme.palette.green.main;
    return questionDifficulty === DifficultyLevelEnum.MEDIUM
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };

  return (
    <Grid
      container
      sx={{
        pt: 2,
        pb: 3,
        pr: 6,
        pl: 2,
      }}
      spacing={2}
      direction="column"
    >
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          color={theme.palette.gray.dark}
          sx={{ fontSize: 20, pb: 2 }}
        >
          {examQuestion.question.header}
        </Typography>
      </Grid>
      <Grid item>
        {examQuestion.question.question_type
          ? (examQuestion.question.question_type.name ==
              DefaultQuestionTypesEnum.MCQ ||
              examQuestion.question.question_type.name ==
                DefaultQuestionTypesEnum.T_F) && (
              <QuestionAnswer
                question={examQuestion.question}
                creation={true}
              />
            )
          : undefined}
      </Grid>

      <Grid
        sx={{ pt: 4, pl: 5 }}
        item
        container
        direction="row"
        alignItems={"end"}
        justifyContent={"end"}
        justifyItems={"end"}
        spacing={3}
      >
        <Grid item>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              variant="subtitle2"
              color={theme.palette.gray.dark}
              sx={{ fontWeight: 700 }}
            >
              Topic:
            </Typography>
            <Typography variant="subtitle2" color={theme.palette.gray.dark}>
              {examQuestion.question.topic?.name || "Undefined"}
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <Typography variant="subtitle2" color={theme.palette.gray.dark}>
            Difficulty : {examQuestion.question.difficulty}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color={theme.palette.gray.dark}>
            Score : {examQuestion.score}
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
}
