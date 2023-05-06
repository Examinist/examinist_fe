import React from "react";
import { useParams } from "react-router-dom";

import {
  Box,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomDropDown from "./Forms/CustomDropDown/CustomDropDown";
import {
  IQuestionTypesListResponse,
  getQuestionTypesApi,
} from "../../../../../services/APIs/CourseSettingsAPIs";
import { IQuestionType } from "../../../../../types/CourseSettings";

const mapQuestionTypes = (questionTypes: IQuestionType[]) =>
  questionTypes.map((q) => ({ value: q.name, label: q.name }));

export default function SelectTopic({questionTypes}: {questionTypes: IQuestionType[]}) {
 

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
