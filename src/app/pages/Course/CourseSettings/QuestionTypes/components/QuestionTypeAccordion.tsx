import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DifficultyLevelsTable from "./DifficultyLevelsTable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IQuestionType } from "../../../../../types/Question";
import { IsAssignedContext } from "../../../../../layouts/CourseLayout/CourseLayout";


interface IQuestionTypeAccordion {
  questionType: IQuestionType;
  onChange: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  expandedId: number;
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
  onEdit,
  onChange,
  onDelete,
}: IQuestionTypeAccordion) {
  const isAssigned = useContext(IsAssignedContext);
  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    onDelete(id);
  };
 
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

              {expandedId === id && isAssigned && (
                <Box sx={{ mr: 2, ml: "auto" }}>
                  { (
                    <IconButton
                      aria-label="delete"
                      sx={{ mr: 2 }}
                      onClick={handleDelete}
                      disabled={!is_deletable}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="edit"
                    onClick={handleEdit}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </AccordionSummary>
            <AccordionDetails sx={{ mr: 4 }}>
              <DifficultyLevelsTable
                easy_weight={easy_weight}
                medium_weight={medium_weight}
                hard_weight={hard_weight}
              ></DifficultyLevelsTable>
            </AccordionDetails>
          </Accordion>
    </Box>
  );
}
