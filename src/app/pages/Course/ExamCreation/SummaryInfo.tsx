import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import theme from "../../../../assets/theme";
import { AutomaticExamContext } from "./AutomaticExam";
import { examContext } from "./Models";

export default function SummaryInfo({ isAutomatic = false }) {
  const { examState, setExamState } = useContext(examContext);
  const { automaticExamState, setAutomaticExamState } =
    useContext(AutomaticExamContext);
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
          {(isAutomatic ? automaticExamState : examState).title}
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
          {(isAutomatic ? automaticExamState : examState).duration}
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
          {(isAutomatic ? automaticExamState : examState).has_models
            ? "Multiple Models"
            : "Single Model"}
        </Typography>
      </Grid>
    </Grid>
  );
}
