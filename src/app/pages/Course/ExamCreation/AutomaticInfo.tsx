import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import theme from "../../../../assets/theme";
import TopicsSelector from "./TopicsSelector";

export default function AutomaticInfo() {
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
      <Typography variant="h6" sx={{ pb: 5, fontWeight: "bold" }}>
        Exam Info :
      </Typography>

      <Grid
        container
        rowSpacing={2}
        sx={{ pl: "50px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Typography variant="subtitle1">Exam Title :</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField id="outlined-basic" sx={{ width: "60%" }} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Exam Duration :</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField id="outlined-basic" sx={{ width: "60%" }} />
        </Grid>
      </Grid>
      <Divider sx={{ p: "20px", borderBottomWidth: "2px" }} />
      <Typography variant="h6" sx={{ pt: 5, pb: 5, fontWeight: "bold" }}>
        Questions :
      </Typography>
      <Grid
        container
        rowSpacing={2}
        sx={{ pl: "50px" }}
        justifyContent="center"
        alignItems="center"
      >
         <Grid item xs={3}>
          <Typography variant="subtitle1">Questions Types</Typography>
        </Grid>
        <Grid item xs={9}>
        <Typography variant="subtitle1">Topics</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">type :</Typography>
        </Grid>
        <Grid item xs={9}>
        <TopicsSelector/>
        </Grid>
  
      </Grid>
    </Box>
  );
}
