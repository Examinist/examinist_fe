import { Divider, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import theme from "../../../../assets/theme";
import { IDetailedExam, IExamQuestion } from "../../../types/Exam";
import ExamViewQuestion from "./ExamViewQuestion";

export default function ExamViewList({ exam }: { exam: IDetailedExam }) {
  console.log(exam);
  return (
    <Grid container direction="column" spacing={4} paddingTop={2}>
      <Grid item xs={12}>
        {exam.exam_questions.map((element, index) =>
          Object.keys(element).map((key) => (
            <Stack direction="column" spacing={2} key="key" sx={{ pt: 2 }}>
              <Typography
                variant="h6"
                color={theme.palette.gray.dark}
                sx={{ fontWeight: 700, fontSize: 25 }}
              >
                {key}
              </Typography>
              {element[key].map((question: IExamQuestion) => (
                <Stack direction="column" spacing={2} key="key" sx={{ pt: 2 }}>
                  <ExamViewQuestion key={question.id} examQuestion={question} />
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ pt: 2 }}
                  ></Divider>
                </Stack>
              ))}
            </Stack>
          ))
        )}
      </Grid>
    </Grid>
  );
}
