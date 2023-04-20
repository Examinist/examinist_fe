import React from "react";
import { useParams } from "react-router-dom";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ITopic } from "../../../../../types/Course";
import CustomDropDown from "../../../../../components/Forms/CustomDropDown/CustomDropDown";

const mockQuestionTypes = [
  {
    id: 1,
    name: "MCQ",
  },
  {
    id: 2,
    name: "T/F",
  },
  {
    id: 3,
    name: "Short Answer",
  },
  {
    id: 4,
    name: "Essay",
  },
];

const mapQuestionTypes = (questionTypes: any[]) =>
  questionTypes.map((q) => ({ value: q.name, label: q.name }));

export default function SelectTopic() {
  const { courseId } = useParams<{ courseId: string }>();
  const [questionTypes, setQuestionTypes] = React.useState<any>([]);

  React.useEffect(() => {
    setQuestionTypes(mockQuestionTypes);
  }, []);

  return (
    <Box sx={{ px: 5 }}>
      <CustomDropDown
        title="Question Type"
        name="questionType"
        items={mapQuestionTypes(questionTypes)}
        firstOption="Select Question Type"
      />
    </Box>
  );
}
