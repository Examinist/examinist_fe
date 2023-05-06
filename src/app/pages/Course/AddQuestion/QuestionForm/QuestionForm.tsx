import React, { useEffect, useState } from "react";
import {
  AnswerTypeEnum,
  DefaultQuestionTypesEnum,
  DifficultyLevelEnum,
  IEditQuestion,
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
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormInputs, initialValues, schema } from "./Fields";
import {
  IQuestionTypesListResponse,
  ITopicsListResponse,
  getQuestionTypesApi,
  getTopicsApi,
} from "../../../../services/APIs/CourseSettingsAPIs";
import {
  IQuestionResponse,
  createQuestionApi,
} from "../../../../services/APIs/Questions";
import { IErrorResponse } from "../../../../services/Response";
import UpdateAlert, { IAlertState } from "../../../../components/UpdateAlert/UpdateAlert";
import useAlert from "../../../../hooks/useAlert";

interface IQuestionFormProps {
  onSuccess: (question?: IQuestion) => void;
}

export default function QuestionForm({ onSuccess }: IQuestionFormProps) {
  const { setAlertState } = useAlert();
  const { courseId } = useParams<{ courseId: string }>();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [questionTypes, setQuestionTypes] = React.useState<IQuestionType[]>([]);

  const loadTopics = () => {
    getTopicsApi(courseId).then(({ data }: ITopicsListResponse) => {
      return setTopics(data.topics);
    });
  };

  const loadQuestionTypes = () => {
    getQuestionTypesApi(courseId).then(
      ({ data }: IQuestionTypesListResponse) => {
        setQuestionTypes(data.question_types);
      }
    );
  };
  const methods = useForm<IFormInputs>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    loadQuestionTypes();
    loadTopics();
  }, []);

  const onSubmit = (data: IFormInputs) => {

    console.log(questionTypes);
    const { question_type, topic, correct_answers_attributes, choices_attributes, ...q } = data;
    let question: IEditQuestion = {
      question_type_id: questionTypes.find(
        (questionType) => questionType.name === question_type
      )?.id!,
      topic_id: topics.find((t) => t.name === topic)?.id!,
      ...q,
    };

    if (
      question_type === DefaultQuestionTypesEnum.MCQ ||
      question_type === DefaultQuestionTypesEnum.T_F
    ) {
      question = { ...question, choices_attributes: choices_attributes };
    } else {
      question = {
        ...question,
        correct_answers_attributes: correct_answers_attributes,
      };
    }
    console.log("s",data,question);

    createQuestionApi(courseId, question).then(({ data }: IQuestionResponse) =>{
      console.log(data);
      setAlertState({
          open: true,
          message: "Question created successfully",
          severity: "success",
        });
        onSuccess(data.question);
      }
    ).catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        console.log(status, statusText, data);
        setAlertState({
          open: true,
          message: data.message,
          severity: "error",
        });
      });
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
              <SelectQuestionType questionTypes={questionTypes} />
              <SelectTopic topics={topics} />
              <SelectDifficulty />
            </Grid>
            <Grid item xs={7} md={9} sx={{ px: 6, py: 4, height: "100%" }}>
              <QuestionCard />
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
