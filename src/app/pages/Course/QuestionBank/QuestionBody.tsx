import * as React from "react";
import Typography from "@mui/material/Typography";
import theme from "../../../../assets/theme";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Grid, styled } from "@mui/material";

const Circle = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "30px",
  height: "30px",
  backgroundColor: theme.palette.primary.dark,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
}));

export default function QuestionBody() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginLeft={20}
    >
      <Grid
        item
        container
        direction="row"
        alignItems="baseline"
        >
        <Grid item>
          <Circle>A</Circle>
        </Grid>
        <Grid item>
        <Typography
          sx={{
            fontSize: "1rem",
            color: theme.palette.text.primary,
            mt: "7px",
            mx: "30px",
          }}
        >
          question
        </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
