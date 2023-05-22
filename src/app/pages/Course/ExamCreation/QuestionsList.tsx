import { Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import theme from "../../../../assets/theme";
import { ManualExamContext } from "./ManualExam";
import Question from "./Question";
import { AutomaticExamContext } from "./AutomaticExam";
import { IExamQuestion } from "../../../types/Exam";

export default function QuestionsList({ isAutomatic,setDisabled }: { isAutomatic: boolean,setDisabled: React.Dispatch<React.SetStateAction<boolean>>}) {
  const { examState, setExamState } = useContext(ManualExamContext);
  const { automaticExamState, setAutomaticExamState } =
    useContext(AutomaticExamContext);
  const mapEntries=  Array.from(
    (isAutomatic
      ? automaticExamState.questions?.entries()
      : examState.questions?.entries()) ?? []
  ); 
  useEffect(() => {
   setDisabled(mapEntries.length === 0);

  }, [automaticExamState, examState]);
  return (
    <Grid container direction="column" spacing={4} paddingTop={2}>
      <Grid item xs={12}>
        {mapEntries.map(([key, value]) => (
          <Stack direction="column" spacing={2} key="key" sx={{ pt: 2 }}>
            <Typography
              variant="h6"
              color={theme.palette.gray.dark}
              sx={{ fontWeight: 700 }}
            >
              {key}
            </Typography>
            {value.map((question) => (
              <Question key={question.id} examQuestion={question} isAutomatic={isAutomatic}/>
            ))}
          </Stack>
        ))}
      </Grid>
    </Grid>
  );
}
