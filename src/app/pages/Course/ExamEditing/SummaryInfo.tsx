import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import theme from "../../../../assets/theme";
import RadioButtonOptions from "./RadioButtonOptions";
import { examContext } from "../ExamCreation/Models";

export default function SummaryInfo() {
  const { examState, setExamState } = useContext(examContext);
  return (
    <Grid
      container
      rowSpacing={2}
      sx={{ py: 3, px: 3 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3} component={"span"}>
        <Typography variant="h6" color={theme.palette.gray.dark}>
          Exam Title :
        </Typography>
      </Grid>
      <Grid item xs={9} component={"span"}>
        <Typography
          variant="h6"
          color={theme.palette.gray.dark}
          sx={{ fontWeight: 400 }}
        >
          { examState.title}
        </Typography>
      </Grid>
      <Grid item xs={3} component={"span"}>
        <Typography variant="h6" color={theme.palette.gray.dark}>
          Exam Duration :
        </Typography>
      </Grid>
      <Grid item xs={9} component={"span"}>
        <Typography
          variant="h6"
          color={theme.palette.gray.dark}
          sx={{ fontWeight: 400 }}
        >
          {examState.duration}
        </Typography>
      </Grid>
      <Grid item xs={3} component={"span"}>
        <Typography variant="h6" color={theme.palette.gray.dark}>
          Exam Models :
        </Typography>
      </Grid>
      <Grid item xs={9} component={"span"}>
        <Typography
          variant="h6"
          color={theme.palette.gray.dark}
          sx={{ fontWeight: 400 }}
        >
          {examState.has_models
            ? "Multiple Models"
            : "Single Model"}
        </Typography>
      </Grid>
    </Grid>
  );
}
