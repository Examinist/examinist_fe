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
import { ITopic } from "../../../../../../types/Course";

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

export default function SelectTopic() {
  const { courseId } = useParams<{ courseId: string }>();
  const [topics, setTopics] = React.useState<ITopic[]>([]);

  React.useEffect(() => {
    setTopics(mockTopics);
  }, []);

  console.log(courseId);
  const { control } = useFormContext();
  return (
    <Box sx={{ px: 5 }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "500", py: 2 }}
        color="#6B6767"
      >
        Topic
      </Typography>
      <FormControl sx={{ width: "80%", ml: 2 }}>
        <Controller
          name="topic"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={onChange}
              displayEmpty
            >
              <MenuItem value="" disabled color="white">
                <em>Topics List</em>
              </MenuItem>
              {topics.map((topic) => (
                <div key={topic.id}>
                  <MenuItem value={topic.name}>{topic.name}</MenuItem>
                </div>
              ))}
            </Select>
          )}
        ></Controller>
      </FormControl>
    </Box>
  );
}
