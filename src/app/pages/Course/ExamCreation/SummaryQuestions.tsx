import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import theme from "../../../../assets/theme";
import RadioButtonOptions from "./RadioButtonOptions";
import { ManualExamContext } from "./ManualExam";
import { AutomaticExamContext } from "./AutomaticExam";
import { get } from "react-hook-form";
import { IExamQuestion } from "../../../types/Exam";

export default function SummaryQuestions({ isAutomatic = false }) {
  const [total, setTotal] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const { examState, setExamState } = useContext(ManualExamContext);
  const { automaticExamState, setAutomaticExamState } =
    useContext(AutomaticExamContext);
  const mapEntries = Array.from(
    (isAutomatic
      ? automaticExamState.questions?.entries()
      : examState.questions?.entries()) ?? []
  );
  React.useEffect(() => {
    let newTotal = 0;
    mapEntries.forEach(([key, value]) => {
      newTotal += value.length;
      value.forEach((question) => {
        setScore(score + question.score);
      });
    });
    setTotal(newTotal);
  }, [mapEntries]);

  const getScore = (questions: IExamQuestion[]) => {
    let score = 0;
    questions.forEach((question) => {
      score += question.score;
    });
    return score;
  };
  return (
    <Grid
      container
      rowSpacing={2}
      sx={{ py: 3, px: 3 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Typography variant="h6" color={theme.palette.gray.dark}>
          Type :
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="h6"
          color={theme.palette.gray.dark}
          sx={{ fontWeight: 400 }}
        >
          # of Questions
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography
          variant="h6"
          color={theme.palette.gray.dark}
          sx={{ fontWeight: 400 }}
        >
          Scores
        </Typography>
      </Grid>
      {mapEntries.map(([key, value]) => (
        <>
          <Grid item xs={3}>
            <Typography variant="h6" color={theme.palette.gray.dark}>
              {key} :
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              color={theme.palette.gray.dark}
              sx={{ fontWeight: 400 }}
            >
              {value.length}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant="h6"
              color={theme.palette.gray.dark}
              sx={{ fontWeight: 400 }}
            >
              {getScore(value)}
            </Typography>
          </Grid>
        </>
      ))}
      <Grid item xs={12}>
        <Divider orientation="horizontal" flexItem sx={{ pt: 2 }}></Divider>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h6" color={theme.palette.gray.dark}>
          Total :
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="h6"
          color={theme.palette.gray.dark}
          sx={{ fontWeight: 400 }}
        >
          {total}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography
          variant="h6"
          color={theme.palette.gray.dark}
          sx={{ fontWeight: 400 }}
        >
          {score}
        </Typography>
      </Grid>
    </Grid>
  );
}
