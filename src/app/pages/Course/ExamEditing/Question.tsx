import * as React from "react";
import theme from "../../../../assets/theme";
import {
  Box,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DifficultyLevelEnum, IQuestion } from "../../../types/Question";
import { Rectangle } from "../../../components/Rectangle";
import { DefaultQuestionTypesEnum } from "../../../types/CourseSettings";
import QuestionModifications from "../QuestionBank/QuestionModifications";
import { IExamQuestion } from "../../../types/Exam";
import QuestionAnswer from "../QuestionBank/QuestionAnswer";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { examContext, updateContext } from "./EditExam";

export default function Question({
  examQuestion,
}: {
  examQuestion: IExamQuestion;
}) {
  const { examState, setExamState } = React.useContext(examContext);
  const { updateState, setUpdateState } = React.useContext(updateContext);
  const [score, setScore] = React.useState<number>(examQuestion.score);
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === DifficultyLevelEnum.EASY)
      return theme.palette.green.main;
    return questionDifficulty === DifficultyLevelEnum.MEDIUM
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };
  const [isFieldEmpty, setIsFieldEmpty] = React.useState(false);

  const handleRemove = (question: IQuestion) => {
    var stateQuestions = examState.questions;
    if (stateQuestions?.has(question.question_type.name)) {
      const questions = stateQuestions.get(question.question_type.name);
      if (questions) {
        const questionIndex = questions.findIndex(
          (q) => q.question.id === question.id
        );
        if (questionIndex !== -1) {
          questions.splice(questionIndex, 1);
          if (questions.length === 0) {
            stateQuestions.delete(question.question_type.name);
          } else {
            stateQuestions.set(question.question_type.name, questions);
          }
          setExamState({ ...examState, questions: stateQuestions });
        }
        handleUpdateRemove(question);
      }
    }
  };
  const handleUpdateRemove = (question: IQuestion) => {
    if (updateState.exam_questions_attributes) {
      if (examQuestion.id === undefined) {
        const questionIndex = updateState.exam_questions_attributes.findIndex(
          (q) => q.question_id === question.id
        );
        if (questionIndex !== -1) {
          updateState.exam_questions_attributes.splice(questionIndex, 1);
          setUpdateState({
            ...updateState,
            exam_questions_attributes: updateState.exam_questions_attributes,
          });
        }
      } else {
        console.log("here");
        const newQuestion = {
          id: examQuestion.id,
          _destroy: true,
        };
        updateState.exam_questions_attributes?.push(newQuestion);
        setUpdateState({
          ...updateState,
          exam_questions_attributes: updateState.exam_questions_attributes,
        });
      }
    }
  };

  function handleChange(value: string): void {
    setScore(parseInt(value));
    var stateQuestions = examState.questions;
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

    setExamState({ ...examState, questions: stateQuestions });
    handleUpdateScore(parseInt(value));
    setIsFieldEmpty(value.toString().trim() === "" || parseInt(value) < 1);
  }
  const handleUpdateScore = (value: number) => {
    if (updateState.exam_questions_attributes) {
      if (examQuestion.id === undefined) {
        console.log("here");
        const questionIndex = updateState.exam_questions_attributes.findIndex(
          (q) => q.question_id === examQuestion.question.id
        );
        if (questionIndex !== -1) {
          updateState.exam_questions_attributes.splice(questionIndex, 1);
          const newQuestion = {
            question_id: examQuestion.question.id,
            score: value,
          };
          updateState.exam_questions_attributes.push(newQuestion);
          setUpdateState({
            ...updateState,
            exam_questions_attributes: updateState.exam_questions_attributes,
          });
        }
      } else {
        console.log("there");
        const newQuestion = {
          id: examQuestion.id,
          score: value,
        };
        updateState.exam_questions_attributes?.push(newQuestion);
        setUpdateState({
          ...updateState,
          exam_questions_attributes: updateState.exam_questions_attributes,
        });
      }
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
                <IconButton
                  aria-label="back"
                  size="large"
                  onClick={() => {
                    handleRemove(examQuestion.question);
                  }}
                >
                  <DeleteOutlineOutlinedIcon fontSize="inherit" />
                </IconButton>
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
      <Divider orientation="horizontal" flexItem sx={{ pt: 2 }}></Divider>

      <Grid item>
        <TextField
          required
          type="number"
          id="standard-basic"
          label="Score"
          variant="standard"
          value={score}
          inputProps={{ min: "1" }}
          onChange={(e) => handleChange(e.target.value)}
          error={isFieldEmpty}
        />
        {isFieldEmpty && (
          <FormHelperText error>
            This field is required and must be at least 1
          </FormHelperText>
        )}
      </Grid>
    </Grid>
  );
}
