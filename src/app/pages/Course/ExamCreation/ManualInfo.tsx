import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import theme from "../../../../assets/theme";

export default function ManualInfo() {
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
          <TextField id="outlined-basic" sx={{width:'60%'}}/>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Exam Duration :</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField id="outlined-basic" sx={{width:'60%'}}/>
        </Grid>
      </Grid>
    </Box>
  );
}
