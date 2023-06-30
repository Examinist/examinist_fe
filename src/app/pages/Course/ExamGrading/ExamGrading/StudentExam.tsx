import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import QuestionsSideBar from "./QuestionsSideBar";
import UpperGradingBar from "./UpperGradingBar";

export default function StudentExam() {
  const { examId } = useParams<{ examId: string }>();
  const { studentExamId } = useParams<{ studentExamId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <UpperGradingBar />
      {isLoading ? (
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
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <Box sx={{ width: "200px" }}>
              <QuestionsSideBar />
            </Box>{" "}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
