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

export default function SingleQuestion({
  examQuestion,
}: {
  examQuestion: IStudentAnswer;
}) {
  //   const [score, setScore] = React.useState<string>(examQuestion.score?.toString??"");
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === DifficultyLevelEnum.EASY)
      return theme.palette.green.main;
    return questionDifficulty === DifficultyLevelEnum.MEDIUM
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };
  const [isFieldEmpty, setIsFieldEmpty] = React.useState(false);

  function handleChange(value: string): void {
    // setScore(parseInt(value));
  }

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
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: 5, backgroundColor: theme.palette.red.main }}
        >
          Wrong Answer
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: 5, backgroundColor: theme.palette.green.main }}
        >
          Full Mark
        </Button>
        <Box
          sx={{
            border: 1,
            borderRadius: 3,
            borderColor: theme.palette.gray.main,
            height: "40px",
            width: "120px",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <InputBase
              sx={{ ml: 1, flex: 1, width: "60px" }}
              placeholder="score"
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
      </Stack>
    </Stack>
  );
}
