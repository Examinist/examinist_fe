import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router";
import { gradeExamContext } from "../Models";
import { IStudent } from "../../../../types/User";
import {
  IStudentAnswerPayload,
  IStudentExamPayload,
  IStudentExamResponse,
  updateStudentExamApi,
} from "../../../../services/APIs/GradingAPIs";
import { IErrorResponse } from "../../../../services/Response";
import useAlert from "../../../../hooks/useAlert";

export default function UpperGradingBar({
  title,
  student,
}: {
  title: string;
  student: IStudent;
}) {
  const navigate = useNavigate();
  const { gradeState, setGradeState } = useContext(gradeExamContext);
  const [questionsAnswered, setQuestionsAnswered] = React.useState<number>(
    gradeState.questionsAnswered ?? 0
  );
  const { examId } = useParams<{ examId: string }>();
  const { studentExamId } = useParams<{ studentExamId: string }>();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertDone, setOpenAlertDone] = React.useState(false);

  const { setAlertState } = useAlert();

  const getCount = () => {
    let totalScore = 0;
    gradeState.answers?.forEach((answer) => {
      if (answer.score !== undefined) {
        totalScore++;
      }
    });
    return totalScore;
  };

  React.useEffect(() => {
    setQuestionsAnswered(getCount());
  }, [gradeState.answers]);

  const handleClose = () => {
    setOpenAlert(true);
  };
  const handleDoneClose = () => {
    setOpenAlertDone(true);
  };
  const handleDone = () => {
    const examPayload: IStudentExamPayload = {
      student_answers_attributes: gradeState.student_answers_attributes ?? [],
    };
    updateStudentExamApi(
      parseInt(examId!),
      parseInt(studentExamId!),
      examPayload
    )
      .then(() => {
        setAlertState({
          open: true,
          message: "Exam is created successfully!",
          severity: "success",
        });
        handleDoneClose();
      })
      .catch(({ response: { statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText,
          severity: "error",
        });
      });
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
    navigate(-1);
  };
  const handleAlertDoneClose = () => {
    setOpenAlertDone(false);
    navigate(-1);
  };
  const handleAlertDisagree = () => {
    setOpenAlert(false);
  };
  
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        borderBottom: 1,
        borderBottomColor: theme.palette.gray.light,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
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
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your answers will be neglected if you close the dialog
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAlertDisagree}>Cancel</Button>
              <Button onClick={handleAlertClose} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Typography variant="h6" paragraph>
            {title}

            <br />
            {student.first_name +
              " " +
              student.last_name +
              " (" +
              student.academic_id +
              ")"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: 5,
            px: 3,
            fontWeight: 600,
          }}
          onClick={handleDone}
        >
          Save Changes
        </Button>
        <Dialog
          open={openAlertDone}
          onClose={handleAlertDoneClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your changes have been saved
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertDoneClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <LinearProgress
        variant="determinate"
        color="success"
        sx={{
          height: 10,
          borderRadius: 0,
        }}
        value={(questionsAnswered / (gradeState.totalQuestions ?? 1)) * 100}
      />
    </Box>
  );
}
