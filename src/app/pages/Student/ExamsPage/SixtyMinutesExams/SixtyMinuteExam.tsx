import { Box } from "@mui/system";
import React, { useState } from "react";
import theme from "../../../../../assets/theme";
import { IExam } from "../../../../types/Exam";
import { addTime, getTimeStr } from "../../../../utilities/Date";
import { Button, Stack } from "@mui/material";
import Countdown from "react-countdown";
import SixtyMinutesCustomCountDown from "./CountDown/SixtyMinutesCountDown";
import { IStudentPortalStudentExam } from "../../../../types/StudentPortalStudentExam";
import { useNavigate } from "react-router";

const fromToDateStr = (exam: IStudentPortalStudentExam) => {
  const from = getTimeStr(exam.scheduled_date);
  const to = getTimeStr(exam.ends_at);
  return from + " - " + to;
};

export default function SixtyMinutesExam({
  exam,
}: {
  exam: IStudentPortalStudentExam;
}) {
  const [started, setStarted] = useState<Boolean>(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        px: 4,
        py: 3,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Stack sx={{ gap: "2px", alignSelf: "center" }}>
        <Box
          sx={{ fontSize: 20, fontWeight: 600, color: theme.palette.gray.dark }}
        >
          {exam.title}
        </Box>
        <Box
          sx={{
            fontSize: 17,
            fontWeight: 500,
            color: theme.palette.gray.dark,
          }}
        >
          {exam.course.title + " - " + exam.course.code.toUpperCase()}
        </Box>
        <Box
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: theme.palette.gray.dark,
          }}
        >
          {fromToDateStr(exam)}
        </Box>
      </Stack>

      <Stack sx={{}}>
        <Box
          sx={{
            fontSize: 13,
            color: theme.palette.gray.dark,
          }}
        >
          Starts in
        </Box>
        <SixtyMinutesCustomCountDown
          toDate={exam.ends_at}
          onComplete={() => setStarted(true)}
        />
      </Stack>

      <Button
        variant="contained"
        sx={{
          alignSelf: "flex-end",
          backgroundColor: "#3FC164",
          borderRadius: 3,
          px: 3,
          fontWeight: 600,
        }}
        disabled={!started}
        onClick={() => navigate(`./exams/${exam.id}`)}
      >
        Start Exam
      </Button>
    </Box>
  );
}