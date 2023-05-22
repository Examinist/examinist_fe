import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import theme from "../../../../assets/theme";
import TopicsSelector from "./TopicsSelector";
import RadioButtonOptions from "./RadioButtonOptions";
import { AutomaticExamContext } from "./AutomaticExam";
import {
  getQuestionTypesApi,
  getTopicsApi,
  IQuestionTypesListResponse,
  ITopicsListResponse,
} from "../../../services/APIs/CourseSettingsAPIs";
import { IErrorResponse } from "../../../services/Response";
import { useParams } from "react-router-dom";
import { IQuestionType, ITopic } from "../../../types/CourseSettings";

export default function AutomaticInfo({
  setDisabled,
}: {
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { automaticExamState, setAutomaticExamState } =
    useContext(AutomaticExamContext);
  const [isTitleEmpty, setIsTitleEmpty] = useState(
    automaticExamState.title?.trim() === ""
  );
  const [isDurationEmpty, setIsDurationEmpty] = useState(
    (automaticExamState.duration ?? 0) < 30
  );
  const { courseId } = useParams<{ courseId: string }>();
  const [questionTypes, setQuestionTypes] = React.useState<IQuestionType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    setDisabled(isTitleEmpty || isDurationEmpty || automaticExamState.topics?.size == 0);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomaticExamState({ ...automaticExamState, title: e.target.value });
    setIsTitleEmpty(e.target.value.toString().trim() === "");
    setDisabled(
      !e.target.value ||
        isDurationEmpty ||
        (automaticExamState.topics?.size ?? 0) < questionTypes.length
    );
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomaticExamState({
      ...automaticExamState,
      duration: parseInt(e.target.value),
    });

    setIsDurationEmpty(!e.target.value || parseInt(e.target.value) < 30);
    setDisabled(
      !e.target.value ||
        parseInt(e.target.value) < 30 ||
        isTitleEmpty ||
        (automaticExamState.topics?.size ?? 0) < questionTypes.length
    );
  };
  useEffect(() => {
    getQuestionTypesApi(courseId)
      .then(({ data }: IQuestionTypesListResponse) => {
        setQuestionTypes(data.question_types);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {});

    getTopicsApi(courseId)
      .then(({ data }: ITopicsListResponse) => {
        setTopics(data.topics);
        setIsLoading(false);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {});
  }, []);

  return (
    <>
      {isLoading ? (
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
      ) : (
        <Box
          sx={{
            width: "100%",
            backgroundColor: theme.palette.background.paper,
            marginTop: "50px",
            p: 5,
            pl: "50px",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h6" sx={{ pb: 5, fontWeight: "bold" }}>
            Exam Info :
          </Typography>

          <form>
            <Grid
              container
              rowSpacing={2}
              sx={{ pl: "50px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography variant="subtitle1">Exam Title :</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  sx={{ width: "60%" }}
                  value={automaticExamState.title}
                  onChange={handleTitleChange}
                  required
                  error={isTitleEmpty}
                />
                {isTitleEmpty && (
                  <FormHelperText error>This field is required.</FormHelperText>
                )}
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Exam Duration :</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  sx={{ width: "60%" }}
                  type="number"
                  value={automaticExamState.duration}
                  onChange={handleDurationChange}
                  required
                  error={isDurationEmpty}
                  inputProps={{ min: "30" }}
                />
                {isDurationEmpty && (
                  <FormHelperText error>
                    This field is required and must be at least 30
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ p: "20px", borderBottomWidth: "2px" }} />

          <Typography variant="h6" sx={{ pt: 5, pb: 5, fontWeight: "bold" }}>
            Questions :
          </Typography>

          <Grid
            container
            rowSpacing={2}
            sx={{ pl: "50px" }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={3}>
              <Typography variant="subtitle1">Questions Types</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">Topics</Typography>
            </Grid>
            {questionTypes.map((questionType) => (
              <>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">
                    {questionType.name}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <TopicsSelector
                    key={questionType.id}
                    list={topics}
                    type={questionType}
                    setDisabled={setDisabled}
                    typeList={questionTypes.length}
                  />
                </Grid>
              </>
            ))}

            <Grid item xs={3}>
              <Typography variant="subtitle1">Exam Models :</Typography>
            </Grid>
            <Grid item xs={9}>
              <RadioButtonOptions isAutomatic={true} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
