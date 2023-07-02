import { Box } from "@mui/material";
import React from "react";
import { mockExamsList } from "../../services/APIs/mockData/MockData";
import { ExamStatusEnum } from "../../types/Exam";
import ExamsLabsCard from "./components/ExamsLabsCard";

export default function ExamsLabs() {
  const exams = mockExamsList;

  return (
    <Box sx={{ px: 12, py: 5 }}>
      <Box
        sx={{
          fontSize: "2.2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Exams' Labs
      </Box>
      {exams.map((value)=>{
        if(value.status==ExamStatusEnum.SCHEDULED){
          return(
            <ExamsLabsCard exam={value}></ExamsLabsCard>
          );
        }
      })}
    </Box>
  );
}
