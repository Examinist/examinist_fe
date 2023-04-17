import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import TemplateCard from "./components/TemplateCard";

export interface ITypeList {
  name: string;
  percent: number;
}

const questionsTypes: ITypeList[] = [
  { name: "MCQ", percent: 50 },
  { name: "T/F", percent: 50 },
]

const difficulties: ITypeList[] = [
  { name: "Easy", percent: 50},
  { name: "Medium", percent: 30},
  { name: "Hard", percent: 20},
]

const colors = ["#3FC164","#FFAC4B","#FF4B4B"]

export default function Template() {
  const [questionType, updateTypePerc] = useState(questionsTypes);
  const [difficulty, updateDiffPerc] = useState(difficulties);

  const handleTypeChange = (event: any, index: number) => {
    if (event.key == "Enter") {
      let types = [...questionType];
      types[index].percent = event.target.value;
      updateTypePerc(types);
      //openEditType(index);
    }
  };

  const handleDiffChange = (event: any, index: number) => {
    if (event.key == "Enter") {
      let diff = [...difficulty];
      diff[index].percent = event.target.value;
      updateDiffPerc(diff);
      //openEditDiff(index);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
        }}
      >
        Exam Templete
      </Typography>
      <TemplateCard
        title={"Question Types"}
        listMap={questionType}
        colors={[]}
        ></TemplateCard>
      <TemplateCard
      title={"Difficulty Levels"}
      listMap={difficulty}
      colors={colors}></TemplateCard>
    </Box>
  );
}
