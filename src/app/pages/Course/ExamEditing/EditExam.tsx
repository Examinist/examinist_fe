import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import HorizontalStepper from "./Stepper";
import { IExamQuestion, IExamQuestionsGroup } from "../../../types/Exam";
import {
  IExamContext,
  IManualExamDetails,
  examContext,
} from "../ExamCreation/Models";
import { useNavigate, useParams } from "react-router-dom";
import { getExamApi, IExamResponse } from "../../../services/APIs/ExamAPIs";
import { IErrorResponse } from "../../../services/Response";
import { IUpdateExam } from "./Models";
import theme from "../../../../assets/theme";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface IUpdateExamContext {
  updateState: IUpdateExam;
  setUpdateState: Dispatch<SetStateAction<IUpdateExam>>;
}

export const updateContext = React.createContext<IUpdateExamContext>({
  updateState: {},
  setUpdateState: () => {},
});

export default function EditExam() {
  const [examState, setExamState] = React.useState<IManualExamDetails>({
    title: "",
    duration: 30,
    is_auto: false,
    has_models: false,
    questions: new Map<string, IExamQuestion[]>(),
  });
  const [updateState, setUpdateState] = React.useState<IUpdateExam>({
    exam_questions_attributes: [],
    title: false,
    duration: false,
    models: false,
  });
  const navigate = useNavigate();

  const contextValue: IExamContext = {
    examState: examState,
    setExamState: setExamState,
  };
  const updateContextValue: IUpdateExamContext = {
    updateState: updateState,
    setUpdateState: setUpdateState,
  };

  const [isLoading, setIsLoading] = useState(true);
  const { examId } = useParams<{ examId: string }>();
  const [openAlert, setOpenAlert] = React.useState(false);

  const getQuestionsMap = (questions: IExamQuestionsGroup[]) => {
    const questionsMap = new Map<string, IExamQuestion[]>();
    questions.forEach((group) => {
      Object.keys(group).forEach((key) => {
        questionsMap.set(key, group[key]);
      });
    });

    return questionsMap;
  };
  useEffect(() => {
    getExamApi(parseInt(examId!))
      .then(({ data }: IExamResponse) => {
        setExamState({
          title: data.exam.title,
          duration: data.exam.duration,
          is_auto: false,
          has_models: data.exam.has_models,
          questions: getQuestionsMap(data.exam.exam_questions),
        });
        setIsLoading(false);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {});
  }, []);

  const handleClose = () => {
    if(updateState.exam_questions_attributes?.length === 0 && !updateState.title && !updateState.duration && !updateState.models){
      navigate(-1);
      return;
    }
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
    navigate(-1);
  };
  const handleAlertDisagree = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ width: "100%", px: 5, py: 4 }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ ml: 10 }}
      >
        <IconButton aria-label="back" size="large" onClick={handleClose}>
          <ArrowBackIosNewIcon
            sx={{ color: theme.palette.text.primary }}
            fontSize="inherit"
          />
        </IconButton>
        <Dialog
          open={openAlert}
          onClose={handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your progress will be neglected if you close the dialog
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertDisagree}>Cancel</Button>
            <Button onClick={handleAlertClose} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            fontSize: "2rem",
            fontWeight: "medium",
            fontFamily: "montserrat",
            pb: 5,
          }}
        >
          Edit Exam
        </Box>
      </Stack>

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
          <examContext.Provider value={contextValue}>
            <updateContext.Provider value={updateContextValue}>
              <HorizontalStepper />
            </updateContext.Provider>
          </examContext.Provider>
        )}
      </>
    </Box>
  );
}
