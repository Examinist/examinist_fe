import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DifficultyLevelsTable, {
  IDifficultyLevelsFormInputs,
} from "./DifficultyLevelsTable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IQuestionType } from "../../../../../types/Question";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearIcon from "@mui/icons-material/Clear";

interface IQuestionTypeAccordion {
  questionType: IQuestionType;
  onChange: (id: number) => void;
  onEdit: (id: number) => void;
  expandedId: number;
  editedId: number;
  updateQuestionType: (id: number, data: IDifficultyLevelsFormInputs) => void;
}

export default function QuestionTypeAccordion({
  questionType: {
    id,
    name,
    easy_weight,
    medium_weight,
    hard_weight,
    is_deletable,
  },
  expandedId,
  editedId,
  onEdit,
  onChange,
  updateQuestionType,
}: IQuestionTypeAccordion) {
  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    alert("Delete");
  };

  const handleCancel = () => {
    onEdit(-1);
  };

  const renderIcons = () => (
    <>
      {is_deletable && (
        <IconButton
          aria-label="delete"
          sx={{ mr: 2 }}
          onClick={handleDelete}
          disabled={editedId === id}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}

      <IconButton
        aria-label="edit"
        onClick={handleEdit}
        disabled={editedId === id}
      >
        <EditIcon />
      </IconButton>
    </>
  );

  return (
    <Box sx={{ backgroundColor: "white", py: 1, pl: 3, borderRadius: 5 }}>
      <Accordion
        elevation={0}
        expanded={expandedId === id}
        onChange={() => onChange(id)}
      >
        <AccordionSummary
          sx={{ mr: 3 }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              fontSize: 18,
              fontWeight: "medium",
            }}
          >
            {name}
          </Box>

          {expandedId === id && (
            <Box sx={{ mr: 2, ml: "auto" }}>{renderIcons()}</Box>
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ mr: 4 }}>
          <DifficultyLevelsTable
            edited={editedId == id}
            onCancel={handleCancel}
            updateQuestionTypes={updateQuestionType}
            id={id}
            easy_weight={easy_weight}
            medium_weight={medium_weight}
            hard_weight={hard_weight}
          ></DifficultyLevelsTable>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
