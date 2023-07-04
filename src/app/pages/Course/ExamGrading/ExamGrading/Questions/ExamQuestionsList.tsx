import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { gradeExamContext } from "../../Models";
import SingleQuestion from "./SingleQuestion";

export default function ExamQuestionsList() {
  const { gradeState, setGradeState } = useContext(gradeExamContext);

  return (
    <Box sx={{ height: 800, overflow: "auto",width:'100%',px:2 }}>
      {gradeState.loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
      <Stack spacing={2}>
        {gradeState.answers?.map((answer, index) => (
          <SingleQuestion key={answer.id} examQuestion={answer} />
        ))}
      </Stack>
      )}
    </Box>
  );
}
