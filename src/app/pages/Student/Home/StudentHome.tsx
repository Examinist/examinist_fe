import { Stack } from "@mui/material";
import StudentExams from "./Exams/StudentExams";
import SixtyMinutesExams from "./SixtyMinutesExams/SixtyMinutesExams";

export default function StudentHome() {
  return (
    <Stack sx={{ px: 20, py: 4, gap: 3 }}>
      <SixtyMinutesExams />
      <StudentExams />
    </Stack>
  );
}
