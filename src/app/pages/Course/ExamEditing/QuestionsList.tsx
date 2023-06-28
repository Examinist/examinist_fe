import { Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import theme from "../../../../assets/theme";
import { examContext } from "../ExamCreation/Models";
import Question from "./Question";
import { IExamQuestion } from "../../../types/Exam";

export default function QuestionsList({ setDisabled }: { setDisabled: React.Dispatch<React.SetStateAction<boolean>>}) {
  const { examState, setExamState } = useContext(examContext);

  const mapEntries=  Array.from(
  examState.questions?.entries() ?? []
); 
console.log(mapEntries);
  useEffect(() => {
   setDisabled(mapEntries.length === 0);

  }, [ examState]);
  return (
    <Grid container direction="column" spacing={4} paddingTop={2}>
      <Grid item xs={12}>
        {mapEntries.map(([key, value]) => (
          <Stack direction="column" spacing={2} key={key} sx={{ pt: 2 }} >
          
            <Typography
              variant="h6"
              color={theme.palette.gray.dark}
              sx={{ fontWeight: 700 }}
            >
              {key}
            </Typography>
            {value.map((question) => (
              <Question key={question.id} examQuestion={question} />
            ))}
          </Stack>
        ))}
      </Grid>
    </Grid>
  );
}
