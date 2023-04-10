import { Box } from "@mui/material";
import React from "react";
import QuestionTypeAccordion from "./components/QuestionTypeAccordion";
import { IQuestionType } from "../../../../types/Question";
import { IDifficultyLevelsFormInputs } from "./components/DifficultyLevelsTable";

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
  const [expandedId, setExpandedId] = React.useState<number>(-1);
  const [editedId, setEditedId] = React.useState<number>(-1);
  const [questionTypes, setQuestionTypes] =
    React.useState<IQuestionType[]>(intitalQuestionTypes);

  const handleChange = (id: number) => {
    expandedId === id ? setExpandedId(-1) : setExpandedId(id);
    setEditedId(-1);
  };

  const handleEdit = (id: number) => {
    setEditedId(id);
  };

  const updateQuestionTypes = (
    id: number,
    data: IDifficultyLevelsFormInputs
  ) => {
    console.log(id, data);
    setQuestionTypes((q) =>
      q.map((q: IQuestionType) =>
        q.id === id
          ? {
              ...q,
              easy_weight: data.easy,
              medium_weight: data.medium,
              hard_weight: data.hard,
            }
          : q
      )
    );
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
        {questionTypes.map((questionType, index) => (
          <div key={index}>
            <QuestionTypeAccordion
              onEdit={handleEdit}
              editedId={editedId}
              questionType={questionType}
              expandedId={expandedId}
              onChange={handleChange}
              updateQuestionType={updateQuestionTypes}
            ></QuestionTypeAccordion>
          </div>
        ))}
      </Box>
    </div>
  );
}
