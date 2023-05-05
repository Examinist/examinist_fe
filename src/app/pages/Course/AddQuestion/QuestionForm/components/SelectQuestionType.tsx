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
import CustomDropDown from "../../../../../components/Forms/CustomDropDown/CustomDropDown";
import { IQuestionTypesListResponse, getQuestionTypesApi } from "../../../../../services/APIs/CourseSettingsAPIs";
import { IQuestionType } from "../../../../../types/Question";



const mapQuestionTypes = (questionTypes: IQuestionType[]) =>
  questionTypes.map((q) => ({ value: q.name, label: q.name }));

export default function SelectTopic() {
  const { courseId } = useParams<{ courseId: string }>();
  const [questionTypes, setQuestionTypes] = React.useState<IQuestionType[]>([]);

  React.useEffect(() => {
    getQuestionTypesApi(courseId).then(
      ({ data }: IQuestionTypesListResponse) => {
        setQuestionTypes(data.question_types);
      }
    );
  }, []);

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
