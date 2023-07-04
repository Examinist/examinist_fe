import { Box, Stack } from "@mui/system";
import React, { useContext, useState } from "react";
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
} from "../../../../services/APIs/StaffPortalStudentExamAPIs";
import { IErrorResponse } from "../../../../services/Response";
import useAlert from "../../../../hooks/useAlert";
import { setgid } from "process";

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
    let count = 0;
    gradeState.answers?.forEach((answer) => {
      if (answer.score !==  undefined && answer.score !== null) {
        count++;
      }
    });
    return count;
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
    console.log("examPayload", examPayload);
    setGradeState({
      ...gradeState,
      loading: true,
    });
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
      })
      .finally(() => {
        setGradeState({
          ...gradeState,
          loading: false,
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
  const handleAlertDisagreeDone = () => {
    setOpenAlertDone(false);
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
          <IconButton
            aria-label="back"
            size="large"
            onClick={handleClose}
            disabled={gradeState.loading}
          >
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
          disabled={gradeState.loading || gradeState.student_answers_attributes?.length === 0}
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
            <Button onClick={handleAlertDisagreeDone}>Continue grading</Button>
            <Button onClick={handleAlertDoneClose} autoFocus>
              Close
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
