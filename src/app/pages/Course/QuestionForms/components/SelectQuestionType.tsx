import React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { IQuestionType } from "../../../../types/CourseSettings";
import CustomDropDown from "./customFormComponents/CustomDropDown";

const mapQuestionTypes = (questionTypes: IQuestionType[]) =>
  questionTypes.map((q) => ({ value: q.name, label: q.name }));

export default function SelectTopic({
  questionTypes,
}: {
  questionTypes: IQuestionType[];
}) {
  return (
    <Box sx={{ px: 5 }}>
      <CustomDropDown
        title="Question Type"
        name="question_type"
        items={mapQuestionTypes(questionTypes)}
        firstOption="Select Question Type"
      />
    </Box>
  );
}
