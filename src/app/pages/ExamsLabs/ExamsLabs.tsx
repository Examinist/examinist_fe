import { Box } from "@mui/material";
import React from "react";
import { mockExamsList } from "../../services/APIs/mockData/MockData";
import { ExamStatusEnum } from "../../types/Exam";
import ExamLabsCard from "./components/ExamLabsCard";

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
            <ExamLabsCard exam={value}></ExamLabsCard>
          );
        }
      })}
    </Box>
  );
}
