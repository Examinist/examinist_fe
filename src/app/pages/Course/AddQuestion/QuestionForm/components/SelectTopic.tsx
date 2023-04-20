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

const mockTopics: ITopic[] = [
  {
    id: 1,
    name: "Topic 1",
  },
  {
    id: 2,
    name: "Topic 2",
  },
  {
    id: 3,
    name: "Topic 3",
  },
  {
    id: 4,
    name: "Topic 4",
  },
];

const mapTopics = (topics: ITopic[]) =>
  topics.map((topic) => ({ value: topic.name, label: topic.name }));

export default function SelectTopic() {
  const { courseId } = useParams<{ courseId: string }>();
  const [topics, setTopics] = React.useState<ITopic[]>([]);

  React.useEffect(() => {
    setTopics(mockTopics);
  }, []);

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
