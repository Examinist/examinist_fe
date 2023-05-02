import { Box, Grid, Paper, Typography } from "@mui/material";

import React from "react";
import theme from "../../../../assets/theme";

interface ISimpleInfo {
  title: string;
  content: any;
}
export default function SimpleInfo({ title, content }: ISimpleInfo) {
  return (
    <Grid
      container
      sx={{ backgroundColor: theme.palette.white.main, py: 2.5, px: 5, borderRadius: 5 }}
    >
      <Grid item xs={2.5}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "medium",
          }}
        >
          {title} :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography
          sx={{
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {content}
        </Typography>
      </Grid>
    </Grid>
  );
}
