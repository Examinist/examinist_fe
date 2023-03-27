import { Box } from '@mui/material';
import React from 'react'
import { IDifficultyLevel } from './DifficultyLevelsTable';
import QuestionTypeAccordion from './QuestionTypeAccordion';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


interface IQuestionType{
    questionType: string;
    difficultyLevels: IDifficultyLevel[];
    removable: boolean;
}

const difficultyLevels: IDifficultyLevel[] = [
  {level: "Easy", weight: 1},
  {level: "Medium", weight: 2},
  {level: "Hard", weight: 3},
]


const questionTypes: IQuestionType[] = [
  {questionType: "MCQ", difficultyLevels: difficultyLevels, removable: false},
  {questionType: "T/F", difficultyLevels: difficultyLevels, removable: false},
  {questionType: "Essay", difficultyLevels: difficultyLevels, removable: true},
  {questionType: "Short Answer", difficultyLevels: difficultyLevels, removable: true}
];



export default function QuestionTypes() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => {
    expanded === panel ? setExpanded(false) : setExpanded(panel);
  };
  
  return (
    <div>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Question Types
      </Box>
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        {questionTypes.map((questionType) => (
          <QuestionTypeAccordion
           {...questionType}
            expanded={expanded}
            handleChange={handleChange}
          ></QuestionTypeAccordion>
        ))}
      </Box>
    </div>
  );
}
