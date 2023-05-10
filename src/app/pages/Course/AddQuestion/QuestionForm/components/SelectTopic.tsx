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
import CustomDropDown from "./Forms/CustomDropDown/CustomDropDown";
import { ITopic } from "../../../../../types/CourseSettings";
import { getTopicsApi } from "../../../../../services/APIs/CourseSettingsAPIs";

const mapTopics = (topics: ITopic[]) =>
  topics.map((topic) => ({ value: topic.name, label: topic.name }));

export default function SelectTopic({ topics }: { topics: ITopic[]}) {
  const { courseId } = useParams<{ courseId: string }>();


  return (
    <Box sx={{ px: 5 }}>
      <CustomDropDown
        title="Topic"
        name="topic"
        items={mapTopics(topics)}
        firstOption="Select Topic"
      />
    </Box>
  );
}
