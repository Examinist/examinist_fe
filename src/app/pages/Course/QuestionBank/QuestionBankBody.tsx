import { Button, Divider, Grid, Stack, Pagination } from "@mui/material";

import { Box } from "@mui/system";
import theme from "../../../../assets/theme";
import SearchBar from "./SearchBar";
import SelectBox, { IOption, ISelectBox } from "./SelectBox";
import QuestionAccordion from "./QuestionAccordion";
import React, { useState, useEffect } from "react";
import {
  DifficultyLevelEnum,
  IFilterQuestionsParams,
  IQuestion,
  IQuestionType,
  ITopic,
} from "../../../types/Question";
import {
  IQuestionTypesListResponse,
  ITopicsListResponse,
  getQuestionTypesApi,
  getTopicsApi,
} from "../../../services/APIs/CourseSettingsAPIs";
import { useNavigate, useParams } from "react-router-dom";
import { IErrorResponse } from "../../../services/Response";
import {
  IQuestionsListResponse,
  getQuestionsApi,
} from "../../../services/APIs/QuestionBank";

const DifficultyLevelOptions = [
  {
    name: "Easy",
    value: DifficultyLevelEnum.EASY,
  },
  {
    name: "Medium",
    value: DifficultyLevelEnum.MEDIUM,
  },
  {
    name: "Hard",
    value: DifficultyLevelEnum.HARD,
  },
];

type Props = {
    childComponent: React.FunctionComponent;
    questions: IQuestion[];
    setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  };

export default function QuestionBankBody({ childComponent: ChildComponent,questions:questions,setQuestions:setQuestions }: Props) {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<IOption[]>([]);
  const [questionTypes, setQuestionTypes] = React.useState<IOption[]>([]);
  const [filterParams, setFilterParams] = useState<IFilterQuestionsParams>({page: 1});

  const loadQuestions = () => {
    getQuestionsApi(parseInt(courseId!), filterParams)
      .then(({ data }: IQuestionsListResponse) => {
        console.log(data.questions);
        setQuestions(data.questions);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {
        console.log(status, statusText);
    });
  };

  const loadTopics = () => {
    getTopicsApi(courseId)
      .then(({ data }: ITopicsListResponse) => {
        return setTopics(
          data.topics.map((topic: ITopic) => ({
            name: topic.name,
            value: topic.id,
          }))
        );
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {
        console.log(status, statusText);
      });
  };

  const loadQuestionTypes = () => {
    getQuestionTypesApi(courseId)
      .then(({ data }: IQuestionTypesListResponse) => {
        setQuestionTypes(
          data.question_types.map((questionType: IQuestionType) => ({
            name: questionType.name,
            value: questionType.id,
          }))
        );
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {
        console.log(status, statusText);
      });
  };

  useEffect(() => {
    loadQuestions();
    loadTopics();
    loadQuestionTypes();
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [filterParams]);

  return (
    <div>
      <Stack sx={{ py: 6, justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ width: "100%", px: 5 }}>
          <Grid container direction="column">
            <Grid item xs>
              <Grid container direction="row" sx={{ mb: 2 }} columnSpacing={2}>
                <Grid item xs={8} md={9}>
                  <SearchBar
                    onSearch={(search: string) =>
                      setFilterParams({
                        ...filterParams,
                        filter_by_header: search,
                        page: 1,
                      })
                    }
                    onCancel={() => {
                      setFilterParams({
                        ...filterParams,
                        filter_by_header: undefined,
                        page: 1,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4} md={3}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("./add")}
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.white.main,
                      width: "90%",
                      height: "90%",
                      mt: "3px",
                      textTransform: "none",
                      border: 1,
                      ml: 5,
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "15px",
                    }}
                  >
                    Add New Question
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              direction="row"
              columnSpacing={4}
              container
              columns={{ xs: 4, sm: 4, md: 12 }}
            >
              <Grid item xs={4} md={3}>
                <SelectBox
                  key={"Topic"}
                  title={"Topic"}
                  options={topics}
                  onChange={(value) =>
                    setFilterParams({
                      ...filterParams,
                      filter_by_topic_id: value,
                      page: 1,
                    })
                  }
                  onCancel={() =>
                    setFilterParams({
                      ...filterParams,
                      filter_by_topic_id: undefined,
                      page: 1,
                    })
                  }
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <SelectBox
                  key={"Question Type"}
                  title={"Question Type"}
                  options={questionTypes}
                  onChange={(value) =>
                    setFilterParams({
                      ...filterParams,
                      filter_by_question_type_id: value,
                      page: 1,
                    })
                  }
                  onCancel={() =>
                    setFilterParams({
                      ...filterParams,
                      filter_by_question_type_id: undefined,
                      page: 1,
                    })
                  }
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <SelectBox
                  key={"Difficulty Level"}
                  title={"Difficulty Level"}
                  options={DifficultyLevelOptions}
                  onChange={(value) =>
                    setFilterParams({
                      ...filterParams,
                      filter_by_difficulty: value,
                      page: 1,
                    })
                  }
                  onCancel={() =>
                    setFilterParams({
                      ...filterParams,
                      filter_by_difficulty: undefined,
                      page: 1,
                    })
                  }
                />
              </Grid>
            </Grid>

            <Grid container direction="column" spacing={4} paddingTop={2}>
              <ChildComponent/>
            </Grid>
          </Grid>
        </Box>
        <Pagination
          sx={{ mt: 4 }}
          count={10}
          page={filterParams.page}
          onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
            setFilterParams({ ...filterParams, page: value });
          }}
        />
      </Stack>
    </div>
  );
}
