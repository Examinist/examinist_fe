import { Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import theme from "../../../../assets/theme";
import { ManualExamContext } from "./ManualExam";
import Question from "./Question";

export default function QuestionsList({ isAutomatic = false }) {
  const { examState, setExamState } = useContext(ManualExamContext);
  const mapEntries = Array.from(examState.questions?.entries() ?? []);

  return (
    <Grid container direction="column" spacing={4} paddingTop={2}>
      <Grid item xs={12}>
        {mapEntries.map(([key, value]) => (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            key="key"
          >
            <Typography
              variant="h6"
              color={theme.palette.gray.dark}
              sx={{ fontWeight: 700 }}
            >
              {key}
            </Typography>
            {value.map((question) => (
              <Question key={question.id} {...question} />
            ))}
          </Stack>
        ))}
      </Grid>
    </Grid>
  );
}
