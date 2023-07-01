import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { gradeExamContext } from "../Models";
import { IStudentAnswer } from "../../../../types/StudentExam";
import { Divider, Grid, Typography } from "@mui/material";

export default function QuestionsSideBar() {
  const { gradeState, setGradeState } = useContext(gradeExamContext);
  const getScore = (answer: IStudentAnswer) => {
    if (answer.score === undefined) {
      return `-/${answer.question.score}`;
    }
    return `${answer.score}/${answer.question.score}`;
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        height: "90vh",
        width: "200px",
        py: 2,
        border: 1,
        borderColor: theme.palette.gray.light,
      }}
    >
      <Box
        sx={{
          fontSize: 24,
          fontWeight: 600,
          color: theme.palette.gray.dark,
          px: 3,
        }}
      >
        Questions
      </Box>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 520,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {gradeState.answers?.map((answer, index) => {
          const currentType = answer.question.question.question_type.name;
          const prevType =
            index > 0
              ? gradeState.answers?.at(index - 1)?.question.question
                  .question_type.name
              : "";

          return (
            <>
              {currentType !== prevType && (
                <ListSubheader
                  key={`subheader-${currentType}`}
                  sx={{ fontSize: 16, fontWeight: "bold" }}
                >
                  {currentType}
                </ListSubheader>
              )}
              <ListItem key={`item-${answer.id}`}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <ListItemText primary={`Question ${index + 1}`} />
                  <Box sx={{ flexGrow: 1, pl: 4 }} />
                  <ListItemText primary={`${getScore(answer)}`} />
                </Box>{" "}
              </ListItem>
            </>
          );
        })}
      </List>
      <Box>
        <Divider
          orientation="horizontal"
          sx={{ color: "#272727", p: "10px", borderBottomWidth: "2px" }}
        ></Divider>

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
          sx={{ pt: 2 }}
        >
          <Grid item sx={{ px: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.gray.dark,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {`Total Score: `}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.gray.dark,
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              {`${gradeState.partialScore} / ${gradeState.totalScore}`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
