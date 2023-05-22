import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import theme from "../../../../assets/theme";
import RadioButtonOptions from "./RadioButtonOptions";
import { ManualExamContext } from "./ManualExam";

export default function ManualInfo({
  setDisabled,
}: {
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { examState, setExamState } = useContext(ManualExamContext);
  const [isTitleEmpty, setIsTitleEmpty] = useState(examState.title?.trim() === "");
  const [isDurationEmpty, setIsDurationEmpty] = useState((examState.duration ?? 0) < 30);
  useEffect(() => {
    setDisabled(isTitleEmpty || isDurationEmpty)
  },[]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamState({ ...examState, title: e.target.value });
    setIsTitleEmpty(e.target.value.toString().trim() === "");
    setDisabled(!e.target.value || isDurationEmpty);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamState({ ...examState, duration: parseInt(e.target.value) });
    setIsDurationEmpty(!e.target.value || parseInt(e.target.value) < 30);
    setDisabled(!e.target.value || parseInt(e.target.value) < 30 || isTitleEmpty);

  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        marginTop: "50px",
        p: 5,
        pl: "50px",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h5" sx={{ pb: 5, fontWeight: "bold" }}>
        General Info :
      </Typography>

      <form>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
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
              onChange={handleTitleChange}
              required
              error={isTitleEmpty}
            />
            {isTitleEmpty && (
              <FormHelperText error>This field is required.</FormHelperText>
            )}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Exam Duration (mins) :</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              type="number"
              value={examState.duration}
              id="outlined-basic"
              sx={{ width: "60%" }}
              onChange={handleDurationChange}
              required
              error={isDurationEmpty}
              inputProps={{ min: "30" }}
              
            />
            {isDurationEmpty && (
              <FormHelperText error>This field is required and must be at least 30</FormHelperText>
            )}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Exam Models :</Typography>
          </Grid>
          <Grid item xs={9}>
            <RadioButtonOptions />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
