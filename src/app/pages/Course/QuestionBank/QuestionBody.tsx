import * as React from "react";
import Typography from "@mui/material/Typography";
import theme from "../../../../assets/theme";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Grid, TextField, styled } from "@mui/material";
import { DefaultQuestionTypesEnum, IQuestion } from "../../../types/Question";
import { useState } from "react";

const Circle = styled("div")(({ theme, color }) => ({
  position: "relative",
  display: "flex",
  width: "30px",
  height: "30px",
  backgroundColor: color,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  borderColor:theme.palette.gray.main,
  borderStyle: "solid",
  borderWidth: "1px",
}));


export default function QuestionBody(question: IQuestion) {
  const [text, setText] = useState("");

  const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };
  return (
    <Grid
      container
      direction="column"
      marginLeft={20}
      spacing={1}
    >
      {question.questionType == DefaultQuestionTypesEnum.MCQ ||
      question.questionType == DefaultQuestionTypesEnum.T_F ? (
        question.choices?.map((choice, index) => {
          return (
            <Grid item container direction="row" alignItems="baseline" >
              <Grid item>
                <Circle
                  color ={
                    choice.isCorrect
                      ? theme.palette.green.main
                      : theme.palette.white.main
                  }
                >
                  {index+1}
                </Circle>
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
                  {choice.choice}
                </Typography>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid
        container
        direction="column"

      >
          <TextField
          sx={{width:"500px"}}
            id="outlined-multiline-static"
            label="Answer"
            multiline
            rows={4}
            variant="outlined"
            value={text}
            onChange={handleTextChange}
            disabled={true}
          />
        </Grid>
      )}
    </Grid>
  );
}


