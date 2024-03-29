import {
  Button,
  Divider,
  Grid,
  Stack,
  Pagination,
  CircularProgress,
  Checkbox,
} from "@mui/material";

import { Box } from "@mui/system";
import theme from "../../../../assets/theme";
import SearchBar from "./SearchBar";
import SelectBox, { IOption, ISelectBox } from "./SelectBox";
import QuestionAccordion from "./QuestionAccordion";
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import {
  DifficultyLevelEnum,
  IFilterQuestionsParams,
  IQuestion,
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
} from "../../../services/APIs/QuestionsAPIs";
import { set } from "react-hook-form";
import UpdateAlert, {
  IAlertState,
} from "../../../components/UpdateAlert/UpdateAlert";
import { IQuestionType, ITopic } from "../../../types/CourseSettings";
import { IManualExamDetails, QuestionsContext, examContext } from "../ExamCreation/Models";
import { AutomaticExamContext } from "../ExamCreation/AutomaticExam";

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

interface IQuestionBankContext {
  reloadQuestions: () => void;
}

export const QuestionBankContext = React.createContext<IQuestionBankContext>({
  reloadQuestions: () => {},
});

export default function QuestionBank({
  creation,
  isAutomatic,
}: {
  creation?: boolean;
  isAutomatic?: boolean;
}) {
  const { questionsList, setQuestionsList } = useContext(QuestionsContext);
  const { examState, setExamState } = useContext(examContext);
  const { automaticExamState, setAutomaticExamState } =
    useContext(AutomaticExamContext);

  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [topics, setTopics] = useState<IOption[]>([]);
  const [questionTypes, setQuestionTypes] = React.useState<IOption[]>([]);
  const [filterParams, setFilterParams] = useState<IFilterQuestionsParams>({
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState<number>(0);

  const loadQuestions = () => {
    setIsLoading(true);
    getQuestionsApi(parseInt(courseId!), filterParams)
      .then(({ data }: IQuestionsListResponse) => {
        setQuestions(data.questions);
        setPagesCount(data.number_of_pages);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const contextValue: IQuestionBankContext = {
    reloadQuestions: loadQuestions,
  };
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionChecked: IQuestion
  ) => {
    if (event.target.checked) {
      setQuestionsList([...questionsList, questionChecked]);
    } else {
      var newItems = questionsList.filter(
        (question) => question.id !== questionChecked.id
      );
      setQuestionsList(newItems);
    }

  };

  const isQuestionChecked = (question: IQuestion) =>
    (isAutomatic ? automaticExamState : examState).questions
      ?.get(question?.question_type.name)
      ?.find((q) => q.question.id === question.id) !== undefined ?? false;

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
      .catch(({ response: { status, statusText } }: IErrorResponse) => {});
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
      .catch(({ response: { status, statusText } }: IErrorResponse) => {});
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
      <Stack
        sx={{
          px: 7,
          py: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{
              fontSize: "2rem",
              pl: 3,
              fontWeight: "medium",
              fontFamily: "montserrat",
              pb: 4,
            }}
          >
            Question Bank
          </Box>
        </Box>

        <QuestionBankContext.Provider value={contextValue}>
          <Box sx={{ width: "100%", px: 3 }}>
            <Grid container direction="column">
              <Grid item xs>
                <Grid
                  container
                  direction="row"
                  sx={{ mb: 2 }}
                  columnSpacing={2}
                >
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
                  {creation ? (
                    <Grid item xs={4} md={3} />
                  ) : (
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
                  )}
                </Grid>
              </Grid>
              {isLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}

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

              {!isLoading &&
                (creation ? (
                  <Grid container direction="column" spacing={4} paddingTop={2}>
                    {questions.map((question) => {
                      return (
                        <>
                          {!isQuestionChecked(question) && (
                            <Grid key={question.id} item xs>
                              <Grid
                                container
                                direction="row"
                                spacing={2}
                                key={question.id}
                              >
                                <Grid item key={question.id}>
                                  <Checkbox
                                    key={question.id}
                                    checked={questionsList.includes(question)}
                                    onChange={(
                                      event: React.ChangeEvent<HTMLInputElement>
                                    ) => handleCheckboxChange(event, question)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                </Grid>

                                <Grid item xs key={question.id}>
                                  <QuestionAccordion
                                    key={question.id}
                                    {...question}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                        </>
                      );
                    })}

                    {questions.length === 0 && (
                      <Box sx={{ p: 3 }}>
                        No Questions to show for this Course.
                      </Box>
                    )}
                  </Grid>
                ) : (
                  <Grid container direction="column" spacing={4} paddingTop={2}>
                    {questions.map((question) => {
                      return (
                        <Grid key={question.id} item xs>
                          <QuestionAccordion key={question.id} {...question} />
                        </Grid>
                      );
                    })}

                    {questions.length === 0 && (
                      <Box sx={{ p: 3 }}>
                        No Questions to show for this Course.
                      </Box>
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Pagination
            sx={{ mt: 4 }}
            count={pagesCount}
            page={filterParams.page}
            onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
              setFilterParams({ ...filterParams, page: value });
            }}
          />
        </QuestionBankContext.Provider>
      </Stack>
    </div>
  );
}
