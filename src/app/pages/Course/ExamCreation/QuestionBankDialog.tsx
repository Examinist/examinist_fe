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
import { ManualExamContext } from "./ManualExam";
import { AutomaticExamContext } from "./AutomaticExam";
import { QuestionsContext } from "./Models";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuestionBankDialog({ isAutomatic = false }) {
  const { questionsList, setQuestionsList } =
    React.useContext(QuestionsContext);

  const [open, setOpen] = React.useState(false);

  const { examState, setExamState } = React.useContext(ManualExamContext);
  const { automaticExamState, setAutomaticExamState } =
    React.useContext(AutomaticExamContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const getList = () => {
    var stateQuestions = isAutomatic
      ? automaticExamState.questions
      : examState.questions;
    questionsList.map((question) => {
      if (stateQuestions?.has(question.question_type.name)) {
        const questions = stateQuestions.get(question.question_type.name);
        if (
          questions &&
          questions.find((q) => q.question.id === question.id) == undefined
        ) {
          questions.push({
            id: question.id,
            score: 0,
            question: question,
          });
          (isAutomatic ? automaticExamState : examState).questions?.set(
            question.question_type.name,
            questions
          );
          isAutomatic
            ? setAutomaticExamState({
                ...automaticExamState,
                questions: automaticExamState.questions,
              })
            : setExamState({ ...examState, questions: examState.questions });
        }
      } else {
        (isAutomatic ? automaticExamState : examState).questions?.set(
          question.question_type.name,
          [
            {
              id: question.id,
              score: 0,
              question: question,
            },
          ]
        );
        setAutomaticExamState({
          ...automaticExamState,
          questions: automaticExamState.questions,
        });

        isAutomatic
          ? setAutomaticExamState({
              ...automaticExamState,
              questions: automaticExamState.questions,
            })
          : setExamState({ ...examState, questions: examState.questions });
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
    getList();
    setQuestionsList([]);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Select Question(s) from Question Bank :
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Done
            </Button>
          </Toolbar>
        </AppBar>
        <QuestionBank creation={true} isAutomatic={isAutomatic} />
      </Dialog>
    </div>
  );
}
