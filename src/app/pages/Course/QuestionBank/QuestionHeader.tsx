import * as React from "react";
import theme from "../../../../assets/theme";
import { Grid, Typography } from "@mui/material";
import QuestionModifications from "./QuestionModifications";

export default function QuestionHeader() {
  const [spacing, setSpacing] = React.useState(2);

  return (
    <Grid container >
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle2" color={theme.palette.gray.dark}>
              topic
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography variant="subtitle2" color={theme.palette.gray.dark}>
                  essay
                </Typography>
              </Grid>
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    backgroundColor: theme.palette.primary.dark,
                    borderRadius: 5,
                  }}
                ></div>
              </Grid>
              <Grid item>
                <QuestionModifications/>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
      <Grid item>
            <Typography variant="subtitle2" color={theme.palette.gray.dark}>
            Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
    </Grid>
  );
}
