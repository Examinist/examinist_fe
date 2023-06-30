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
import theme from "../../../../../../assets/theme";
import { IQuestionType } from "../../../../../types/CourseSettings";


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
  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    onDelete(id);
  };
 
  return (
    <Box sx={{ backgroundColor: theme.palette.white.main, py: 1, px: 3, borderRadius: 5 }}>
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
