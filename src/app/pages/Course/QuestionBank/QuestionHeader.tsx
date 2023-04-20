import * as React from "react";
import theme from "../../../../assets/theme";
import { Grid, Typography, styled } from "@mui/material";
import QuestionModifications from "./QuestionModifications";
import { DefaultQuestionTypesEnum, IQuestion } from "../../../types/Question";

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
  const [spacing, setSpacing] = React.useState(2);
  const getColor = (questionDifficulty: string) => {
    if (questionDifficulty === "easy") return theme.palette.green.main;
    return questionDifficulty === "medium"
      ? theme.palette.yellow.main
      : theme.palette.red.main;
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle2" color={theme.palette.gray.dark}>
              {question.topic}
            </Typography>
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
                  {question.questionType == DefaultQuestionTypesEnum.MCQ
                    ? `${question.questionType} ( ${question.answerType} )`
                    : question.questionType}
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
        <Typography variant="subtitle2" color={theme.palette.gray.dark}>
          {question.header}
        </Typography>
      </Grid>
    </Grid>
  );
}
