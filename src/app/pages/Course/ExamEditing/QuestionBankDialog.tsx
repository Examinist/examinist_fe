import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import QuestionBank from "../QuestionBank/QuestionBank";
import theme from "../../../../assets/theme";
import { examContext, updateContext } from "./EditExam";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { IQuestion, DifficultyLevelEnum } from "../../../types/Question";
import { QuestionsContext } from "../ExamCreation/Models";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuestionBankDialog() {
  const { questionsList, setQuestionsList } =
    React.useContext(QuestionsContext);

  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const { examState, setExamState } = React.useContext(examContext);
  const {updateState, setUpdateState} = React.useContext(updateContext);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const getWeight = (question: IQuestion) => {
    const { question_type, difficulty } = question;
    switch (difficulty) {
      case DifficultyLevelEnum.EASY:
        return question_type.easy_weight;
      case DifficultyLevelEnum.MEDIUM:
        return question_type.medium_weight;
      case DifficultyLevelEnum.HARD:
        return question_type.hard_weight;
    }
  };

  const getList = () => {
    var stateQuestions = examState.questions;
    questionsList.map((question) => {
      if (stateQuestions?.has(question.question_type.name)) {
        const questions = stateQuestions.get(question.question_type.name);
        if (
          questions &&
          questions.find((q) => q.question.id === question.id) == undefined
        ) {
          questions.push({
            id: question.id,
            score: getWeight(question),
            question: question,
          });
          examState.questions?.set(question.question_type.name, questions);
          setExamState({ ...examState, questions: examState.questions });
        }
      } else {
        examState.questions?.set(question.question_type.name, [
          {
            id: question.id,
            score: getWeight(question),
            question: question,
          },
        ]);
        const newQuestion = {
          question_id: question.id,
          score: getWeight(question),
        };
        updateState.exam_questions_attributes?.push(newQuestion);
        setUpdateState({...updateState, exam_questions_attributes: updateState.exam_questions_attributes});
        setExamState({ ...examState, questions: examState.questions });
      }
    });
  };
  const handleClose = () => {
    setOpenAlert(true);
  };
  const handleDone = () => {
    setOpen(false);
    getList();
    setQuestionsList([]);
  };
  const handleAlertClose = () => {
    setOpen(false);
    setOpenAlert(false);
    setQuestionsList([]);
  };
  const handleAlertDisagree = () => {
    setOpenAlert(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.white.main,
          border: 1,
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "10px",
          mr: "10px",
        }}
        onClick={handleClickOpen}
      >
        Import Question(s)
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Dialog
                open={openAlert}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Your questions will be neglected if you close the dialog
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAlertDisagree}>Cancel</Button>
                  <Button onClick={handleAlertClose} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Select Question(s) from Question Bank :
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDone}>
              Done
            </Button>
          </Toolbar>
        </AppBar>
        <QuestionBank creation={true} />
      </Dialog>
    </div>
  );
}
