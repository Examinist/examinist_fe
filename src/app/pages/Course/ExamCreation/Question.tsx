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
import { AutomaticExamContext } from "./AutomaticExam";
import { ManualExamContext } from "./ManualExam";

export default function Question({
  examQuestion,
  isAutomatic,
}: {
  examQuestion: IExamQuestion;
  isAutomatic: boolean;
}) {
  const { examState, setExamState } = React.useContext(ManualExamContext);
  const { automaticExamState, setAutomaticExamState } =
    React.useContext(AutomaticExamContext);
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === DifficultyLevelEnum.EASY)
      return theme.palette.green.main;
    return questionDifficulty === DifficultyLevelEnum.MEDIUM
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };

  function getValue(): number {
    return (
      (isAutomatic ? automaticExamState : examState).questions
        ?.get(examQuestion.question.question_type.name)
        ?.find((question) => question.id == examQuestion.question.id)?.score ??
      0
    );
  }

  function handleChange(value: string): void {
    var stateQuestions = isAutomatic
      ? automaticExamState.questions
      : examState.questions;
    if (stateQuestions?.has(examQuestion.question.question_type.name)) {
      const questions = stateQuestions.get(
        examQuestion.question.question_type.name
      );
      if (questions) {
        const question = questions.find(
          (q) => q.question.id === examQuestion.question.id
        );
        if (question) {
          question.score = parseInt(value);
        }
      }
    }
    if (isAutomatic) {
      setAutomaticExamState({
        ...automaticExamState,
        questions: stateQuestions,
      });
    } else {
      setExamState({ ...examState, questions: stateQuestions });
    }
  }

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
      <Grid item>
      {examQuestion.question.question_type
        ? ((examQuestion.question.question_type.name ==
          DefaultQuestionTypesEnum.MCQ ||
          examQuestion.question.question_type.name ==
            DefaultQuestionTypesEnum.T_F) && (
            <QuestionAnswer question={examQuestion.question} creation={true}/>
          ))
        : undefined}
        </Grid>
      <Divider orientation="horizontal" flexItem sx={{ pt: 2 }}></Divider>

      <Grid item>
        <TextField
          type="number"
          id="standard-basic"
          label="Score"
          variant="standard"
          value={getValue()}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
