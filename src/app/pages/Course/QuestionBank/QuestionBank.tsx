import { Button, Divider, Grid, Stack, Pagination } from "@mui/material";

import { Box } from "@mui/system";
import theme from "../../../../assets/theme";
import SearchBar from "./SearchBar";
import SelectBox, { ISelectBox } from "./SelectBox";
import QuestionAccordion from "./QuestionAccordion";
import React,{useState,useEffect} from "react";
import {
  AnswerTypeEnum,
  DefaultQuestionTypesEnum,
  IQuestion,
  IQuestionType,
} from "../../../types/Question";

const selectBoxes: ISelectBox[] = [
  {
    title: "Group 1",
    options: [
      {
        name: "name",
        value: "value1",
      },
      {
        name: "name2",
        value: "value2",
      },
      {
        name: "name3",
        value: "value3",
      },
    ],
  },
  {
    title: "Group 2",
    options: [
      {
        name: "name",
        value: "value1",
      },
      {
        name: "name2",
        value: "value2",
      },
      {
        name: "name3",
        value: "value3",
      },
    ],
  },
  {
    title: "Group 3",
    options: [
      {
        name: "name",
        value: "value1",
      },
      {
        name: "name2",
        value: "value2",
      },
      {
        name: "name3",
        value: "value3",
      },
    ],
  },
];

const mockQuestions: IQuestion[] = [
  {
    id: 1,
    questionType: DefaultQuestionTypesEnum.MCQ,
    topic: "Topic 1",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum? Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum? Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.SINGLE,
    choices: [
      { id: 1, choice: "Choice 1", isCorrect: true },
      { id: 2, choice: "Choice 2", isCorrect: false },
      { id: 3, choice: "Choice 3", isCorrect: false },
      { id: 4, choice: "Choice 4", isCorrect: false },
    ],
  },
  {
    id: 2,
    questionType: DefaultQuestionTypesEnum.MCQ,
    topic: "Topic 2",
    difficulty: "Hard",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.MULTIPLE,
    choices: [
      { id: 1, choice: "Choice 1", isCorrect: true },
      { id: 2, choice: "Choice 2", isCorrect: false },
      { id: 3, choice: "Choice 3", isCorrect: true },
      { id: 4, choice: "Choice 4", isCorrect: false },
    ],
  },
  {
    id: 3,
    questionType: DefaultQuestionTypesEnum.T_F,
    topic: "Topic 2",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.SINGLE,
    choices: [
      { id: 1, choice: "True", isCorrect: true },
      { id: 2, choice: "False", isCorrect: false },
    ],
  },
  {
    id: 4,
    questionType: DefaultQuestionTypesEnum.SHORT_ANSWER,
    topic: "Topic 2",
    difficulty: "Medium",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.TEXT,
    correctAnswer:
      "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum",
  },
  {
    id: 5,
    questionType: DefaultQuestionTypesEnum.ESSAY,
    topic: "Topic 2",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.TEXT,
    correctAnswer:
      "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum",
  },
  {
    id: 6,
    questionType: DefaultQuestionTypesEnum.ESSAY,
    topic: "Topic 2",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.PDF,
    correctAnswer: "<link of pdf file>",
  },
];

export default function QuestionBank()  {
  const addNewQuestion = () => {};
  const [page, setPage] = React.useState(1);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    setQuestions(mockQuestions);
  }, []);

  return (
    <div>
      <Stack spacing={3} sx={{ padding: 6 , justifyContent:'center',alignItems:'center' }}  >
        <Box>
          <Grid container direction="column">
            <Grid item xs>
              <Grid spacing={12} container direction="row">
                <Grid item xs={8}>
                  <SearchBar />
                </Grid>
                <Grid item xs={4} md={3}>
                  <Button
                    variant="outlined"
                    onClick={addNewQuestion}
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.white.main,
                      width: "100%",
                      height: "80%",
                      marginTop: "7px",
                      border: 1,
                      fontSize: "14px",
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "10px",
                    }}
                  >
                    Add new question
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid direction="row" container columns={{ xs: 4, sm: 4, md: 16 }}>
              {selectBoxes.map((box) => {
                return (
                  <Grid key={box.title} item xs={4}>
                    <SelectBox
                      key={box.title}
                      title={box.title}
                      options={box.options}
                    />
                  </Grid>
                );
              })}
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
              paddingTop={2}
            >
               {
                questions.map((question)=>{
                   return <Grid key={question.id} item xs>
                   <QuestionAccordion key={question.id} {...question}/>
                 </Grid>
                })
               }
             
            </Grid>
          </Grid>
        </Box>
        <Pagination count={10} page={page} onChange={handleChange}  />
      </Stack>
    </div>
  );
}

