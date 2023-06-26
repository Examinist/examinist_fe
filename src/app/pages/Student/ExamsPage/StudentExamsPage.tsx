import { Stack } from "@mui/material";
import React from "react";
import SixtyMinutesExam from "./SixtyMinutesExams/SixtyMinuteExam";
import { Upcoming } from "@mui/icons-material";
import StudentExams from "./Exams/StudentExams";
import { mockExam } from "../../../services/APIs/mockData/MockData";
import SixtyMinutesExams from "./SixtyMinutesExams/SixtyMinutesExams";

export default function StudentExamsPage() {
  return (
    <Stack sx={{ px: 20, py: 4, gap: 3 }}>
      <SixtyMinutesExams />
      <StudentExams />
    </Stack>
  );
}
