import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Divider, Grid, Stack, TextField, styled } from "@mui/material";
import { useState } from "react";
import { IStudentAnswer } from "../../../../../types/StudentExam";
import { DefaultQuestionTypesEnum } from "../../../../../types/CourseSettings";
import theme from "../../../../../../assets/theme";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
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
  examQuestion,
}: {
  examQuestion: IStudentAnswer;
}) {
  return (
    <Grid container direction="column" marginLeft={5} spacing={1}>
      {examQuestion.question.question.question_type.name ==
        DefaultQuestionTypesEnum.MCQ ||
      examQuestion.question.question.question_type.name ==
        DefaultQuestionTypesEnum.T_F ? (
        examQuestion.question.question.choices?.map((choice, index) => {
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
                    examQuestion.answers?.includes(choice.choice!)
                      ? theme.palette.grey[400]
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
              <Grid item>
                {choice.is_answer ? (
                  <CheckIcon sx={{ color: theme.palette.green.main }} />
                ) : (
                  examQuestion.answers?.includes(choice.choice!) && (
                    <ClearIcon sx={{ color: theme.palette.red.main }} />
                  )
                )}
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Stack spacing={2}>
          <Box
            sx={{
              width: "95%",
              border: 1,
              borderRadius: 3,
              borderColor: theme.palette.gray.main,
            }}
          >
            <Box sx={{ color: theme.palette.gray.dark, px: 2, pt: 1 }}>
              Answer
            </Box>
            <Typography variant="body1" sx={{ p: 2 }}>
              {examQuestion.answers?.[0]}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Divider
              sx={{ width: "400px", borderColor: theme.palette.grey[800] }}
            />
            <Typography
              sx={{ px: 1, color: theme.palette.gray.dark, fontWeight: 500 }}
            >
              Model Answer
            </Typography>
            <Divider
              sx={{ width: "400px", borderColor: theme.palette.grey[800] }}
            />
          </Box>
          <Box
            sx={{
              width: "95%",
              border: 1,
              borderRadius: 3,
              borderColor: theme.palette.gray.main,
              backgroundColor:"#E3FFEB",
            }}
          >
            <Box sx={{ color: theme.palette.gray.dark, px: 2, pt: 1 }}>
              Answer
            </Box>
            <Typography variant="body1" sx={{ p: 2 }}>
              {examQuestion.question.question.correct_answers?.[0].answer}
            </Typography>
          </Box>
        </Stack>
      )}
    </Grid>
  );
}
