import * as React from "react";
import {
  Box,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
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
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" ,justifyContent:'center'}}>
        <Divider sx={{ width: "430px", borderColor: theme.palette.grey[800] }} />
        <Typography
          sx={{ px: 1, color: theme.palette.gray.dark, fontWeight: 500 }}
        >
          Grade
        </Typography>
        <Divider sx={{ width: "430px", borderColor: theme.palette.grey[800] }} />
      </Box>
      {/* <TextField
        required
        id="standard-basic"
        label="Score"
        variant="standard"
        value={10}
        onChange={(e) => handleChange(e.target.value)}
        error={isFieldEmpty}

      />
      {isFieldEmpty && (
        <FormHelperText error>
          This field is required and must be at least 1
        </FormHelperText>
      )} */}
    </Stack>
  );
}
