import React from "react";
import { useParams } from "react-router-dom";

import {
  Box,
} from "@mui/material";
import { ITopic } from "../../../../types/CourseSettings";
import CustomDropDown from "./customFormComponents/CustomDropDown";


const mapTopics = (topics: ITopic[]) =>
  topics.map((topic) => ({ value: topic.name, label: topic.name }));

export default function SelectTopic({ topics }: { topics: ITopic[] }) {
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
