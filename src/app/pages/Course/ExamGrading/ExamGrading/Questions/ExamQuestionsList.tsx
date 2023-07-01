import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { gradeExamContext } from "../../Models";
import SingleQuestion from "./SingleQuestion";

export default function ExamQuestionsList() {
  const { gradeState, setGradeState } = useContext(gradeExamContext);

  return (
    <Box sx={{ height: 600, overflow: "auto",width:'100%',py:2,px:2 }}>
      <Stack spacing={2}>
        {gradeState.answers?.map((answer, index) => (
          <SingleQuestion key={answer.id} examQuestion={answer} />
        ))}
      </Stack>
    </Box>
  );
}
