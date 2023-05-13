import { Box, Divider, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import { IQuestion } from "../../../types/Question";
import QuestionAccordion from "../QuestionBank/QuestionAccordion";

export default function QuestionsList(questions: IQuestion[]) {
  return (
    <div>
      <Grid container direction="column" spacing={4} paddingTop={2}>
        {questions.map((question) => {
          return (
            <Grid key={question.id} item xs>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <QuestionAccordion key={question.id} {...question} />
                <TextField
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                />
              </Stack>
            </Grid>
          );
        })}

        {questions.length === 0 && (
          <Box sx={{ p: 3 }}>No Questions to show for this Course.</Box>
        )}
      </Grid>
    </div>
  );
}
