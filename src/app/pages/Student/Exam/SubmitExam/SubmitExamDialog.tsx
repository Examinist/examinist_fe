import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "../../../../hooks/useAuth";
import { Alert, Box, CircularProgress, Divider, Stack } from "@mui/material";
import { IStudentExamContext, StudentExamContext } from "../StudentExamContext";
import theme from "../../../../../assets/theme";
import { SubmitHandler, useForm } from "react-hook-form";
import { IStudentAnswer } from "../../../../types/StudentPortalStudentExam";
import {
  IStudentExamPayload,
  IStudentExamResponse,
  submitStudentExamApi,
} from "../../../../services/APIs/StudentExamAPIs";
import { useNavigate, useParams } from "react-router-dom";
import useAlert from "../../../../hooks/useAlert";
import { IErrorResponse } from "../../../../services/Response";

interface IFormInput {
  username: string;
}

interface ISubmitExamPopUpProps {
  open: boolean;
  onClose: () => void;
}
export default function SubmitExamDialog({
  open,
  onClose,
}: ISubmitExamPopUpProps) {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();
  const { exam, questionsCount, solvedQuestionsCount } =
    React.useContext<IStudentExamContext>(StudentExamContext);
  const { setAlertState } = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setError,
  } = useForm<IFormInput>();

  React.useEffect(() => {
    reset();
    setErrorMessage(null);
  }, [open]);

  const submitExam = () => {
    console.log("submitting exam");
    if (exam) {
      let studentAnswers: IStudentAnswer[] = [];
      studentAnswers = exam?.answers.map((answer) => {
        const { question, ...answerPayload } = answer;
        return answerPayload;
      });
      const examPayload: IStudentExamPayload = {
        is_submitting: true,
        student_answers_attributes: studentAnswers,
      };
      setLoading(true);
      submitStudentExamApi(parseInt(examId!), examPayload)
        .then(({ data }: IStudentExamResponse) => {
          navigate("/student");
          setAlertState({
            open: true,
            message: "Exam is submitted successfully.",
            severity: "success",
          });
        })
        .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
          setErrorMessage(data?.message || statusText || null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (input: IFormInput) => {
    console.log(input);
    if (input.username === user?.username) {
      submitExam();
    } else {
      setError("username", {
        type: "string",
        message:
          "username is incorrect. enter correct username to confirm submitting.",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Submit Exam</DialogTitle>
        {loading ? (
          <DialogContent dividers
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "330px",
            }}
          >
            <CircularProgress />
          </DialogContent>
        ) : (
          <>
            <DialogContent dividers>
              <DialogContentText sx={{ fontWeight: 600, fontSize: "18px" }}>
                Are you sure you want to submit the exam?
                <br />
                Once you submit the exam, you cannot open it again.
              </DialogContentText>
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  my: 4,
                  gap: 1,
                }}
              >
                <Divider />
                <Box
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: theme.palette.gray.dark,
                  }}
                >
                  {exam?.title}
                </Box>
                <Box
                  sx={{
                    fontSize: 17,
                    fontWeight: 500,
                    color: theme.palette.gray.dark,
                  }}
                >
                  {exam?.course.title + " - " + exam?.course.code}
                </Box>
                <Box
                  sx={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: theme.palette.gray.dark,
                  }}
                >
                  Attempted Questions: {solvedQuestionsCount} / {questionsCount}
                </Box>
                <Divider />
              </Stack>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ fontWeight: 500 }}>
                  To confirm submitting, enter your username:
                </Box>
                <TextField
                  {...register("username", {
                    required:
                      "Please enter your username to confirm submitting.",
                  })}
                  margin="dense"
                  fullWidth
                  variant="standard"
                  autoComplete="off"
                  error={errors.username?.message ? true : false}
                  helperText={errors.username?.message}
                />
              </Box>
              {errorMessage && (
                <Alert severity="error" sx={{ my: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </>
        )}
      </form>
    </Dialog>
  );
}
