import { Box, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import React from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DifficultyLevelsTable, { IDifficultyLevel } from './DifficultyLevelsTable';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

interface IQuestionTypeAccordion {
  questionType: string;
  difficultyLevels: IDifficultyLevel[];
  removable: boolean;
  handleChange: (panel: string) => void;
  expanded: string | false;
}

export default function QuestionTypeAccordion({questionType, difficultyLevels, expanded, handleChange, removable}: IQuestionTypeAccordion) {
  return (
    <Box sx={{ backgroundColor: "white", py: 1, pl: 3, borderRadius: 5 }}>
      <Accordion
        elevation={0}
        expanded={expanded === questionType}
        onChange={() => handleChange(questionType)}
      >
        <AccordionSummary
          sx={{ mr: 3 }}
          expandIcon={
            <ExpandMoreIcon />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              fontSize: 18,
              fontWeight: "medium",
            }}
          >
            {questionType}
          </Box>

          {expanded === questionType && (
            <Box sx={{ mr: 2, ml: "auto" }}>
             { removable && <IconButton
                aria-label="delete"
                sx={{ mr: 2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  alert("clicked");
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>}

              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ mr: 4 }}>
          <DifficultyLevelsTable
            difficultyLevels={difficultyLevels}
          ></DifficultyLevelsTable>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
