import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IStudentAnswer } from "../../../../../types/StudentExam";
import { DifficultyLevelEnum } from "../../../../../types/Question";
import { Rectangle } from "../../../../../components/Rectangle";
import theme from "../../../../../../assets/theme";
import QuestionAnswer from "./QuestionAnswer";
import { gradeExamContext } from "../../Models";
import { useContext } from "react";
import { DefaultQuestionTypesEnum } from "../../../../../types/CourseSettings";

export default function SingleQuestion({
  examQuestion,
}: {
  examQuestion: IStudentAnswer;
}) {
  const { gradeState, setGradeState } = useContext(gradeExamContext);
  const [score, setScore] = React.useState<number>();
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === DifficultyLevelEnum.EASY)
      return theme.palette.green.main;
    return questionDifficulty === DifficultyLevelEnum.MEDIUM
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };
  const [isFieldEmpty, setIsFieldEmpty] = React.useState(false);

  function handleChange(value: string): void {
    setScore(parseInt(value));
    const val = parseInt(value);
    if (val > examQuestion.question.score) {
      setIsFieldEmpty(true);
    } else {
      setIsFieldEmpty(false);
      setGradeState({
        ...gradeState,
        answers: gradeState.answers?.map((answer: IStudentAnswer) => {
          if (answer.id === examQuestion.id) {
            return {
              ...answer,
              score: value.trim() === "" ? undefined : val,
            };
          }
          return answer;
        }),
      });
      handleUpdateScore(val);
    }
  }

  const onMark = (type: string) => {
    setGradeState({
      ...gradeState,
      answers: gradeState.answers?.map((answer: IStudentAnswer) => {
        if (answer.id === examQuestion.id) {
          return {
            ...answer,
            score: type === "correct" ? examQuestion.question.score : 0,
          };
        }
        return answer;
      }),
    });

    setScore(type === "correct" ? examQuestion.question.score : 0);
    handleUpdateScore(type === "correct" ? examQuestion.question.score : 0);
  };
  const handleUpdateScore = (value: number) => {
    if (gradeState.student_answers_attributes) {
      const questionIndex = gradeState.student_answers_attributes.findIndex(
        (q) => q.id === examQuestion.id
      );
      if (questionIndex !== -1) {
        gradeState.student_answers_attributes.splice(questionIndex, 1);
      }
      if (!isNaN(value)) {
        const newQuestion = {
          id: examQuestion.id,
          score: value,
        };
        gradeState.student_answers_attributes.push(newQuestion);
      }
      setGradeState({
        ...gradeState,
        student_answers_attributes: gradeState.student_answers_attributes,
      });
    }
  };
  React.useEffect(() => {
    if (examQuestion.score !== undefined) {
      setScore(examQuestion.score);
    }
  }, []);

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.white.main,
        px: 2,
        py: 2,
        borderRadius: 10,
      }}
      spacing={2}
      direction="column"
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Grid item>
          <Grid container direction="row">
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
                  {examQuestion.question.question.topic?.name || "Undefined"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Chip
                label={examQuestion.question.question.question_type.name}
                sx={{ color: theme.palette.gray.dark, fontWeight: 500 }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="subtitle2" color={theme.palette.gray.dark}>
                {examQuestion.question.question.difficulty}
              </Typography>
            </Grid>
            <Grid item>
              <Rectangle
                color={getColor(examQuestion.question.question.difficulty)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        variant="subtitle2"
        color={theme.palette.gray.dark}
        sx={{ fontSize: 20, pb: 2 }}
      >
        {examQuestion.question.question.header}
      </Typography>
      <QuestionAnswer examQuestion={examQuestion} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Divider
          sx={{ width: "430px", borderColor: theme.palette.grey[800] }}
        />
        <Typography
          sx={{ px: 1, color: theme.palette.gray.dark, fontWeight: 500 }}
        >
          Grade
        </Typography>
        <Divider
          sx={{ width: "430px", borderColor: theme.palette.grey[800] }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 2 }}>{/* Empty space */}</Box>
        {examQuestion.question.question.question_type.name !=
          DefaultQuestionTypesEnum.MCQ &&
        examQuestion.question.question.question_type.name !=
          DefaultQuestionTypesEnum.T_F ? (
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: "200px",
                borderRadius: 5,
                backgroundColor: theme.palette.red.main,
                flexGrow: 1,
              }}
              onClick={() => onMark("false")}
            >
              Wrong Answer
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "200px",
                borderRadius: 5,
                backgroundColor: "#3FC164",
                flexGrow: 1,
                ml: 3,
              }}
              onClick={() => onMark("correct")}
            >
              Full Mark
            </Button>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 2 }}>{/* Empty space */}</Box>
        )}
        <Box
          sx={{
            border: 1,
            borderRadius: 3,
            borderColor: theme.palette.gray.main,
            height: "40px",
            width: "120px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ ml: "auto" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, width: "60px" }}
              placeholder="score"
              value={score}
              onChange={(e) => handleChange(e.target.value)}
              inputProps={{
                type: "number",
                min: 0,
                max: examQuestion.question.score,
                "aria-label": "search google maps",
              }}
            />
            <Divider
              orientation="vertical"
              sx={{ height: "40px", borderColor: theme.palette.grey[800] }}
            />
            <Typography
              sx={{
                color: theme.palette.gray.dark,
                fontWeight: 500,
                width: "30px",
              }}
            >
              {examQuestion.question.score}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        {isFieldEmpty && (
          <FormHelperText error>
            the score can't be greater than the question score
          </FormHelperText>
        )}
      </Stack>
    </Stack>
  );
}
