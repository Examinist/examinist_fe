import React, { useContext, useEffect, useState } from "react";
import {
  AnswerTypeEnum,
  DifficultyLevelEnum,
  IQuestion,
} from "../../../../../types/Question";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormInputs, initialValues, schema } from "../../Fields";
import {
  IQuestionTypesListResponse,
  ITopicsListResponse,
  getQuestionTypesApi,
  getTopicsApi,
} from "../../../../../services/APIs/CourseSettingsAPIs";
import {
  IQuestionPayload,
  IQuestionResponse,
  createQuestionApi,
} from "../../../../../services/APIs/QuestionsAPIs";
import { IErrorResponse } from "../../../../../services/Response";
import useAlert from "../../../../../hooks/useAlert";
import {
  DefaultQuestionTypesEnum,
  IQuestionType,
  ITopic,
} from "../../../../../types/CourseSettings";
import theme from "../../../../../../assets/theme";
import SelectQuestionType from "../../components/SelectQuestionType";
import SelectTopic from "../../components/SelectTopic";
import SelectDifficulty from "../../components/SelectDifficulty";
import QuestionCard from "./QuestionCard";
import { QuestionsContext } from "../../../ExamCreation/Models";

interface IQuestionFormProps {
  onSuccess: (question?: IQuestion) => void;
  onCancel?: () => void;
}

export default function AddQuestionForm({
  onSuccess,
  onCancel,
}: IQuestionFormProps) {
  const { setAlertState } = useAlert();
  const { courseId } = useParams<{ courseId: string }>();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [questionTypes, setQuestionTypes] = React.useState<IQuestionType[]>([]);
  const navigate = useNavigate();

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
    const {
      question_type,
      topic,
      correct_answers_attributes,
      choices_attributes,
      ...q
    } = data;
    let question: IQuestionPayload = {
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

    createQuestionApi(courseId, question)
      .then(({ data }: IQuestionResponse) => {
        setAlertState({
          open: true,
          message: "Question added to course question bank successfully!",
          severity: "success",
        });
        onSuccess(data.question);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <SelectQuestionType questionTypes={questionTypes} />
                <SelectTopic topics={topics} />
                <SelectDifficulty />
              </Box>
            </Grid>
            <Grid item xs={7} md={9} sx={{ px: 6, py: 4 }}>
              <QuestionCard />
              <Box sx={{ display: "flex", gap: 2, justifyContent:'left'}}>
                {onCancel && (
                  <Button
                    variant="outlined"
                    sx={{
                      ml: "auto",
                      mt: "auto",
                      px: 4,
                      borderRadius: 3,
                      backgroundColor: theme.palette.white.main,
                    }}
                    onClick={onCancel}
                  >
                    cancel
                  </Button>
                )}
                <Button
                  variant="contained"
                  sx={{ mt: "auto", px: 4, borderRadius: 3 }}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
