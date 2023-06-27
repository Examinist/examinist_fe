import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { IQuestion } from "../../../types/Question";
import QuestionAccordion from "../QuestionBank/QuestionAccordion";
import theme from "../../../../assets/theme";
import QuestionBankDialog from "./QuestionBankDialog";
import { useNavigate } from "react-router-dom";
import QuestionsList from "./QuestionsList";
import { examContext } from "./EditExam";
import AddQuestionDialog from "./AddQuestionDialog";
import { IQuestionsContext, QuestionsContext } from "../ExamCreation/Models";

export default function QuestionsBody({setDisabled }: { setDisabled: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [questionsList, setQuestionsList] = React.useState<IQuestion[]>([]);

  const questionsContextValue: IQuestionsContext = {
    questionsList: questionsList,
    setQuestionsList: setQuestionsList,
  };

  return (
    <QuestionsContext.Provider value={questionsContextValue}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          py: 5,
        }}
      >
        <Grid container sx={{ pl: 2 }} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  color={theme.palette.gray.dark}
                  sx={{ fontWeight: 700 }}
                >
                  Questions:
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
                    <QuestionBankDialog />
                  </Grid>
                  <Grid item>
                    <AddQuestionDialog/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <QuestionsList setDisabled={setDisabled} />
          </Grid>
        </Grid>
      </Box>
    </QuestionsContext.Provider>
  );
}
