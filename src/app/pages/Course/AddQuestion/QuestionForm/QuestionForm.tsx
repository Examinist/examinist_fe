import React from "react";
import { IQuestion } from "../../../../types/Question";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import SelectTopic from "./components/SelectTopic";
import SelectDifficulty from "./components/SelectDifficulty";
import QuestionCard from "./components/QuestionCard";
import SelectQuestionType from "./components/SelectQuestionType";

interface IQuestionFormProps {
  questionType: string;
  mode: "new" | "edit";
  question?: IQuestion;
}

interface IChoice{
  choice: string;
  checked: boolean;
}

interface IFormInputs {
  questionType: string;
  topic: string;
  difficulty: string;
  header: string;
  answerType: string;
  choices?: IChoice[];
  correctAnswer: string[];
}

export default function QuestionForm({
  questionType,
}: IQuestionFormProps) {
  const methods = useForm<IFormInputs>({
    defaultValues: {
      questionType: "",
      topic: "",
      difficulty: "easy",
      header: "",
      answerType:"single",
      choices: [{choice: "", checked: false}, {choice: "", checked: false}],
      correctAnswer: [],
    },
  });

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

  const { handleSubmit } = methods;

  return (
    <Box sx={{ height: "100%" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={5}
              md={3}
              sx={{
                background: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontSize: "25px", fontWeight: "500", px: 3, py: 2 }}
                color="#6B6767"
              >
                Add New Question
              </Typography>
              <Divider />
              <SelectQuestionType />
              <SelectTopic />
              <SelectDifficulty />
            </Grid>
            <Grid item xs={7} md={9} sx={{ px: 6, py: 4, height: "100%" }}>
              <QuestionCard questionType={questionType} />
              <Button
                variant="contained"
                sx={{ ml: "auto", mt: "auto", px: 4, borderRadius: 3 }}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
