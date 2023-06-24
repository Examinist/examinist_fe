import { Stack } from "@mui/system";
import React from "react";
import { mockExam } from "../../../../services/APIs/mockData/MockData";
import NearestExam from "./NearestExam";


const exams = [mockExam]
export default function NearestExams() {
  return (
    <Stack sx={{gap: 2}}>
      {exams.map((exam) => (
        <div key={exam.id}>
          <NearestExam exam={exam} />
        </div>
      ))}
    </Stack>
  );
}
