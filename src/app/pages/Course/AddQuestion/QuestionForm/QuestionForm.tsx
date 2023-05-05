import React, { useEffect } from "react";
import {
  AnswerTypeEnum,
  DifficultyLevelEnum,
  IQuestion,
  IQuestionType,
  ITopic,
} from "../../../../types/Question";
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
import {
  IQuestionTypesListResponse,
  ITopicsListResponse,
  getQuestionTypesApi,
  getTopicsApi,
} from "../../../../services/APIs/CourseSettingsAPIs";
import { useParams } from "react-router-dom";

interface IQuestionFormProps {
  questionType: string;
  mode: "new" | "edit";
  question?: IQuestion;
}

interface IChoice {
  choice: string;
  is_answer: boolean;
}

interface ICorrectAnswer {
  answer: string;
}

interface IFormInputs {
  header: string;
  answer_type: AnswerTypeEnum;
  difficulty: DifficultyLevelEnum;
  question_type: string;
  topic: string;
  choices_attributes?: IChoice[];
  correct_answers_attributes?: ICorrectAnswer[];
}

const initialValues: IFormInputs = {
  difficulty: DifficultyLevelEnum.EASY,
  header: "",
  topic: "",
  question_type: "",
  answer_type: AnswerTypeEnum.SINGLE,
};

export default function QuestionForm({ questionType }: IQuestionFormProps) {
  const methods = useForm<IFormInputs>({
    defaultValues: initialValues,
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
