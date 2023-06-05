import {
  Alert,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import QuestionTypeAccordion from "./components/QuestionTypeAccordion";
import { IQuestionType } from "../../../../types/CourseSettings";
import QuestionTypeFormDialog from "./components/QuestionTypeFormDialog";
import {
  IQuestionTypeResponse,
  IQuestionTypesListResponse,
  createQuestionTypeApi,
  deleteQuestionTypeApi,
  getQuestionTypesApi,
  updateQuestionTypeApi,
} from "../../../../services/APIs/CourseSettingsAPIs";
import { useParams } from "react-router-dom";
import { IErrorResponse } from "../../../../services/Response";
import theme from "../../../../../assets/theme";
import useAlert from "../../../../hooks/useAlert";

export default function QuestionTypes() {
  const course_id = useParams<{ courseId: string }>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const {setAlertState} = useAlert();
  const [modifiedQuestionType, setModifiedQuestionType] =
    React.useState<IQuestionType | null>(null);
  const [expandedId, setExpandedId] = React.useState<number>(-1);
  const [questionTypes, setQuestionTypes] = React.useState<IQuestionType[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {
    getQuestionTypesApi(course_id.courseId)
      .then(({ data }: IQuestionTypesListResponse) => {
        setQuestionTypes(data.question_types);
        setIsLoading(false);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {
      });
  }, []);

  const handleDialogOpen = () => {
    setModifiedQuestionType(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setErrorMessage(null);
    setDialogOpen(false);
  };

  const handleChange = (id: number) => {
    expandedId === id ? setExpandedId(-1) : setExpandedId(id);
  };

  const handleEdit = (id: number) => {
    setModifiedQuestionType(
      questionTypes.find((q) => q.id === id) as IQuestionType
    );
    setDialogOpen(true);
  };

  const handleUpdate = (data: IQuestionType, isNew: boolean) => {
    if (isNew) {
      createQuestionTypeApi(course_id.courseId, data)
        .then(({ data: { question_type } }: IQuestionTypeResponse) => {
          setQuestionTypes((q) => [...q, question_type]);
          setAlertState({
            open: true,
            message: "Question type added successfully!",
            severity: "success"
          });
          handleDialogClose();
        })
        .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
          setErrorMessage(data.message! || null);
        });
    } else {
      updateQuestionTypeApi(course_id.courseId, data)
        .then(({ data: { question_type } }: IQuestionTypeResponse) => {          
          setQuestionTypes((q) =>
            q.map((q: IQuestionType) => (q.id === data.id ? question_type : q))
          );
          setAlertState({
            open: true,
            message: "Question type updated successfully!",
            severity: "success"
          });
          handleDialogClose();
        })
        .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
          setErrorMessage(data.message! || null);
        });
      
    }
  };

  const handleDelete = (id: number) => {
    deleteQuestionTypeApi(course_id.courseId, id)
      .then(() => {
        setQuestionTypes((q) => q.filter((q) => q.id !== id));
        setAlertState({
          open: true,
          message: "Question type deleted successfully!",
          severity: "success"
        });
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data.message,
          severity: "error"
        });
      });
  };

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
        <Box sx={{ px: 15, py: 5 }}>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                fontSize: "2rem",
                fontWeight: "medium",
                fontFamily: "montserrat",
              }}
            >
              Question Types
            </Box>

            {
              <Button
                variant="outlined"
                sx={{
                  color: "#1B84BF",
                  backgroundColor: theme.palette.white.main,
                  marginLeft: "auto",
                  border: 1,
                  fontSize: "15px",
                  fontWeight: "bold",
                  px: 4,
                  borderRadius: "17px",
                }}
                onClick={handleDialogOpen}
              >
                Add New Question Type
              </Button>
            }
          </Box>
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            {questionTypes.map((questionType, index) => (
              <div key={index}>
                <QuestionTypeAccordion
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  questionType={questionType}
                  expandedId={expandedId}
                  onChange={handleChange}
                ></QuestionTypeAccordion>
              </div>
            ))}
          </Box>

          {dialogOpen && (
            <QuestionTypeFormDialog
              initialValues={modifiedQuestionType}
              open={dialogOpen}
              onClose={handleDialogClose}
              onUpdate={handleUpdate}
              errorMessage={errorMessage!}
            ></QuestionTypeFormDialog>
          )}
        </Box>
      )}
    </>
  );
}
