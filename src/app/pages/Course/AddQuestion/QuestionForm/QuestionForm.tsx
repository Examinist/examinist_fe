import React from "react";
import { IQuestion } from "../../../../types/Question";
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import QuestionHeader from "./components/form/QuestionHeader";
import Answer from "./components/answers/Answer";
import SelectDifficulty from "./components/form/SelectDifficulty";
import SelectTopic from "./components/form/SelectTopic";

interface IQuestionFormProps {
  questionType: string;
  mode: "new" | "edit";
  question?: IQuestion;
}

interface IFormInputs {
  topic: string;
  difficulty: string;
  header: string;
  answerType: string;
}

export default function QuestionForm({
  questionType,
  mode,
  question,
}: IQuestionFormProps) {
  const methods = useForm<IFormInputs>({
    defaultValues: {
      topic: question?.topic || "",
      difficulty: question?.difficulty || "easy",
      header: question?.header || "",
      answerType: question?.answerType || "single",
    },
  });

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

  const {
    handleSubmit,
  } = methods;

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
                {`${questionType} Question`}
              </Typography>
              <Divider />
              <SelectTopic />
              <SelectDifficulty />
            </Grid>
            <Grid item xs={7} md={9} sx={{ px: 6, py: 4 }}>
            <QuestionHeader/>
             <Answer questionType={questionType}/>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
