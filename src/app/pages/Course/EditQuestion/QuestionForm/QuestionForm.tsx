import React, { useEffect, useState } from 'react'
import { IChoice, ICorrectAnswer, IQuestion } from '../../../../types/Question';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import SelectDifficulty from '../../AddQuestion/QuestionForm/components/SelectDifficulty';
import SelectTopic from '../../AddQuestion/QuestionForm/components/SelectTopic';
import { ITopic } from '../../../../types/CourseSettings';
import { ITopicsListResponse, getTopicsApi } from '../../../../services/APIs/CourseSettingsAPIs';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import theme from '../../../../../assets/theme';

interface IQuestionFormProps{
    onSuccess: () => void;
    question: IQuestion;
}

interface IFormInputs{
  header: string;
  difficulty: string;
  topic: string;
  choices_attributes?: IChoice[];
  correct_answers_attributes?: ICorrectAnswer[];
}
  


export default function QuestionForm({onSuccess, question}: IQuestionFormProps) {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  useEffect(() => {
     getTopicsApi(courseId).then(({ data }: ITopicsListResponse) => {
      return setTopics(data.topics);
    });
  }, []);

   const methods = useForm<IFormInputs>({
     defaultValues: {
        header: question?.header,
        difficulty: question?.difficulty,
        topic: question?.topic.name,
        choices_attributes: question?.choices,
        correct_answers_attributes: question?.correct_answers,
     },
   });

   const { handleSubmit } = methods;
   const onSubmit = (data: IFormInputs) => {
      console.log(data);
    }
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
                <SelectTopic topics={topics} />
                <SelectDifficulty />
              </Box>
            </Grid>
            <Grid item xs={7} md={9} sx={{ px: 6, py: 4, height: "100%" }}>
              <QuestionCard questionType={question?.question_type} answerType={question?.answer_type}/>
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
                  onClick={()=> navigate(-1)}
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
