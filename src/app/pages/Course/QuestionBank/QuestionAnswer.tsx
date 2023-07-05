import * as React from "react";
import Typography from "@mui/material/Typography";
import theme from "../../../../assets/theme";
import { Box, Grid, TextField, styled } from "@mui/material";
import { IQuestion } from "../../../types/Question";
import { useState } from "react";
import { DefaultQuestionTypesEnum } from "../../../types/CourseSettings";

const Circle = styled("div")(({ theme, color }) => ({
  position: "relative",
  display: "flex",
  width: "30px",
  height: "30px",
  backgroundColor: color,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  borderColor: theme.palette.gray.main,
  borderStyle: "solid",
  borderWidth: "1px",
}));

export default function QuestionAnswer({
  question,
  creation = false,
}: {
  question: IQuestion;
  creation?: boolean;
}) {
  return (
    <Grid container direction="column" marginLeft={5} spacing={1}>
      {question.question_type.name == DefaultQuestionTypesEnum.MCQ ||
      question.question_type.name == DefaultQuestionTypesEnum.T_F ? (
        question.choices?.map((choice, index) => {
          return (
            <Grid
              key={choice.id!}
              item
              container
              direction="row"
              alignItems="baseline"
            >
              <Grid item>
                <Circle
                  color={
                    creation
                      ? theme.palette.white.main
                      : choice.is_answer
                      ? theme.palette.green.main
                      : theme.palette.white.main
                  }
                >
                  {index + 1}
                </Circle>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: theme.palette.text.primary,
                    mt: "7px",
                    mx: "30px",
                  }}
                >
                  {choice.choice}
                </Typography>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid container direction="column">
          <Box
            sx={{
              mr: 8,
              border: 1,
              borderRadius: 3,
              borderColor: theme.palette.gray.main,
            }}
          >
            <Box sx={{ color: theme.palette.gray.dark, px: 2, pt: 1 }}>
              Answer
            </Box>
            <Typography variant="body1" sx={{ p: 2 }}>
              {question.correct_answers?.[0].answer}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
