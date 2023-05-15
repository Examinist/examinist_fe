import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import theme from "../../../../../../assets/theme";
import { getTopicsApi, ITopicsListResponse } from "../../../../../services/APIs/CourseSettingsAPIs";
import { DefaultQuestionTypesEnum, ITopic } from "../../../../../types/CourseSettings";
import { IFormInputs, schema } from "../../Fields";
import { IQuestion } from "../../../../../types/Question";
import SelectDifficulty from "../../components/SelectDifficulty";
import SelectTopic from "../../components/SelectTopic";
import { yupResolver } from "@hookform/resolvers/yup";
import { IQuestionPayload, IQuestionResponse, updateQuestionApi } from "../../../../../services/APIs/QuestionsAPIs";
import useAlert from "../../../../../hooks/useAlert";
import { IErrorResponse } from "../../../../../services/Response";
import QuestionCard from "./QuestionCard";

interface IQuestionFormProps {
  onSuccess: () => void;
  question: IQuestion;
}

export default function QuestionForm({
  onSuccess,
  question,
}: IQuestionFormProps) {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const { courseId } = useParams<{ courseId: string }>();
  const [loaded, setLoaded] = useState<Boolean>(false);
  const {setAlertState} = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    setLoaded(false);
    getTopicsApi(courseId).then(({ data }: ITopicsListResponse) => {
      return setTopics(data.topics);
    })
    .finally(() => {
      setLoaded(true);
    });
  }, []);

  const methods = useForm<IFormInputs>({
    defaultValues: {
      header: question.header,
      difficulty: question.difficulty,
      topic: question.topic.name,
      choices_attributes: question.choices,
      correct_answers_attributes: question.correct_answers,
      question_type: question.question_type.name,
      answer_type: question.answer_type,
      deleted_choices_attributes: [],
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState: {dirtyFields} } = methods;
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    console.log(dirtyFields);

    const {
      header,
      difficulty,
      topic,
      question_type,
      correct_answers_attributes,
      choices_attributes,
       deleted_choices_attributes,
    } = data;

    const payload: IQuestionPayload = {
      header: dirtyFields.header ? header : undefined,
      difficulty: dirtyFields.difficulty ? difficulty : undefined,
      topic_id: dirtyFields.topic ? topics.find((t) => t.name === topic)?.id! : undefined,
    };

    if(question_type === DefaultQuestionTypesEnum.MCQ ||
      question_type === DefaultQuestionTypesEnum.T_F){
        payload.choices_attributes = [...choices_attributes!, ...deleted_choices_attributes!];
      }
      else{
        payload.correct_answers_attributes = dirtyFields.correct_answers_attributes ? correct_answers_attributes : undefined;
      }

    console.log(payload);
     updateQuestionApi(courseId, question.id, payload)
       .then(({ data }: IQuestionResponse) => {
         setAlertState({
           open: true,
           message: "Question updated successfully",
           severity: "success",
         });
         onSuccess();
       })
       .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
         setAlertState({
           open: true,
           message: data.message,
           severity: "error",
         });
       });


  };
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
                Edit Question
              </Typography>
              <Divider />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {loaded && <SelectTopic topics={topics} />}
                <SelectDifficulty />
              </Box>
            </Grid>
            <Grid item xs={7} md={9} sx={{ px: 6, py: 4, height: "100%" }}>
              <QuestionCard
                questionType={question?.question_type}
                answerType={question?.answer_type}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    ml: "auto",
                    mt: "auto",
                    px: 4,
                    borderRadius: 3,
                    backgroundColor: theme.palette.white.main,
                  }}
                  onClick={() => navigate(-1)}
                >
                  cancel
                </Button>

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
