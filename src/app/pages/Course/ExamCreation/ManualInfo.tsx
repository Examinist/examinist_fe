import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import theme from "../../../../assets/theme";
import RadioButtonOptions from "./RadioButtonOptions";
import { ManualExamContext } from "./ManualExam";

export default function ManualInfo() {
  const { examState, setExamState } = useContext(ManualExamContext);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        marginTop: "50px",
        p: "20px",
        pl: "50px",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h5" sx={{ pb: 5, fontWeight: "bold" }}>
        General Info :
      </Typography>

      <Grid
        container
        rowSpacing={2}
        sx={{ pl: "50px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Typography variant="h6">Exam Title :</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={examState.title}
            id="outlined-basic"
            sx={{ width: "60%" }}
            onChange={(e) =>
              setExamState({ ...examState, title: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Exam Duration :</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            type="number"
            value={examState.duration}
            id="outlined-basic"
            sx={{ width: "60%" }}
            onChange={(e) =>
              setExamState({ ...examState, duration: parseInt(e.target.value) })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Exam Models :</Typography>
        </Grid>
        <Grid item xs={9}>
          <RadioButtonOptions />
        </Grid>
      </Grid>
    </Box>
  );
}
