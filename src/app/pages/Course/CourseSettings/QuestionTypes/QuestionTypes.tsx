import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import QuestionTypeAccordion from "./components/QuestionTypeAccordion";
import { IQuestionType } from "../../../../types/Question";
import QuestionTypeFormDialog from "./components/QuestionTypeFormDialog";

const intitalQuestionTypes: IQuestionType[] = [
  {
    id: 1,
    name: "MCQ",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
  },
  {
    id: 2,
    name: "T/F",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
  },
  {
    id: 3,
    name: "Essay",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
  },
  {
    id: 4,
    name: "Short Answer",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
  },
  {
    id: 5,
    name: "Modelling",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: true,
  },
];

export default function QuestionTypes() {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [alertState, setAlertState] = React.useState<any>({
    open: false,
    message: "",
  });
  const [modifiedQuestionType, setModifiedQuestionType] =
    React.useState<IQuestionType | null>(null);
  const [expandedId, setExpandedId] = React.useState<number>(-1);
  const [questionTypes, setQuestionTypes] =
    React.useState<IQuestionType[]>(intitalQuestionTypes);

  const handleDialogOpen = () => {
    setModifiedQuestionType(null);
    console.log("handleDialogOpen");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (id: number) => {
    expandedId === id ? setExpandedId(-1) : setExpandedId(id);
  };

  const handleEdit = (id: number) => {
    // setEditedId(id);
    setModifiedQuestionType(
      questionTypes.find((q) => q.id === id) as IQuestionType
    );
    setDialogOpen(true);
  };

  const handleUpdate = (data: IQuestionType, isNew: boolean) => {
    console.log(data);
    if(isNew) {
      setQuestionTypes((q) => [...q, data]);
      setAlertState({ open: true, message: "Question type added successfully!" });
    } else {
    setQuestionTypes((q) =>
      q.map((q: IQuestionType) => (q.id === data.id ? data : q)));
      setAlertState({ open: true, message: "Question type updated successfully!" });
    }
    
  };

  const handleDelete = (id: number) => {
    setQuestionTypes((q) => q.filter((q) => q.id !== id));
    setAlertState({ open: true, message: "Question type deleted successfully!" });
  };

  return (
    <div>
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

        <Button
          variant="outlined"
          sx={{
            color: "#1B84BF",
            backgroundColor: "white",
            marginLeft: "auto",
            border: 1,
            fontSize: "14px",
            fontWeight: "bold",
            px: 4,
            textTransform: "none",
            borderRadius: "15px",
          }}
          onClick={handleDialogOpen}
        >
          Add New Question Type
        </Button>
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
        ></QuestionTypeFormDialog>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState((a: any) => ({ ...a, open: false }))}
      >
        <Alert
          onClose={() => setAlertState((a: any) => ({ ...a, open: false }))}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
